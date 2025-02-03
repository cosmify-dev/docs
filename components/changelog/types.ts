export type Star = {
  x: number;
  y: number;
  big: boolean;
};

export type Constellation = {
  stars: Star[];
  filled: boolean;
};
