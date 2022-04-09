from __future__ import annotations

import cv2
import numpy as np


class Item:
    Image: np.ndarray
    Area: tuple[tuple[int, int], tuple[int, int]]
    Offset: tuple[int, int]
    Title: str
    Children: list[Item] = []
    Threshold: float

    def __init__(self, path=None, threshold=0.9, area=None, offset=(0, 0), title='item', children=None):
        self.Image = cv2.imread(path, 0) if path else None
        self.Area = area
        self.Offset = offset
        self.Title = title
        self.Children = children if children is not None else []
        self.Threshold = threshold

    def get_children(self, title) -> Item:
        return next((item for item in self.Children if item.Title == title), None)
