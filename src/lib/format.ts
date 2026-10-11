const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** 4.8 -> "৪.৮" */
export const toBn = (value: number | string) => String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

export const formatRating = (rating: number) => toBn(rating.toFixed(1));

export const formatDistance = (km: number) =>
  km < 1 ? `${toBn(Math.round(km * 1000))} মিটার` : `${toBn(km.toFixed(1))} কিমি`;

export const formatFee = (fee: number | null) => (fee === null ? "[ফি]" : `${toBn(fee)} টাকা`);
