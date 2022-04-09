from Team import Team
from assets import Item
from utils import *


class GamePage:
    continue_red_btn = Item(path=os.path.join(os.path.dirname(__file__), '../assets', 'continue_red_btn.png'),
                            area=((842, 882), (1085, 945)),
                            title='continue_red_btn')

    continue_green_btn = Item(path=os.path.join(os.path.dirname(__file__), '../assets', 'continue_green_btn.png'),
                              area=((842, 882), (1085, 945)),
                              title='continue_green_btn')

    def is_game_finished(self):
        continue_red_btn_coords = try_find_on_screen(template=self.continue_red_btn.Image,
                                                     area=self.continue_red_btn.Area,
                                                     element_name=self.continue_red_btn.Title)

        continue_green_btn_coords = try_find_on_screen(template=self.continue_green_btn.Image,
                                                       area=self.continue_green_btn.Area,
                                                       element_name=self.continue_green_btn.Title)

        return continue_red_btn_coords is not None or continue_green_btn_coords is not None

    def game_result(self):
        continue_red_btn_coords = try_find_on_screen(template=self.continue_red_btn.Image,
                                                     area=self.continue_red_btn.Area,
                                                     element_name=self.continue_red_btn.Title)

        continue_green_btn_coords = try_find_on_screen(template=self.continue_green_btn.Image,
                                                       area=self.continue_green_btn.Area,
                                                       element_name=self.continue_green_btn.Title)
        if continue_red_btn_coords is not None:
            return Team.Dire
        if continue_green_btn_coords is not None:
            return Team.Radiant

    def exit_game(self):
        continue_red_btn_coords = try_find_on_screen(template=self.continue_red_btn.Image,
                                                     area=self.continue_red_btn.Area,
                                                     element_name=self.continue_red_btn.Title)

        continue_green_btn_coords = try_find_on_screen(template=self.continue_green_btn.Image,
                                                       area=self.continue_green_btn.Area,
                                                       element_name=self.continue_green_btn.Title)
        if continue_red_btn_coords is not None:
            click_to_the_center(continue_red_btn_coords)
            return

        if continue_green_btn_coords is not None:
            click_to_the_center(continue_green_btn_coords)
            return
