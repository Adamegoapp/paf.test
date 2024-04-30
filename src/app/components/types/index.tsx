export type Item = {
  id: number;
  title: string;
  provider?: string;
  image: string;
};

export type List = {
  id: string;
  title: string;
  items: Item[];
};

export type GameData = {
  title: string;
  description: string;
  lists: List[];
};
