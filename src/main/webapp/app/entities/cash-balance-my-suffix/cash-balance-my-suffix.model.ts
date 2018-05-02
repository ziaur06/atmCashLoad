import { BaseEntity } from './../../shared';

export class CashBalanceMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public balance?: number,
        public n100?: number,
        public n500?: number,
        public n1000?: number,
        public officeId?: number,
    ) {
    }
}
