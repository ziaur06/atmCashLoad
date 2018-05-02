import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AtmCashLoadSharedModule } from '../../shared';
import {
    CashLoadMySuffixService,
    CashLoadMySuffixPopupService,
    CashLoadMySuffixComponent,
    CashLoadMySuffixDetailComponent,
    CashLoadMySuffixDialogComponent,
    CashLoadMySuffixPopupComponent,
    CashLoadMySuffixDeletePopupComponent,
    CashLoadMySuffixDeleteDialogComponent,
    cashLoadRoute,
    cashLoadPopupRoute,
    CashLoadMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cashLoadRoute,
    ...cashLoadPopupRoute,
];

@NgModule({
    imports: [
        AtmCashLoadSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CashLoadMySuffixComponent,
        CashLoadMySuffixDetailComponent,
        CashLoadMySuffixDialogComponent,
        CashLoadMySuffixDeleteDialogComponent,
        CashLoadMySuffixPopupComponent,
        CashLoadMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CashLoadMySuffixComponent,
        CashLoadMySuffixDialogComponent,
        CashLoadMySuffixPopupComponent,
        CashLoadMySuffixDeleteDialogComponent,
        CashLoadMySuffixDeletePopupComponent,
    ],
    providers: [
        CashLoadMySuffixService,
        CashLoadMySuffixPopupService,
        CashLoadMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtmCashLoadCashLoadMySuffixModule {}
