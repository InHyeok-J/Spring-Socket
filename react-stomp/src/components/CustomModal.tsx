import styled from "@emotion/styled";
import axios from "axios";
import { FunctionComponent, useState } from "react";
import { axiosPostWithToken } from "../api/AxiosWithToken";
import { LOGIN_TOKEN } from "../constant/LoginToken";

type CustomModalType = {
	closeModal: Function;
};

const CustomModal: FunctionComponent<CustomModalType> = ({ closeModal }) => {
	const [roomName, setRoomName] = useState<string | null>(null);
	const onChangeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRoomName(e.target.value);
	};

	const createRoom = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem(LOGIN_TOKEN);
			const response = await axiosPostWithToken("/api/room", token!, {
				roomName,
			});
			console.log(response);
			alert("방생성 성공");
			closeModal();
		} catch (err: any) {
			alert("방생성 실패");
			console.log(err);
		}
	};

	return (
		<ModalWrapper>
			<div>
				<Title>채팅방을 생성해보세요!</Title>
				<div>
					<p>
						방 이름 :{" "}
						<CustomInput value={roomName || ""} onChange={onChangeRoomName} />
					</p>
					<CustomButton onClick={createRoom}>방 생성</CustomButton>
				</div>
			</div>
		</ModalWrapper>
	);
};

export default CustomModal;

const ModalWrapper = styled.div`
	width: 300px;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Title = styled.p`
	font-size: 21px;
	text-align: center;
	margin-bottom: 20px;
`;
const CustomInput = styled.input`
	width: 200px;
	height: 30px;
	padding: 5px;
	border-radius: 10px;
	border: 1px solid gray;
	margin-bottom: 10px;
`;
const CustomButton = styled.button`
	width: 100%;
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
