import { AMBULANCE_AREAS, AMBULANCE_TYPE_KEYS, ambulances } from "@/data/ambulance";
import type { Ambulance, AmbulanceQuery } from "@/types/ambulance";
import { paginate, type Paged } from "./list";
import { parsePage, pickOne, type RawSearchParams } from "./query";

export const AMBULANCE_PAGE_SIZE = 6;

export function parseAmbulanceQuery(raw: RawSearchParams): AmbulanceQuery {
  return {
    type: pickOne(raw.type, AMBULANCE_TYPE_KEYS),
    area: pickOne(raw.area, AMBULANCE_AREAS),
    page: parsePage(raw.page),
  };
}

export async function getAmbulances(query: AmbulanceQuery): Promise<Paged<Ambulance>> {
  const filtered = ambulances.filter((a) => (!query.type || a.type === query.type) && (!query.area || a.area === query.area));
  return paginate(filtered, query.page, AMBULANCE_PAGE_SIZE);
}
