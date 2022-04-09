from assets import Item
from pages.game_page import GamePage
from utils import *


class CustomLobbyPage:
    create_custom_lobby_btn = Item(
        path=os.path.join(os.path.dirname(__file__), '../assets', 'create_custom_lobby_btn.png'),
        area=((1520, 627), (1860, 745)),
        title='create_custom_lobby_btn')

    kick_bot2spectators_btn = Item(
        path=os.path.join(os.path.dirname(__file__), '../assets', 'kick_bot2spectators_btn.png'),
        area=((1494, 177), (1530, 207)),
        title='kick_bot2spectators_btn')

    edit_btn = Item(
        path=os.path.join(os.path.dirname(__file__), '../assets', 'edit_lobby_btn.png'),
        area=((1784, 780), (1876, 820)),
        title='edit_lobby_btn')

    game_name_input = Item(
        path=os.path.join(os.path.dirname(__file__), '../assets', 'lobby_name_input.png'),
        offset=(0, 40),
        area=((390, 380), (528, 410)),
        title='lobby_name_input')

    game_mode_list = Item(
        path=os.path.join(os.path.dirname(__file__), '../assets', 'lobby_game_mode_list.png'),
        area=((765, 383), (1105, 928)),
        offset=(0, 40),
        title='lobby_game_mode_list',
        children=[
            Item(offset=(0, 70), title='gm_all_pick'),
            Item(offset=(0, 100), title='gm_captains_mode'),
            Item(offset=(0, 130), title='gm_random_draft'),
            Item(offset=(0, 160), title='gm_single_draft'),
            Item(offset=(0, 190), title='gm_all_random'),
            Item(offset=(0, 220), title='gm_reverse_captains_mode'),
            Item(offset=(0, 250), title='gm_mid_only_mode'),
            Item(offset=(0, 280), title='gm_least_played'),
            Item(offset=(0, 310), title='gm_new_player_mode'),
            Item(offset=(0, 340), title='gm_captains_draft'),
            Item(offset=(0, 370), title='gm_ability_draft'),
            Item(offset=(0, 400), title='gm_all_random_death_match'),
            Item(offset=(0, 430), title='gm_1v1_solo_mid'),
            Item(offset=(0, 460), title='gm_ranked_all_pick'),
            Item(offset=(0, 490), title='gm_turbo')
        ])

    game_password_input = Item(
        path=os.path.join(os.path.dirname(__file__), '../assets', 'lobby_password_input.png'),
        offset=(0, 40),
        area=((1151, 371), (1342, 418)),
        title='lobby_password_input')

    game_location_list = Item(
        path=os.path.join(os.path.dirname(__file__), '../assets', 'lobby_server_location_list.png'),
        offset=(0, 40),
        area=((384, 481), (715, 1053)),
        title='lobby_server_location_list',
        children=[
            Item(offset=(40, 70), title='sl_local_host'),
            Item(offset=(40, 100), title='sl_us_west'),
            Item(offset=(40, 130), title='sl_us_east'),
            Item(offset=(40, 160), title='sl_europe_west'),
            Item(offset=(40, 190), title='sl_singapore'),
            Item(offset=(40, 220), title='sl_dubai'),
            Item(offset=(40, 250), title='sl_stockholm'),
            Item(offset=(40, 280), title='sl_brazil'),
            Item(offset=(40, 310), title='sl_austria'),
            Item(offset=(40, 340), title='sl_australia'),
            Item(offset=(40, 370), title='sl_south_africa'),
            Item(offset=(40, 400), title='sl_chile'),
            Item(offset=(40, 430), title='sl_peru'),
            Item(offset=(40, 460), title='sl_dota_region_argentina'),
            Item(offset=(40, 490), title='sl_india'),
            Item(offset=(40, 490), title='sl_japan'),
            Item(offset=(40, 520), title='sl_taiwan'),
        ])

    game_visibility = Item(
        path=os.path.join(os.path.dirname(__file__), '../assets', 'lobby_visibility_list.png'),
        offset=(0, 40),
        area=((770, 486), (943, 525)),
        title='lobby_visibility_list',
        children=[
            Item(offset=(0, 70), title='lv_public'),
            Item(offset=(0, 100), title='lv_friends'),
            Item(offset=(0, 130), title='lv_unlisted'),
        ])

    confirm_lobby_settings_btn = Item(
        path=os.path.join(os.path.dirname(__file__), '../assets', 'lobby_ok_btn.png'),
        area=((1169, 710), (1392, 790)),
        title='lobby_ok_btn')

    start_game_btn = Item(
        path=os.path.join(os.path.dirname(__file__), '../assets', 'start_game_btn.png'),
        area=((1500, 985), (1900, 1080)),
        title='start_game_btn')

    def kick_bot(self):
        kick_bot2spectators_coords = try_find_on_screen(template=self.kick_bot2spectators_btn.Image,
                                                        area=self.kick_bot2spectators_btn.Area,
                                                        element_name=self.kick_bot2spectators_btn.Title)

        if kick_bot2spectators_coords is not None:
            click_to_the_center(kick_bot2spectators_coords)

        return self

    def create_custom_lobby(self):
        create_custom_lobby_coords = try_find_on_screen(template=self.create_custom_lobby_btn.Image,
                                                        area=self.create_custom_lobby_btn.Area,
                                                        element_name=self.create_custom_lobby_btn.Title)

        if create_custom_lobby_coords is not None:
            click_to_the_center(create_custom_lobby_coords, timeout=1.5)
            self.kick_bot()

        return self

    def set_lobby_name(self, name):
        game_name_input_coords = try_find_on_screen(template=self.game_name_input.Image,
                                                    area=self.game_name_input.Area,
                                                    element_name=self.game_name_input.Title)
        if game_name_input_coords is None:
            return

        click_to_the_center(game_name_input_coords, offset=self.game_name_input.Offset)

        clear_input()

        pyautogui.write(name)

        return self

    def set_lobby_game_mode(self, mode):
        gm_list_coords = try_find_on_screen(template=self.game_mode_list.Image,
                                            area=self.game_mode_list.Area,
                                            element_name=self.game_mode_list.Title)

        if gm_list_coords is None:
            return

        click_to_the_center(gm_list_coords, offset=self.game_mode_list.Offset)

        gm_mode_item = self.game_mode_list.get_children(mode)
        click_to_the_center(gm_list_coords, offset=gm_mode_item.Offset)
        return self

    def set_lobby_password(self, password):
        game_password_input_coords = try_find_on_screen(template=self.game_password_input.Image,
                                                        area=self.game_password_input.Area,
                                                        element_name=self.game_password_input.Title)
        if game_password_input_coords is None:
            return

        click_to_the_center(game_password_input_coords, offset=self.game_password_input.Offset)

        clear_input()

        pyautogui.write(password)
        return self

    def set_lobby_server(self, location):
        sl_list_coords = try_find_on_screen(template=self.game_location_list.Image,
                                            area=self.game_location_list.Area,
                                            element_name=self.game_location_list.Title)

        if sl_list_coords is None:
            return

        click_to_the_center(sl_list_coords, offset=self.game_location_list.Offset)

        # pyautogui.moveTo(sl_list_coords[0][0] + 50, sl_list_coords[0][1] + 140)
        move_to_center(sl_list_coords, offset=self.game_location_list.Children[0].Offset)
        scroll(100)
        time.sleep(1)

        if location in ["sl_japan", "sl_taiwan"]:
            # pyautogui.moveTo(sl_list_coords[0][0] + 50, sl_list_coords[0][1] + 140, 0.2, pyautogui.easeInQuad)
            move_to_center(sl_list_coords, offset=self.game_location_list.Children[0].Offset,
                           tween=pyautogui.easeInQuad)
            scroll(-100)
            time.sleep(1)

        sl_item = self.game_location_list.get_children(location)
        click_to_the_center(sl_list_coords, offset=sl_item.Offset)
        return self

    def set_lobby_visibility(self, visibility):
        lv_list_coords = try_find_on_screen(template=self.game_visibility.Image,
                                            area=self.game_visibility.Area,
                                            element_name=self.game_visibility.Title)

        if lv_list_coords is None:
            return

        click_to_the_center(lv_list_coords, offset=self.game_visibility.Offset)

        lv_list_item = self.game_visibility.get_children(visibility)
        click_to_the_center(lv_list_coords, offset=lv_list_item.Offset)
        return self

    def edit_lobby(self, name, mode, password, location, visibility):
        edit_btn_coords = try_find_on_screen(template=self.edit_btn.Image,
                                             area=self.edit_btn.Area,
                                             element_name=self.edit_btn.Title)

        if edit_btn_coords is None:
            return

        click_to_the_center(edit_btn_coords)

        self.set_lobby_name(name). \
            set_lobby_game_mode(mode). \
            set_lobby_password(password). \
            set_lobby_server(location). \
            set_lobby_visibility(visibility)

        return self

    def confirm_lobby_settings(self):
        confirm_lobby_coords = try_find_on_screen(template=self.confirm_lobby_settings_btn.Image,
                                                  area=self.confirm_lobby_settings_btn.Area,
                                                  element_name=self.confirm_lobby_settings_btn.Title)
        if confirm_lobby_coords is None:
            return
        click_to_the_center(confirm_lobby_coords)
        return self

    def start_game(self):
        start_game_btn_coords = try_find_on_screen(template=self. start_game_btn.Image,
                                                   area=self. start_game_btn.Area,
                                                   element_name=self. start_game_btn.Title)
        if start_game_btn_coords is None:
            return
        click_to_the_center(start_game_btn_coords)
        return GamePage()
