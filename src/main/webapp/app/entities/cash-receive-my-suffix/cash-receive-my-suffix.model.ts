import { BaseEntity } from './../../shared';

export class CashReceiveMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public receiveDate?: any,
        public amount?: number,
        public userId?: string,
        public remarks?: string,
        public invoiceNumber?: string,
        public tag?: string,
        public r100?: number,
        public r500?: number,
        public r1000?: number,
        public recjectedAmount?: number,
        public f100?: number,
        public f500?: number,
        public f1000?: number,
        public tip?: string,
        public officeId?: number,
    ) {
    }
}
