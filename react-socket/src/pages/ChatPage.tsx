import styled from "@emotion/styled";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ChatBlock from "../components/ChatBlock";
import CommonTemplate from "../components/CommonTemplate";
import { useStore } from "../store";

export type messageDataType = {
  type: string;
  message: string;
  nickname: string;
};

const ChatPage: FunctionComponent = () => {
  const { nickname } = useStore();
  const [inputValue, setInput] = useState<string>(" ");
  const [socketConnect, setSocketConnect] = useState<boolean>(false);
  const [chat, setChat] = useState<messageDataType[]>([]);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClickButton = () => {
    ws.current!.send(
      JSON.stringify({
        type: "TALK",
        nickname: nickname,
        message: inputValue,
      })
    );
    setInput(" ");
  };

  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket("ws://localhost:8080/chat");
      ws.current.onopen = () => {
        console.log("connected to !!");
        setSocketConnect(true);
      };
      ws.current.onclose = (error) => {
        console.log("disconnect from ");
        console.log(error);
      };
      ws.current.onerror = (error) => {
        console.log("connection error ");
        console.log(error);
      };
    }
    return () => {
      if (ws.current) {
        console.log("clean up");
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (socketConnect) {
      ws.current!.send(
        JSON.stringify({
          type: "ENTER",
          nickname: nickname,
          message: "입장",
        })
      );
      ws.current!.onmessage = (evt: MessageEvent) => {
        console.log("응답값 : ", JSON.parse(evt.data));

        setChat((chat) => [...chat, JSON.parse(evt.data)]);
      };
    }
  }, [socketConnect]);

  return (
    <CommonTemplate>
      <TabBlock>
        <span style={{ fontWeight: "bold" }}>
          <Link to="/">뒤로가기</Link>
        </span>
        <span>채팅방 : Common</span>
        <span>닉네임 : {nickname}</span>
      </TabBlock>
      <TextBlock>
        {chat.map((item, index) => (
          <ChatBlock data={item} nickname={nickname} key={index} />
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

export default ChatPage;

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
