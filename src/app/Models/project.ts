import User from '@models/user';

export default interface Project {
	id: number;
	name: string;
	admin?: User;
	timestamp?: number;
}
