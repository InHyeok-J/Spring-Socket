import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import { messageDataType, messageType } from "../pages/RoomChatPage";

const BlockWrapper = styled.div`
	margin: 7px;
`;

type chatBlockProps = {
	data: messageDataType;
	nickname: string;
};

const ChatBlock: FunctionComponent<chatBlockProps> = ({ data, nickname }) => {
	const isMyText = data.nickname === nickname;
	const chatType = data.type;

	return (
		<BlockWrapper>
			{chatType === messageType.ENTER ? (
				<EnterText>{data.message}</EnterText>
			) : isMyText ? (
				<MyText>{data.message}</MyText>
			) : (
				<>
					<NicknameBlock>{data.nickname}</NicknameBlock>
					<OtherText>{data.message}</OtherText>
				</>
			)}
		</BlockWrapper>
	);
};

export default ChatBlock;

const NicknameBlock = styled.div`
	color: gray;
	font-size: 12px;
`;

const EnterText = styled.div`
	padding: 10px;
`;

const MyText = styled.div`
	float: right;
	display: block;
	padding: 10px;
	border: 1px solid gray;
	border-radius: 10px;
	background-color: #cef6e3;
`;

const OtherText = styled.div`
	display: inline-block;
	padding: 10px;
	border: 1px solid gray;
	border-radius: 10px;
`;
