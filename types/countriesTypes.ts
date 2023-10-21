export type Country = {
  id: number;
  name: string;
  description: string;
  country: string;
  climate: string;
  currency: string;
  latitude: number;
  longitude: number;
};

export type Coordinates = {
  latitude: number | undefined;
  longitude: number | undefined;
};
