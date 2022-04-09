from assets import Item
from pages.custom_lobby_page import CustomLobbyPage
from utils import *


class MainPage:
    logo = Item(path=os.path.join(os.path.dirname(__file__), '../assets', 'logo.png'), area=((186, 0), (390, 90)),
                title='logo')

    add_friend_btn = Item(path=os.path.join(os.path.dirname(__file__), '../assets', 'lobby_add_friend_btn.png'),
                          area=((320, 250), (406, 300)), title='lobby_add_friend_btn')

    search_input = Item(path=os.path.join(os.path.dirname(__file__), '../assets', 'add_friend_modal_search_input.png'),
                        area=((762, 453), (1160, 545)), title='add_friend_modal_search_input')

    search_btn = Item(path=os.path.join(os.path.dirname(__file__), '../assets', 'add_friend_modal_search_btn.png'),
                      area=((750, 580), (960, 665)), title='add_friend_modal_search_btn')

    invite_to_party_btn = Item(
        path=os.path.join(os.path.dirname(__file__), '../assets', 'profile_invite_to_party_btn.png'),
        area=((570, 180), (870, 268)), title='profile_invite_to_party_btn')

    count_of_invites = Item(
        path=os.path.join(os.path.dirname(__file__), '../assets', 'lobby_count_of_invites.png'),
        threshold=0.4,
        area=((256, 977), (300, 1024)), title='lobby_count_of_invites')

    count_of_invites_mask = Item(
        path=os.path.join(os.path.dirname(__file__), '../assets', 'lobby_count_of_invites_mask.png'),
        area=((256, 977), (300, 1024)), title='lobby_count_of_invites_mask')

    play_dota_btn = Item(
        path=os.path.join(os.path.dirname(__file__), '../assets', 'play_dota_btn.png'),
        area=((1520, 1000), (1880, 1065)), title='play_dota_btn')

    def invite_players(self, players):
        add_btn_coords = try_find_on_screen(template=self.add_friend_btn.Image,
                                            area=self.add_friend_btn.Area,
                                            element_name=self.add_friend_btn.Title)

        logo_coords = try_find_on_screen(template=self.logo.Image, area=self.logo.Area, element_name=self.logo.Title)

        if add_btn_coords is not None and logo_coords is not None:
            for player_id in players:
                click_to_the_center(add_btn_coords)

                search_input_coords = try_find_on_screen(template=self.search_input.Image,
                                                         area=self.search_input.Area,
                                                         element_name=self.search_input.Title)

                search_btn_coords = try_find_on_screen(template=self.search_btn.Image,
                                                       area=self.search_btn.Area,
                                                       element_name=self.search_btn.Title)

                if search_btn_coords is not None and search_input_coords is not None:
                    click_to_the_center(search_input_coords)
                    pyautogui.write(player_id)
                    click_to_the_center(search_btn_coords)

                    invite2party_coords = try_find_on_screen(template=self.invite_to_party_btn.Image,
                                                             area=self.invite_to_party_btn.Area,
                                                             element_name=self.invite_to_party_btn.Title)

                    click_to_the_center(invite2party_coords)
                    click_to_the_center(logo_coords)

        return self

    def is_players_joined(self) -> bool:
        return try_find_on_screen(template=self.count_of_invites.Image,
                                  mask=self.count_of_invites_mask.Image,
                                  area=self.count_of_invites.Area,
                                  element_name=self.count_of_invites.Title,
                                  threshold=self.count_of_invites.Threshold) is None

    def is_game_ready(self, ):
        return try_find_on_screen(template=self.logo.Image,
                                  area=self.logo.Area,
                                  element_name=self.logo.Title) is not None

    def play_dota(self) -> CustomLobbyPage:
        play_dota_btn_coords = try_find_on_screen(template=self.play_dota_btn.Image,
                                                  area=self.play_dota_btn.Area,
                                                  element_name=self.play_dota_btn.Title)

        if play_dota_btn_coords is not None:
            click_to_the_center(play_dota_btn_coords)
        return CustomLobbyPage()
