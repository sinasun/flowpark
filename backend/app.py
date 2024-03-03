from flask import Flask, request
from pubsub import setup_messaging_service

from solace.messaging.resources.topic import Topic
from database import get_parking_values, update_parking_position

from flask import jsonify

app = Flask(__name__)

@app.route('/publish', methods=['POST'])
def publish():
    data = request.json
    topic = data.get('topic')
    message = data.get('message')
    # position_str, status_str = message.split(":")

    # position = int(position_str)
    # status = int(status_str)
    #update_parking_position(topic, position, status)


    messaging_service = setup_messaging_service()

    publisher = messaging_service.create_persistent_message_publisher_builder().build()
    publisher.start()

    outbound_msg_builder = messaging_service.message_builder()
    outbound_msg = outbound_msg_builder.build(f'{message}')
    publisher.publish(outbound_msg, Topic.of(topic))
    publisher.terminate()

    messaging_service.disconnect()

    return "Published successfully!"

@app.route('/get_parking_values', methods=['GET'])
def get_values():
    name = request.args.get('name')
    values = get_parking_values(name)
    if values:
        return jsonify({'values': values})
    else:
        return "No values found for the given name", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0')

