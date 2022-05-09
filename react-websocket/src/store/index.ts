import create from "zustand";

export const useStore = create<State>((set) => ({
  nickname: "익명",
  setNickname: (nick) =>
    set((state) => ({
      nickname: nick,
    })),
}));

type State = {
  nickname: string;
  setNickname: (setNickname: string) => void;
};
