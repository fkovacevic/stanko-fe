export const checkUserNotificationPermission = async () => {
	let userNotificationPermission: NotificationPermission = Notification.permission;
	if (userNotificationPermission === 'default') {
		userNotificationPermission = await Notification.requestPermission();
	}
	return userNotificationPermission;
}

export const subscribeUser = () => {
	const applicationServerKey = 'BGRMSocKa6z_GeM5EXMK0IWv00BHIg70lTjrWnWAgU0m0dBocPJIRtt4R51F0DOQMPw-GX9D4uczIMi6zYunz3w';

	return navigator?.serviceWorker.ready
		.then((serviceWorkerRegistration) => {
			return serviceWorkerRegistration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey,
			});
		}).then((pushSubscription) => pushSubscription);
}

export const unsubscribeUser = () => {
	return navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
		return serviceWorkerRegistration.pushManager.getSubscription().then(async (subscription) => {
			console.log(subscription);
			const isSuccessful = await subscription?.unsubscribe();
			console.log(isSuccessful);
			if (isSuccessful) {
				console.log('subscription u sw', subscription)
				return subscription;
			}
			return null;
		})
	});
}
