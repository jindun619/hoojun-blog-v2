import { atom } from "recoil";

interface NavbarParams {
  category: string;
  tags: string[];
}
export const navbarParamsState = atom<NavbarParams[]>({
  key: "navbarParamsState",
  default: [],
});
