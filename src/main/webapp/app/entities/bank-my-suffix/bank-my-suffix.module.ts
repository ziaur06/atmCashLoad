import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AtmCashLoadSharedModule } from '../../shared';
import {
    BankMySuffixService,
    BankMySuffixPopupService,
    BankMySuffixComponent,
    BankMySuffixDetailComponent,
    BankMySuffixDialogComponent,
    BankMySuffixPopupComponent,
    BankMySuffixDeletePopupComponent,
    BankMySuffixDeleteDialogComponent,
    bankRoute,
    bankPopupRoute,
    BankMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...bankRoute,
    ...bankPopupRoute,
];

@NgModule({
    imports: [
        AtmCashLoadSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BankMySuffixComponent,
        BankMySuffixDetailComponent,
        BankMySuffixDialogComponent,
        BankMySuffixDeleteDialogComponent,
        BankMySuffixPopupComponent,
        BankMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        BankMySuffixComponent,
        BankMySuffixDialogComponent,
        BankMySuffixPopupComponent,
        BankMySuffixDeleteDialogComponent,
        BankMySuffixDeletePopupComponent,
    ],
    providers: [
        BankMySuffixService,
        BankMySuffixPopupService,
        BankMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtmCashLoadBankMySuffixModule {}
