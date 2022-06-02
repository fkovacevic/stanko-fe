import { setPushSubscription } from "services/UserService";
import { checkUserNotificationPermission, subscribeUser } from "serviceWorkerSubscription";

const handleLogin = async (userId: string) => {
    const userNotificationPermission = await checkUserNotificationPermission();
    if (userNotificationPermission === 'granted') {
        const userSubscription = await subscribeUser();
        await setPushSubscription(userId, userSubscription);
    }
}

export default handleLogin;
