import { BaseEntity } from './../../shared';

export class OfficeMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public atmInformationId?: number,
        public companyId?: number,
    ) {
    }
}
