import styled from "@emotion/styled";
import CommonTemplate from "../components/CommonTemplate";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import CustomModal from "../components/CustomModal";
import axios from "axios";
import Room from "../components/Room";
import { LOGIN_TOKEN } from "../constant/LoginToken";
import { axiosGetWithToken } from "../api/AxiosWithToken";

const RoomListPage = () => {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [roomList, setRoomList] = useState<roomType[] | []>([]);
	const openModal = () => {
		setModalIsOpen(true);
	};
	const closeModal = () => {
		setModalIsOpen(false);
	};

	useEffect(() => {
		const getRoomList = async () => {
			const token = localStorage.getItem(LOGIN_TOKEN);
			const response = await axiosGetWithToken("/api/room/list", token!);
			console.log(response);
			setRoomList(response.rooms);
		};
		getRoomList();
	}, []);

	return (
		<CommonTemplate>
			<ChatListWrapper>
				<CreatRoomBlock>
					<Modal
						isOpen={modalIsOpen}
						onRequestClose={closeModal}
						style={customStyles}>
						<CustomModal closeModal={closeModal} />
					</Modal>
					<CustomButton onClick={openModal}>방생성</CustomButton>
				</CreatRoomBlock>
				<RoomListBlock>
					{roomList.map((room) => (
						<Room roomId={room.id} roomName={room.name} key={room.id} />
					))}
				</RoomListBlock>
			</ChatListWrapper>
		</CommonTemplate>
	);
};

export default RoomListPage;

type roomType = {
	id: number;
	name: string;
};

const customStyles = {
	content: {
		top: "40%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

const ChatListWrapper = styled.div`
	width: 100%;
	height: auto;
	padding: 20px;
`;
const CreatRoomBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const RoomListBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
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
