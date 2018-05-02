import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AtmCashLoadSharedModule } from '../../shared';
import {
    CashBalanceMySuffixService,
    CashBalanceMySuffixPopupService,
    CashBalanceMySuffixComponent,
    CashBalanceMySuffixDetailComponent,
    CashBalanceMySuffixDialogComponent,
    CashBalanceMySuffixPopupComponent,
    CashBalanceMySuffixDeletePopupComponent,
    CashBalanceMySuffixDeleteDialogComponent,
    cashBalanceRoute,
    cashBalancePopupRoute,
} from './';

const ENTITY_STATES = [
    ...cashBalanceRoute,
    ...cashBalancePopupRoute,
];

@NgModule({
    imports: [
        AtmCashLoadSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CashBalanceMySuffixComponent,
        CashBalanceMySuffixDetailComponent,
        CashBalanceMySuffixDialogComponent,
        CashBalanceMySuffixDeleteDialogComponent,
        CashBalanceMySuffixPopupComponent,
        CashBalanceMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CashBalanceMySuffixComponent,
        CashBalanceMySuffixDialogComponent,
        CashBalanceMySuffixPopupComponent,
        CashBalanceMySuffixDeleteDialogComponent,
        CashBalanceMySuffixDeletePopupComponent,
    ],
    providers: [
        CashBalanceMySuffixService,
        CashBalanceMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtmCashLoadCashBalanceMySuffixModule {}
