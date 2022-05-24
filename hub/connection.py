from signalrcore.hub_connection_builder import HubConnectionBuilder

from hub.actions import *
from logs import logger

load_dotenv()

LOGGING = int(os.getenv("LOGGING")) if os.getenv("LOGGING") is not None else 20

KEEP_ALIVE_INTERVAL = int(os.getenv("KEEP_ALIVE_INTERVAL")) if os.getenv("KEEP_ALIVE_INTERVAL") is not None else 10
RECONNECT_INTERVAL = int(os.getenv("RECONNECT_INTERVAL")) if os.getenv("RECONNECT_INTERVAL") is not None else 5
MAX_ATTEMPTS = int(os.getenv("MAX_ATTEMPTS")) if os.getenv("MAX_ATTEMPTS") is not None else 5
WEBSOCKET_CONNECTION_URL = os.getenv("WEBSOCKET_CONNECTION_URL")


class HubConnection:
    connection_id = None

    def __init__(self, ):
        self.hub_connection = HubConnectionBuilder() \
            .configure_logging(LOGGING) \
            .with_url(WEBSOCKET_CONNECTION_URL, options={"verify_ssl": False}) \
            .with_automatic_reconnect({"type": "raw",
                                       "keep_alive_interval": KEEP_ALIVE_INTERVAL,
                                       "reconnect_interval": RECONNECT_INTERVAL,
                                       "max_attempts": MAX_ATTEMPTS}) \
            .build()

        self.hub_connection.on_open(
            lambda: logger.info("Connection opened and handshake received ready to send messages"))
        self.hub_connection.on_close(lambda: logger.info("Connection closed"))
        self.hub_connection.on_error(lambda data: logger.error(f"An exception was thrown : {data.error}"))

        self.hub_connection.on("UpGame", lambda args: up_game(self.hub_connection, args[0]))
        self.hub_connection.on("InviteInLobby",
                               lambda args: invite_players(self.hub_connection, players=args[0], match_id=args[1]))
        self.hub_connection.on("EditCustomMatch",
                               lambda args: edit_custom_match(self.hub_connection, cfg=args[0], match_id=args[1]))
        self.hub_connection.on("StartGame", lambda args: start_game(self.hub_connection))
