import axios, { AxiosRequestConfig } from 'axios';

import { STANKO_API_PATH } from 'constants/ApiPath';

export const setUserSubscription = async (userId: string | undefined, pushSubscription: PushSubscription) => {
	const url = `${STANKO_API_PATH}/user/subscribe`;
	console.log(userId, pushSubscription);
	const config: AxiosRequestConfig = {
		data: {
			userId,
			pushSubscription,
		},
	}
	return await axios.post(url, config);
}
