import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { LOGIN_TOKEN } from "../constant/LoginToken";
import { useStore } from "../store";

const AuthContainer = () => {
	const navigator = useNavigate();

	const { user, setUser } = useStore();

	useEffect(() => {
		const getUser = async (token: string) => {
			const response = await axios.get("/api/user", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response.data);
			setUser({
				nickname: response.data.nickname,
				userId: response.data.userId,
			});
		};

		if (!user) {
			//유저데이터가 없는 경우,
			const savedToken = localStorage.getItem(LOGIN_TOKEN);
			console.log("저장된 토큰 : " + savedToken);
			if (!savedToken) {
				alert("로그인이 필요합니다.");
				navigator("/sign-in");
				return;
			}

			//유저데이터 없고, JWT 토큰이 있는 경우.
			(async () => {
				try {
					await getUser(savedToken);
				} catch (err: any) {
					console.error("로그인 실패");
					//JWT 토큰이 있어서 요청 보냈는데 실패하는 경우
					localStorage.removeItem(LOGIN_TOKEN);
					navigator("/sign-in");
				}
			})();
		}
	}, []);

	return <Outlet />;
};

export default AuthContainer;
