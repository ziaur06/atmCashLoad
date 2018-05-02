import { BaseEntity } from './../../shared';

export class CompanyMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
    ) {
    }
}
