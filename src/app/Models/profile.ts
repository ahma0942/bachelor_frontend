import {Roles} from '@models/role';

export default interface Profile {
	id?: number;
	name?: string;
	email?: string;
	phone?: number;
	role_id?: Roles;
	avatar?: string;
	created?: string;
}
