import json

from dotenv import load_dotenv

from BotStatus import Status
from pages.custom_lobby_page import CustomLobbyPage
from pages.game_page import GamePage
from pages.main_page import MainPage
from utils import *

load_dotenv()

debug_env = os.getenv("DEBUG") if os.getenv("DEBUG") is not None else ""
DEBUG = bool(debug_env) if debug_env.lower() in ["true", "t", "1"] else False

TIME2UP = int(os.getenv("TIME2UP")) if os.getenv("TIME2UP") is not None else 60

TIME2PREPARE = int(os.getenv("TIME2PREPARE")) if os.getenv("TIME2PREPARE") is not None else 60

TIME2JOIN = int(os.getenv("TIME2JOIN")) if os.getenv("TIME2JOIN") is not None else 300

GAME_PATH = os.getenv("GAME_PATH")
GAME_NAME = os.getenv("GAME_NAME")
WINDOW_NAME = os.getenv("WINDOW_NAME")

MAX_CUSTOM_LOBBY_TIME2LIVE = int(os.getenv("MAX_CUSTOM_LOBBY_TIME2LIVE")) if os.getenv(
    "MAX_CUSTOM_LOBBY_TIME2LIVE") is not None else 7200


def up_game(hub_connection):
    pyautogui.hotkey('win', 'd')
    run_game(GAME_PATH, GAME_NAME)
    time.sleep(5)
    w = WindowMgr()
    w.find_window_wildcard(WINDOW_NAME)
    w.set_foreground()

    pill2kill = threading.Event()
    spam_clicks_thread = threading.Thread(target=spam_clicks, args=(pill2kill,))
    spam_clicks_thread.start()

    m = MainPage()

    start_time = time.time()

    while True:
        current_time = time.time()
        elapsed_time = current_time - start_time

        if m.is_game_ready():
            break

        if elapsed_time > TIME2UP:
            pill2kill.set()
            spam_clicks_thread.join()
            logger.error("The game could not be started")
            hub_connection.send("BotError", ["The game could not be started"])
            exit_game(GAME_NAME)

    pill2kill.set()
    spam_clicks_thread.join()
    hub_connection.send("SetBotStatus", [Status.Online])
    # todo create separeted method for status on frontend
    hub_connection.send("ShowModalWithMessage", ["Bot is ready"])


def invite_players(hub_connection, players, match_id):
    m = MainPage()
    m.invite_players(players)

    st = time.time()
    while True:
        ct = time.time()
        et = ct - st

        if m.is_players_joined():
            break

        if et > TIME2JOIN:
            logger.info("Waiting time for joining to lobby exceeded")
            hub_connection.send("BotError", ["Waiting time for joining to lobby exceeded"])
            exit_game(GAME_NAME)
    hub_connection.send("SetBotStatus", [Status.InLobby])
    hub_connection.send("EditLobbyConfiguration", [match_id])


def edit_custom_match(hub_connection, cfg, match_id):
    config = json.loads(cfg)
    m = MainPage()
    m.play_dota() \
        .create_custom_lobby() \
        .edit_lobby(config["name"], config["mode"], config["password"], config["location"], config["visibility"]) \
        .confirm_lobby_settings()

    hub_connection.send("SetBotStatus", [Status.ReadyToStart])
    hub_connection.send("Time2Prepare", [match_id, TIME2PREPARE])
    time.sleep(TIME2PREPARE)
    hub_connection.send("StartGame", [match_id])


def start_game(hub_connection):
    c = CustomLobbyPage()
    c.start_game()
    hub_connection.send("SetBotStatus", [Status.InGame])
    hub_connection.send("ShowModalWithMessage", ["Waiting for the game result"])

    st = time.time()

    g = GamePage()
    while True:
        ct = time.time()
        et = ct - st

        if g.is_game_finished():
            break

        if et > MAX_CUSTOM_LOBBY_TIME2LIVE:
            logger.info(
                f"The game lasted a long time. Bot player was active more than {MAX_CUSTOM_LOBBY_TIME2LIVE} seconds")
            hub_connection.send("BotError", [f"The game lasted a long time. Bot player was active more than {MAX_CUSTOM_LOBBY_TIME2LIVE} seconds"])
            exit_game(GAME_NAME)

    match_result = g.game_result()
    logger.info(
        f"The game finished with result: {next(iter(match_result.items()))[0]} victory")

    hub_connection.send("SetMatchResult", [next(iter(match_result.items()))[1]])
    g.exit_game()
    exit_game(GAME_NAME)
