import { BaseEntity } from './../../shared';

export const enum Status {
    'ACTIVE',
    'INACTIVE',
    'CLOSE'
}

export class AtmInformationMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public model?: string,
        public status?: Status,
        public offices?: BaseEntity[],
        public locationId?: number,
        public branchId?: number,
    ) {
    }
}
