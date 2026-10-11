const BN_TO_EN: Record<string, string> = { "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9" };

/** "০১৭১১-২৩৪৫৬৭" -> "01711234567" (Bangla digits, spaces and dashes accepted). */
export const normalizePhone = (value: string) => value.replace(/[০-৯]/g, (d) => BN_TO_EN[d]).replace(/[\s-]/g, "");

/** Bangladeshi mobile number: 01[3-9] followed by 8 digits. */
export const isValidBdPhone = (value: string) => /^01[3-9]\d{8}$/.test(normalizePhone(value));
