export interface Order {
  game: string;
  nickname: string;
  price: string;
  date?: Date;
  currentRank: {
    rank: string;
    rating?: number;
    imageUrl?: string;
  };
  desiredRank: {
    rank: string;
    rating?: number;
    imageUrl?: string;
  };
  comment?: string;
  booster?: string;
  offers?: string[];
  couponCode?: string;
}
