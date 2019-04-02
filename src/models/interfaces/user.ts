export interface IUser {
    id?: string;
    email?: string;
    roles?: Array<{groupId: string, role: string}>;
}
