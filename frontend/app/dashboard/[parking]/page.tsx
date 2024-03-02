'use client';
import { useState } from 'react';
import * as solace from 'solclientjs';
interface Messages {
	[position: number]: solace.Message; // Adjust the type as needed
}

export default function Page({ params }: { params: { parking: string } }) {
	const [slots, setSlots] = useState<
		{ position: number; state: number; message: solace.Message | null }[]
	>([
		{ position: 1, state: 1, message: null },
		{ position: 2, state: 1, message: null },
		{ position: 3, state: 1, message: null },
		{ position: 4, state: 1, message: null },
		{ position: 5, state: 1, message: null },
		{ position: 6, state: 1, message: null },
		{ position: 7, state: 1, message: null },
		{ position: 8, state: 1, message: null },
		{ position: 9, state: 1, message: null },
	]);
	const [messages, setMessages] = useState<Messages>({});

	solace.SolclientFactory.init();
	var session = solace.SolclientFactory.createSession({
		url: 'ws://mr-connection-rh8ji61z3t2.messaging.solace.cloud:80',
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
		var messageSubscriber = session.createMessageConsumer({
			// solace.MessageConsumerProperties
			queueDescriptor: {
				name: 'queue_' + params.parking,
				type: solace.QueueType.QUEUE,
			},
			acknowledgeMode: solace.MessageConsumerAcknowledgeMode.CLIENT, // Enabling Client ack
			createIfMissing: true, // Create queue if not exists
		});
		messageSubscriber.connect();

		messageSubscriber.on(solace.MessageConsumerEventName.UP, function () {
			console.log('Queue connected and ready to subscribe');
			messageSubscriber.addSubscription(
				solace.SolclientFactory.createTopicDestination(params.parking),
				params.parking, // correlation key as topic name
				10000 // 10 seconds timeout for this operation
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
					setSlots((prevSlots) => {
						return prevSlots.map((slot) => {
							if (slot.position === positionToUpdate) {
								if (slot.message === null) {
									// Set message to the current message
									setMessages((prevMessages) => ({
										...prevMessages,
										[positionToUpdate]: newMessage,
									}));
								} else {
									// Acknowledge the old message
									const oldMessage = messages[positionToUpdate];
									if (oldMessage && oldMessage !== null) {
										oldMessage.acknowledge();
									}
									// Update the slot with the new message and state
									setMessages((prevMessages) => ({
										...prevMessages,
										[positionToUpdate]: newMessage,
									}));
								}
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
	const renderSlots = () => {
		return slots.map((slot) => (
			<div
				key={slot.position}
				style={{
					width: '100px',
					height: '100px',
					backgroundColor: slot.state === 1 ? 'red' : 'blue',
					border: '1px solid black',
					display: 'inline-block',
				}}
			></div>
		));
	};

	// Function to create rows
	const createRows = () => {
		const rows = [];
		for (let i = 0; i < 3; i++) {
			rows.push(
				<div key={i} style={{ display: 'flex' }}>
					{renderSlots().slice(i * 3, (i + 1) * 3)}
				</div>
			);
		}
		return rows;
	};

	return <div>{createRows()}</div>;
}
