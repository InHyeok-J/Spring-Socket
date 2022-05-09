import create from "zustand";

export const useStore = create<State>((set) => ({
	user: null,
	setUser: (data: UserType) =>
		set(() => ({
			user: data,
		})),
}));

type State = {
	user: UserType | null;
	setUser: (data: UserType) => void;
};

type UserType = {
	userId: number;
	nickname: string;
};
