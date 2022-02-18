export interface Game {
  _id?: string;
  title: string;
  sliderImageUrl: string;
  digital: boolean;
  nameUrl: string;
  imageUrl: string;
  maxRating: number;
  offers: [
    {
      pctCost: number;
      title: string;
    }
  ];
  ranks: [
    {
      rank: string;
      startsAt?: number;
      imageUrl?: string;
      levels: [
        {
          level?: string;
          imageUrl: string;
        }
      ]
    }
  ];
}
