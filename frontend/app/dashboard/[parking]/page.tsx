'use client';
import router from 'next/router';
import { useEffect, useState } from 'react';
import * as solace from 'solclientjs';

export default function Page({ params }: { params: { parking: string } }) {
	const [slots, setSlots] = useState<{ position: number; state: number }[]>([
		{ position: 1, state: 1 },
		{ position: 2, state: 1 },
		{ position: 3, state: 1 },
		{ position: 4, state: 1 },
		{ position: 5, state: 1 },
		{ position: 6, state: 1 },
		{ position: 7, state: 1 },
		{ position: 8, state: 1 },
	]);
	const [messages, setMessages] = useState<solace.Message[]>([]);

	useEffect(() => {
		solace.SolclientFactory.init();
		var session = solace.SolclientFactory.createSession({
			url: 'wss://mr-connection-rh8ji61z3t2.messaging.solace.cloud:443',
			vpnName: 'parking-spotter',
			userName: 'solace-cloud-client',
			password: 'npkndudi22g548rfdcdto67dsq',
		});
		try {
			session.connect();
		} catch (error) {
			console.log(error);
		}

		session.on(solace.SessionEventCode.MESSAGE, function (message) {
			console.log(
				'Received message: "' +
					message.getBinaryAttachment() +
					'", details:\n' +
					message.dump()
			);
			console.log(', details:\n' + message.dump());
		});
		session.on(solace.SessionEventCode.UP_NOTICE, function () {
			console.log('=== Successfully connected and ready to subscribe. ===');
			const randomNumberInRange = (min: number, max: number) => {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			};

			var messageSubscriber = session.createMessageConsumer({
				queueDescriptor: {
					name:
						'queue_12345' +
						String(randomNumberInRange(1, 100000)) +
						params.parking,
					type: solace.QueueType.QUEUE,
					durable: false,
				},
				acknowledgeMode: solace.MessageConsumerAcknowledgeMode.CLIENT,
				createIfMissing: true,
			});
			messageSubscriber.connect();

			messageSubscriber.on(solace.MessageConsumerEventName.UP, function () {
				console.log('Queue connected and ready to subscribe');
				messageSubscriber.addSubscription(
					solace.SolclientFactory.createTopicDestination(params.parking),
					params.parking,
					10000
				);
			});
			messageSubscriber.on(
				solace.MessageConsumerEventName.MESSAGE,
				async function (message) {
					console.log('Message: ' + message.getBinaryAttachment());
					const updateSlot = (
						positionToUpdate: any,
						newState: any,
						newMessage: any
					) => {
						setMessages((prevMessages) => [...prevMessages, newMessage]);
						console.log('Log:');
						console.log({ newMessage });
						setSlots((prevSlots) => {
							return prevSlots.map((slot) => {
								if (slot.position === positionToUpdate) {
									return { ...slot, state: newState };
								}
								return slot;
							});
						});
					};
					const relevantPart = message.getBinaryAttachment()?.slice(-4);
					const numbers = relevantPart?.toString().match(/(\d+):(\d+)/);
					const positionToUpdate = parseInt(numbers![1], 10);
					const newState = parseInt(numbers![2], 10);
					updateSlot(positionToUpdate, newState, message);
				}
			);

			messageSubscriber.on(
				solace.MessageConsumerEventName.CONNECT_FAILED_ERROR,
				function () {
					console.log(
						'=== Error: the message subscriber could not bind to queue "' +
							'" ===\n   Ensure this queue exists on the message router vpn'
					);
				}
			);
		});
	}, []);
	useEffect(() => {
		const removeSimilarMessages = () => {
			setMessages((prevMessages) => {
				for (let i = prevMessages.length - 1; i >= 0; i--) {
					const currentMessage = prevMessages[i];

					for (let j = i - 1; j >= 0; j--) {
						const previousMessage = prevMessages[j];

						if (areMessagesSimilar(currentMessage, previousMessage)) {
							try {
								previousMessage.acknowledge();
							} catch {
								console.log('Deleting a message twice');
							}
							return [
								...prevMessages.slice(0, i),
								...prevMessages.slice(i + 1),
							];
						}
					}
				}

				return prevMessages;
			});
		};

		removeSimilarMessages();
	}, [messages]);
	useEffect(() => {
		const cleanup = () => {
			console.log('Subscriber deleted');
		};

		const handleRouteChange = () => {
			cleanup();
		};

		window.addEventListener('beforeunload', cleanup);
		router.events.on('routeChangeStart', handleRouteChange);

		return () => {
			window.removeEventListener('beforeunload', cleanup);
			router.events.off('routeChangeStart', handleRouteChange);
			cleanup();
		};
	}, []);

	function areMessagesSimilar(
		message1: solace.Message,
		message2: solace.Message
	): boolean {
		const relevantPart1 = message1.getBinaryAttachment()?.slice(-4);
		const numbers1 = relevantPart1?.toString().match(/(\d+):(\d+)/);
		const positionToUpdate1 = parseInt(numbers1![1], 10);

		const relevantPart2 = message2.getBinaryAttachment()?.slice(-4);
		const numbers2 = relevantPart2?.toString().match(/(\d+):(\d+)/);
		const positionToUpdate2 = parseInt(numbers2![1], 10);
		return positionToUpdate1 === positionToUpdate2;
	}

	const renderSlots = () => {
		return slots.map((slot) => (
			<div
				key={slot.position}
				style={{
					width: '150px',
					height: '250px',
					border: '1px dotted black',
					display: 'inline-block',
					position: 'relative',
				}}
			>
				{slot.state == 1 ? (
					<p className="rounded-full text-black border-4 mt-7 w-20 ml-8 justify-center flex">
						P-{slot.position}
					</p>
				) : (
					<p className="rounded-full  border-4 mt-7 w-20 bg-blue-400 ml-8 justify-center flex">
						P-{slot.position}
					</p>
				)}

				{slot.state == 1 ? (
					<img
						src="/images/car.png"
						style={{
							position: 'absolute',
							top: '30%',
							left: 35,
							width: '50%',
							height: '60%',
							objectFit: 'cover',
						}}
					/>
				) : (
					<p
						style={{
							position: 'absolute',
							top: '50%',
							left: 30,
						}}
						className="text-green-400 text-[24px]"
					>
						Available
					</p>
				)}
			</div>
		));
	};

	const createRows = () => {
		const rows = [];
		for (let i = 0; i < slots.length; i += 4) {
			const rowStyle = {
				display: 'flex',
				marginTop: i == 1 ? 0 : '60px',
			};
			rows.push(
				<div key={i} style={rowStyle}>
					{renderSlots().slice(i, i + 4)}
				</div>
			);
		}
		return rows;
	};

	return (
		<div className="flex max-w-screen  bg-[#F8F9FA] flex-col items-center">
			{createRows()}
		</div>
	);
}
