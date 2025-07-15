import { atom } from "recoil";

interface NavbarParams {
  category: string;
  tags: string[];
}

// Next.js와 Recoil을 함께 사용할 때 중복 atom 키 문제 해결을 위한 헬퍼 함수
const recoilAtomCache: Record<string, any> = {};

function atomWithSafeKey<T>(config: { key: string; default: T }) {
  // 이미 생성된 atom이 있는지 확인
  if (recoilAtomCache[config.key]) {
    return recoilAtomCache[config.key];
  }
  
  // 새로운 atom 생성
  const newAtom = atom<T>(config);
  recoilAtomCache[config.key] = newAtom;
  return newAtom;
}

// 중복 키 문제를 피하기 위해 커스텀 헬퍼 함수 사용
export const navbarParamsState = atomWithSafeKey<NavbarParams[]>({
  key: "navbarParamsState",
  default: [],
});
