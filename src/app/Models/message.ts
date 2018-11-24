import User from '@models/user';

export default interface Message {
	id?: number;
	message?: string;
	number?: number;
	timestamp?: number;
	changed?: number;
	deleted?: boolean;
	type?: number;
	user_id?: User;
	created?: boolean;
	src?: string;
}
