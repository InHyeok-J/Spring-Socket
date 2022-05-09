import styled from "@emotion/styled";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import CommonTemplate from "../components/CommonTemplate";
import { useStore } from "../store";

const SignInPage = () => {
	const navigater = useNavigate();
	const [nickname, setNickname] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);
	const { user: userInfo, setUser } = useStore();

	const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(e.target.value);
	};
	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const signInHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const requestData = {
			nickname,
			password,
		};
		try {
			const response = await axios.post("/api/user/sign-in", requestData);
			console.log(response);
			alert("로그인 성공!");
			setUser({
				nickname: response.data.nickname,
				userId: response.data.userId,
			});
			navigater("/");
		} catch (e: any) {
			const errorBody: { errorCase: string; message: string } = e.response.data;
			alert(errorBody.message);
			console.log(errorBody);
		}
	};

	return (
		<CommonTemplate>
			<SignInWrapper>
				<div>
					닉네임{" "}
					<CustomInput value={nickname || ""} onChange={onChangeNickname} />
				</div>
				<div>
					패스워드{" "}
					<CustomInput value={password || ""} onChange={onChangePassword} />
				</div>
				<CustomButton onClick={signInHandler}>로그인</CustomButton>
				<div>유저가 아니면 회원가입 하세요!</div>
				<CustomButton onClick={() => navigater("/sign-up")}>
					go signUp
				</CustomButton>
			</SignInWrapper>
		</CommonTemplate>
	);
};

export default SignInPage;
const SignInWrapper = styled.div`
	width: 100%;
	height: 400px;
	display: flex;
	/* justify-content: center; */
	align-items: center;
	flex-direction: column;
	padding-top: 100px;
	.text {
		color: black;
		font-size: 20px;
		padding-bottom: 10px;
	}
`;
const CustomInput = styled.input`
	width: 150px;
	height: 30px;
	padding: 5px;
	border-radius: 10px;
	border: 1px solid gray;
	margin-bottom: 10px;
`;
const CustomButton = styled.button`
	width: 100px;
	height: 40px;
	border-radius: 5px;
	border: 1px solid white;
	background-color: #2e9afe;
	color: white;
	font-size: 18px;
	cursor: pointer;
	margin-bottom: 10px;
	margin-top: 10px;
	:hover {
		color: #a9bcf5;
		transition: 0.1s;
	}
`;
