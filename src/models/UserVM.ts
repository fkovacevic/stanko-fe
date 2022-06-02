import firebase from 'firebase/compat/app';

interface UserServiceModel {
	id: string;
	data: any;
}

export interface UserSubscription {
	priceMin?: number;
	priceMax?: number;
	areaMin?: number;
	areaMax?: number;
	partOfTown?: string;
}

class UserVM {
	id?: string;
	userSubscription: UserSubscription;
	pushSubscription: PushSubscription[];
	constructor(userSM: UserServiceModel) {
		const { id, data } = userSM;
		const { userSubscription, pushSubscription } = data;
		const { priceMin, priceMax, areaMin, areaMax, partOfTown } = userSubscription;
		this.id = id;
		if (Object.keys(userSubscription).length > 0) {
			this.userSubscription = {
				priceMin,
				priceMax,
				areaMin,
				areaMax,
				partOfTown,
			};
		} else {
			this.userSubscription = {};
		}
		this.pushSubscription = pushSubscription;
	}
    static userSubscriptionConverter = {
        toFirestore(user: UserVM): firebase.firestore.DocumentData {
			return user;
		  },
        fromFirestore(
          snapshot: firebase.firestore.QueryDocumentSnapshot,
          options: firebase.firestore.SnapshotOptions
        ): UserVM {
          const data = snapshot.data(options);
          return new UserVM({ id: snapshot.id, data });
        }
  }
}


export default UserVM;