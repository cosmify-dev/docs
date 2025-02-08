export type Star = {
  x: number;
  y: number;
  big: boolean;
};

export type Constellation = {
  key: string;
  stars: Star[];
  filled: boolean;
};
