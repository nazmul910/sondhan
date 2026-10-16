export type AmbulanceType = "normal" | "ac" | "icu" | "freezing";

export type Ambulance = {
  id: string;
  name: string;
  type: AmbulanceType;
  area: string;
  phone: string | null;
  open24h: boolean;
};

export type ApiAmbulance = {
  id: number;
  name: string;
  type: string;
  district: string;
  phone: string;
  latitude: number;
  longitude: number;
  away: string | null;
};

export type AmbulanceQuery = {
  type: AmbulanceType | null;
  area: string | null;
  page: number;
};
