import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SockJS from "sockjs-client";
import ChatBlock from "../components/ChatBlock";
import CommonTemplate from "../components/CommonTemplate";
import { useStore } from "../store";

import * as StompJS from "@stomp/stompjs";

export type messageDataType = {
	type: messageType;
	message: string;
	nickname: string;
};

export enum messageType {
	ENTER,
	MESSAGE,
}

const dummyChat = [
	{
		type: messageType.ENTER,
		message: "ㅎㅇ님이 입장하셨습니다.",
		nickname: "ㅎㅇ",
	},
	{
		type: messageType.MESSAGE,
		message: "메시지1",
		nickname: "ㅎㅇ",
	},
	{
		type: messageType.MESSAGE,
		message: "메시지1",
		nickname: "ㅎㅇ",
	},
	{
		type: messageType.ENTER,
		message: "닉네임 님이 입장하셨습니다.",
		nickname: "닉네임",
	},
	{
		type: messageType.MESSAGE,
		message: "메시지1",
		nickname: "닉네임",
	},
];

const RoomChatPage = () => {
	// const { user } = useStore();
	const user = {
		nickname: "hello",
	};
	const [inputValue, setInput] = useState<string>(" ");
	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};
	const client = new StompJS.Client();
	const onClickButton = () => {
		client.publish({
			destination: "/pub/ready/14",
			body: JSON.stringify({
				type: "READY",
				senderId: 11,
			}),
		});
	};

	const ex2 = "ws://15.164.169.48:4000/ws";
	const local = "ws://127.0.0.1:8081/ws";
	const connect = () => {
		client.configure({
			brokerURL: local, // 왜 websocket을 붙여줘야하는거지..?
			// webSocketFactory: () => new SockJS("/ws"),
			onConnect: (message) => {
				console.log(message);
				console.log("연결 성공");
				wsSubscribeChat();
				wsSubscribeMe();
			},
			debug: function (str) {
				console.log(str);
			},
		});

		client.activate();
	};

	const wsSubscribeChat = () => {
		client.subscribe("/sub/chat/14", (msg) => {
			console.log("sub/chat/14 메시지 받기 성공-------------");
			console.log(msg);
			console.log("-------------");
			console.log(msg.body);
		});
	};

	const wsSubscribeMe = () => {
		client.subscribe("/sub/member/11", (msg) => {
			console.log("sub/member/11 메시지 받기 성공-------------");
			console.log(msg);
		});
	};

	// const ws = useRef<any>(null);
	useEffect(() => {
		connect();
	}, []);

	return (
		<CommonTemplate>
			<TabBlock>
				<span style={{ fontWeight: "bold" }}>
					<Link to="/">뒤로가기</Link>
				</span>
				<span>채팅방 : Common</span>
				<span>닉네임 : {user?.nickname}</span>
			</TabBlock>
			<TextBlock>
				{dummyChat.map((item, index) => (
					<ChatBlock data={item} nickname={user!.nickname} key={index} />
				))}
			</TextBlock>
			<InputBlock>
				<Input value={inputValue!} onChange={onChangeInput} type="textarea" />
				<ButtonBox>
					<Button onClick={onClickButton}>전송</Button>
				</ButtonBox>
			</InputBlock>
		</CommonTemplate>
	);
};
export default RoomChatPage;

const TabBlock = styled.div`
	width: 100%;
	height: 50px;
	background-color: #2e9afe;
	display: flex;
	justify-content: space-around;
	align-items: center;
	span {
		color: black;
	}
`;

const TextBlock = styled.div`
	width: 100%;
	height: 550px;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
`;

const InputBlock = styled.div`
	width: 100%;
	height: 80px;
	border-top: 1px solid gray;
	display: flex;
`;

const Input = styled.input`
	width: 80%;
	height: 80px;
	border: none;
	padding: 20px;
`;
const ButtonBox = styled.div`
	width: 20%;
	height: 100px;
	padding: 5px;
`;
const Button = styled.button`
	width: 65px;
	height: 65px;
	background-color: #2e9afe;
	border: 1px solid #0040ff;
	:hover {
		background-color: #0080ff;
	}
	cursor: pointer;
	color: white;
	font-size: 18px;
`;
