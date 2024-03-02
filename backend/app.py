from flask import Flask, request
import os
import platform
import time
import threading

from solace.messaging.messaging_service import MessagingService, ReconnectionListener, ReconnectionAttemptListener, ServiceInterruptionListener, RetryStrategy, ServiceEvent
from solace.messaging.publisher.persistent_message_publisher import PersistentMessagePublisher
from solace.messaging.publisher.persistent_message_publisher import MessagePublishReceiptListener
from solace.messaging.resources.topic import Topic

app = Flask(__name__)

class ServiceEventHandler(ReconnectionListener, ReconnectionAttemptListener, ServiceInterruptionListener):
    def on_reconnected(self, e: ServiceEvent):
        print("\non_reconnected")
        print(f"Error cause: {e.get_cause()}")
        print(f"Message: {e.get_message()}")
    
    def on_reconnecting(self, e: "ServiceEvent"):
        print("\non_reconnecting")
        print(f"Error cause: {e.get_cause()}")
        print(f"Message: {e.get_message()}")

    def on_service_interrupted(self, e: "ServiceEvent"):
        print("\non_service_interrupted")
        print(f"Error cause: {e.get_cause()}")
        print(f"Message: {e.get_message()}")

class MessageReceiptListener(MessagePublishReceiptListener):
    def __init__(self):
        self._receipt_count = 0

    @property
    def receipt_count(self):
        return self._receipt_count

    def on_publish_receipt(self, publish_receipt: 'PublishReceipt'):
        with lock:
            self._receipt_count += 1
            print(f"\npublish_receipt:\n {self.receipt_count}\n")

@app.route('/publish', methods=['POST'])
def publish():
    data = request.json
    topic = data.get('topic')
    message = data.get('message')
    broker_props = {
        "solace.messaging.transport.host": "tcp://mr-connection-rh8ji61z3t2.messaging.solace.cloud:55555",
        "solace.messaging.service.vpn-name": "parking-spotter",
        "solace.messaging.authentication.scheme.basic.username": "solace-cloud-client",
        "solace.messaging.authentication.scheme.basic.password": "npkndudi22g548rfdcdto67dsq",
    }

    messaging_service = MessagingService.builder().from_properties(broker_props) \
    .with_reconnection_retry_strategy(RetryStrategy.parametrized_retry(20,3)) \
    .build()

    messaging_service.connect()
    print(f'Messaging Service connected? {messaging_service.is_connected}')

    service_handler = ServiceEventHandler()
    messaging_service.add_reconnection_listener(service_handler)
    messaging_service.add_reconnection_attempt_listener(service_handler)
    messaging_service.add_service_interruption_listener(service_handler)

    publisher: PersistentMessagePublisher = messaging_service.create_persistent_message_publisher_builder().build()
    publisher.start()

    outbound_msg_builder = messaging_service.message_builder()
    
    outbound_msg = outbound_msg_builder \
                .build(f'{message}')
    publisher.publish(outbound_msg, Topic.of(topic))
    publisher.terminate()
    
    messaging_service.disconnect()
    return "Published successfully!"

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
