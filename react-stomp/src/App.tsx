import axios from "axios";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import { useNavigate } from "react-router";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useStore } from "./store";
import RoomListPage from "./pages/RoomListPage";
import RoomChatPage from "./pages/RoomChatPage";

function Root() {
	const { user, setUser } = useStore();
	const navigater = useNavigate();

	useEffect(() => {
		const getUser = async () => {
			const response = await axios.get("/api/user");
			console.log(response);
			setUser({
				nickname: response.data.nickname,
				userId: response.data.userId,
			});
		};
		if (!user) {
			try {
				getUser();
			} catch (err: any) {
				console.log("notloginUser");
				navigater("/sign-in");
			}
		}
	}, []);

	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/sign-up" element={<SignUpPage />} />
			<Route path="/sign-in" element={<SignInPage />} />
			<Route path="/room" element={<RoomListPage />} />
			<Route path="/room/chat/:id" element={<RoomChatPage />} />
		</Routes>
	);
}

function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<Root />
		</BrowserRouter>
	);
}

export default App;
