import axios from "axios";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
// import ChatPage from "./pages/ChatPage";
import { useLocation, useNavigate } from "react-router";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useStore } from "./store";

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
				navigater("/sign-in");
			}
		}
	}, []);

	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/sign-up" element={<SignUpPage />} />
			<Route path="/sign-in" element={<SignInPage />} />
			{/* <Route path="/chat" element={<ChatPage />} /> */}
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
