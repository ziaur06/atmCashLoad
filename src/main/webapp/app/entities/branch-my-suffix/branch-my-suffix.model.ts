import { BaseEntity } from './../../shared';

export class BranchMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public addressLine1?: string,
        public addressLine2?: string,
        public mobileNumber?: string,
        public phoneNumber?: string,
        public email?: string,
        public bankId?: number,
    ) {
    }
}
