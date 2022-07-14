import styled from "@emotion/styled";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import CommonTemplate from "../components/CommonTemplate";

const SignUpPage = () => {
	const navigater = useNavigate();
	const [nickname, setNickname] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(e.target.value);
	};
	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const signUpHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const requestData = {
			nickname,
			password,
		};
		try {
			const response = await axios.post("/api/user/sign-up", requestData);
			console.log(response);
			alert("회원가입 성공!");
			navigater("/sign-in");
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<CommonTemplate>
			<SignUpWrapper>
				<div>
					닉네임 <CustomInput value={nickname!} onChange={onChangeNickname} />
				</div>
				<div>
					패스워드 <CustomInput value={password!} onChange={onChangePassword} />
				</div>
				<CustomButton onClick={signUpHandler}>회원가입</CustomButton>
			</SignUpWrapper>
		</CommonTemplate>
	);
};

export default SignUpPage;

const SignUpWrapper = styled.div`
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
