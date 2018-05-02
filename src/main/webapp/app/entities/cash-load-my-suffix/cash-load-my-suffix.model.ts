import { BaseEntity } from './../../shared';

export class CashLoadMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public loadingDate?: any,
        public amount?: number,
        public l100?: number,
        public l500?: number,
        public l1000?: number,
        public tag?: string,
        public atmId?: number,
    ) {
    }
}
