import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AtmCashLoadSharedModule } from '../../shared';
import {
    CashReceiveMySuffixService,
    CashReceiveMySuffixPopupService,
    CashReceiveMySuffixComponent,
    CashReceiveMySuffixDetailComponent,
    CashReceiveMySuffixDialogComponent,
    CashReceiveMySuffixPopupComponent,
    CashReceiveMySuffixDeletePopupComponent,
    CashReceiveMySuffixDeleteDialogComponent,
    cashReceiveRoute,
    cashReceivePopupRoute,
    CashReceiveMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cashReceiveRoute,
    ...cashReceivePopupRoute,
];

@NgModule({
    imports: [
        AtmCashLoadSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CashReceiveMySuffixComponent,
        CashReceiveMySuffixDetailComponent,
        CashReceiveMySuffixDialogComponent,
        CashReceiveMySuffixDeleteDialogComponent,
        CashReceiveMySuffixPopupComponent,
        CashReceiveMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CashReceiveMySuffixComponent,
        CashReceiveMySuffixDialogComponent,
        CashReceiveMySuffixPopupComponent,
        CashReceiveMySuffixDeleteDialogComponent,
        CashReceiveMySuffixDeletePopupComponent,
    ],
    providers: [
        CashReceiveMySuffixService,
        CashReceiveMySuffixPopupService,
        CashReceiveMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtmCashLoadCashReceiveMySuffixModule {}
