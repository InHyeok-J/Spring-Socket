import React, { FunctionComponent, useState } from "react";
import styled from "@emotion/styled";
import { useStore } from "../store";
import CommonTemplate from "../components/CommonTemplate";
import { useNavigate } from "react-router";

const MainPage: FunctionComponent = () => {
	const navigater = useNavigate();
	const { user: userInfo } = useStore();

	return (
		<CommonTemplate>
			<TextBlock>
				{userInfo ? (
					<Block>
						<p>{userInfo.nickname} 님 안녕하세요!</p>
						<Line />
						<CustomButton onClick={() => navigater("/room")}>
							룸 보기
						</CustomButton>
					</Block>
				) : (
					<Block>
						<p>간단 로그인을 해주세요</p>
						<CustomButton onClick={() => navigater("/sign-in")}>
							로그인
						</CustomButton>
					</Block>
				)}
			</TextBlock>
		</CommonTemplate>
	);
};

export default MainPage;

const TextBlock = styled.div`
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

const Block = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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

const Line = styled.div`
	width: 100%;
	border-bottom: 1px solid gray;
`;
