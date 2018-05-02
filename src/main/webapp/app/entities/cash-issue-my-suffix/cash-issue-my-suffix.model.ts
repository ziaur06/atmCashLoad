import { BaseEntity } from './../../shared';

export class CashIssueMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public issueDate?: any,
        public amount?: number,
        public i100?: number,
        public i500?: number,
        public i1000?: number,
        public tip?: string,
        public invoiceNumber?: string,
        public tag?: string,
        public userId?: string,
        public remarks?: string,
        public officeId?: number,
    ) {
    }
}
