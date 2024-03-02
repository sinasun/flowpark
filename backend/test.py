# Guaranteed Publisher publishing persistent messages
import os
import platform
import time
import threading

from solace.messaging.messaging_service import MessagingService, ReconnectionListener, ReconnectionAttemptListener, ServiceInterruptionListener, RetryStrategy, ServiceEvent
from solace.messaging.publisher.persistent_message_publisher import PersistentMessagePublisher
from solace.messaging.publisher.persistent_message_publisher import MessagePublishReceiptListener
from solace.messaging.resources.topic import Topic
TOPIC_PREFIX = "solace/samples/python"

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

# Event Handling for the messaging service
service_handler = ServiceEventHandler()
messaging_service.add_reconnection_listener(service_handler)
messaging_service.add_reconnection_attempt_listener(service_handler)
messaging_service.add_service_interruption_listener(service_handler)

# Create a persistent message publisher and start it
publisher: PersistentMessagePublisher = messaging_service.create_persistent_message_publisher_builder().build()
publisher.start()

# set a message delivery listener to the publisher
receipt_listener = MessageReceiptListener()
publisher.set_message_publish_receipt_listener(receipt_listener)

# Prepare the destination topic
topic = Topic.of(TOPIC_PREFIX + f'/persistent/pub')

# Prepare outbound message payload and body
message_body = "this is the body of the msg"
outbound_msg_builder = messaging_service.message_builder() \
                .with_application_message_id("sample_id") \
                .with_property("application", "samples") \
                .with_property("language", "Python")
count = 0 
try:
    while True:
        outbound_msg = outbound_msg_builder \
                    .with_application_message_id(f'NEW {count}')\
                    .build(f'{message_body} + {count}')

        publisher.publish(outbound_msg, topic)
        print(f'PERSISTENT publish message {count} is successful... Topic: [{topic.get_name()}]')
        count +=1
        time.sleep(0.1)

except KeyboardInterrupt:
    print(f'\nDelivery receipt count: {receipt_listener.receipt_count}\n')
    print('\nTerminating Publisher')
    publisher.terminate()
    print('\nDisconnecting Messaging Service')
    messaging_service.disconnect()