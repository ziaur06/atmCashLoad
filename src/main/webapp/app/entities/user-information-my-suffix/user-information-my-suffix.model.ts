import { BaseEntity } from './../../shared';

export const enum Status {
    'ACTIVE',
    'INACTIVE',
    'CLOSE'
}

export class UserInformationMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: string,
        public userName?: string,
        public email?: string,
        public phone?: string,
        public password?: string,
        public status?: Status,
        public officeId?: number,
    ) {
    }
}
