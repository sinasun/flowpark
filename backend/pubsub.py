import os
from solace.messaging.messaging_service import MessagingService, ReconnectionListener, ReconnectionAttemptListener, ServiceInterruptionListener, RetryStrategy, ServiceEvent
from solace.messaging.publisher.persistent_message_publisher import PersistentMessagePublisher, MessagePublishReceiptListener

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

def setup_messaging_service():
    broker_props = {
        "solace.messaging.transport.host": os.environ.get('SOLACE_HOST'),
        "solace.messaging.service.vpn-name": os.environ.get('SOLACE_VPN_NAME'),
        "solace.messaging.authentication.scheme.basic.username": os.environ.get('SOLACE_USERNAME'),
        "solace.messaging.authentication.scheme.basic.password": os.environ.get('SOLACE_PASSWORD'),
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

    return messaging_service

