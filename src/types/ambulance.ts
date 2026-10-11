export type AmbulanceType = "normal" | "ac" | "icu" | "freezing";

export type Ambulance = {
  id: string;
  name: string;
  type: AmbulanceType;
  area: string;
  phone: string | null;
  open24h: boolean;
};

export type AmbulanceQuery = {
  type: AmbulanceType | null;
  area: string | null;
  page: number;
};
