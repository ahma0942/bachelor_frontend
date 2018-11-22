export default interface Role {
	id: number;
	name?: string;
}

export enum Roles {
	User = 1,
	Admin,
}
