import Role from '@models/role';

export default interface User {
	id?: number;
	name?: string;
	password?: string;
	email?: string;
	phone?: number;
	role_id?: Role;
	avatar?: string;
	token?: string;
	confirmemail?: string;
	confirmphone?: string;
	confirmed?: string;
	created?: number;
}
