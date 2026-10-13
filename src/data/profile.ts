import type { Profile } from "@/types/account";

/** Mock logged-in user. Replace with the auth/profile API response later. */
export const initialProfile: Profile = {
  name: "রাফিদ হাসান",
  phone: "01711234567",
  email: "rafid@example.com",
  birthDate: "1998-04-12",
  gender: "male",
  bloodGroup: "o-pos",
  division: "ঢাকা",
  address: "মিরপুর, ঢাকা",
  isDonor: true,
  avatarUrl: null,
};
