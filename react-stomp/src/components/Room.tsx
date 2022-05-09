import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router";

type RoomPropsType = {
	roomId: number;
	roomName: string;
};

const Room: FunctionComponent<RoomPropsType> = ({ roomId, roomName }) => {
	const navigater = useNavigate();

	return (
		<RoomBlock>
			<TextBlock>방 이름 : {roomName}</TextBlock>
			<CustomButton onClick={() => navigater(`/room/chat/${roomId}`)}>
				방 입장
			</CustomButton>
		</RoomBlock>
	);
};

export default Room;

const RoomBlock = styled.div`
	width: 250px;
	height: 50px;
	border-radius: 5px;
	border: 1px solid gray;
	margin: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const TextBlock = styled.div`
	padding-left: 10px;
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
