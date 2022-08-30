import axios from "axios";

export const axiosGetWithToken = async (path: string, token: string) => {
	const response = await axios.get(path, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const axiosPostWithToken = async (
	path: string,
	token: string,
	data: any
) => {
	const response = await axios.post(path, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};
