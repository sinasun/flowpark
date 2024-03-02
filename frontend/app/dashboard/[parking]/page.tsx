'use client';
import { useState } from 'react';
import * as solace from 'solclientjs';
export default function Page({ params }: { params: { parking: string } }) {
	const [slots, setSlots] = useState([
		{ position: 0, state: 1 },
		{ position: 1, state: 1 },
		{ position: 2, state: 1 },
		{ position: 3, state: 1 },
		{ position: 4, state: 1 },
		{ position: 5, state: 1 },
		{ position: 6, state: 1 },
		{ position: 7, state: 1 },
		{ position: 8, state: 1 },
		{ position: 9, state: 1 },
	]);
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
				name: 'test_queue',
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
			function (message) {
				const relevantPart = message
					.getBinaryAttachment()
					?.slice(-4)
					.toString();
				const numbers = relevantPart?.match(/(\d+):(\d+)/);

				// Extracting the first and second numbers
				const positionToUpdate = parseInt(numbers![1], 10);
				const newState = parseInt(numbers![2], 10);

				// Updating the state based on extracted numbers
				const updatedSlots = slots.map((slot) => {
					if (slot.position === positionToUpdate) {
						return { ...slot, state: newState };
					} else {
						return slot;
					}
				});

				// Setting the updated state
				setSlots(updatedSlots);

				// Need to explicitly ack otherwise it will not be deleted from the message router
				//message.acknowledge();
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
