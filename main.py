import os
import threading
import time

from dotenv import load_dotenv
from flask import Flask, Response

from hub.connection import HubConnection

load_dotenv()

SERVER_NEGOTIATION_URL = os.getenv("SERVER_NEGOTIATION_URL")
WEBSOCKET_CONNECTION_URL = os.getenv("WEBSOCKET_CONNECTION_URL")

app = Flask(__name__)


def set_response_body(lock, response, body):
    response.response = body
    lock.release()


@app.route('/create')
def create():
    hub = HubConnection()
    hub.hub_connection.start()
    time.sleep(1)

    response = Response(status=200, response=None)

    lock = threading.Lock()
    lock.acquire()
    hub.hub_connection.send("GetConnectionId", [], lambda m: set_response_body(lock, response, m.result))
    if not lock.acquire(timeout=1):
        response.status = 500

    hub.connection_id = response.response
    return response


if __name__ == '__main__':
    app.run(port=5050, host="192.168.0.102")
    # app.run(port=5050)
