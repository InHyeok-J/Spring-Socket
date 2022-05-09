import React, { FunctionComponent, useState } from "react";
import styled from "@emotion/styled";
import { useStore } from "../store";
import CommonTemplate from "../components/CommonTemplate";
import { useNavigate } from "react-router";

const MainPage: FunctionComponent = () => {
  const navigater = useNavigate();
  const { nickname, setNickname } = useStore();
  const [nick, setNick] = useState<string>(" ");
  const onChangeNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNick(e.target.value);
  };

  return (
    <CommonTemplate>
      <TextBlock>
        <p className="text">닉네임을 입력해 주세요!</p>
        <p className="text">nickname : {nickname}</p>
        <CustomInput
          value={nick}
          onChange={onChangeNick}
          placeholder="이름 입력하셈"></CustomInput>
        <CustomButton onClick={() => setNickname(nick!)}>
          이름 변경
        </CustomButton>
        <Line />
        <CustomButton onClick={() => navigater("/chat")}>
          채팅 시작!
        </CustomButton>
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

const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
`;
