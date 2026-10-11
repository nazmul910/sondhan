export type BloodGroup = "a-pos" | "a-neg" | "b-pos" | "b-neg" | "ab-pos" | "ab-neg" | "o-pos" | "o-neg";

/** "find" = search donors, "donor" = register as a donor. */
export type BloodMode = "find" | "donor";

/** distance = nearest first, eligible = donors who have not given blood for the longest time first. */
export type BloodSort = "distance" | "eligible";

export type Donor = {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  area: string;
  distanceKm: number;
  /** null = has never donated before */
  lastDonatedMonthsAgo: number | null;
  available: boolean;
  phone: string | null;
};

export type DonorQuery = {
  group: BloodGroup;
  mode: BloodMode;
  sort: BloodSort;
  page: number;
};
