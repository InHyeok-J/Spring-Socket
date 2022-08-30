import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import RoomListPage from "./pages/RoomListPage";
import RoomChatPage from "./pages/RoomChatPage";
import AuthContainer from "./containers/AuthContainer";

function Root() {
	return (
		<Routes>
			<Route path="/" element={<AuthContainer />}>
				<Route path="" element={<MainPage />} />
				<Route path="room" element={<RoomListPage />} />
			</Route>
			<Route path="/room/chat/:id" element={<RoomChatPage />} />

			<Route path="/sign-up" element={<SignUpPage />} />
			<Route path="/sign-in" element={<SignInPage />} />
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
