import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AtmCashLoadSharedModule } from '../../shared';
import {
    CashIssueMySuffixService,
    CashIssueMySuffixPopupService,
    CashIssueMySuffixComponent,
    CashIssueMySuffixDetailComponent,
    CashIssueMySuffixDialogComponent,
    CashIssueMySuffixPopupComponent,
    CashIssueMySuffixDeletePopupComponent,
    CashIssueMySuffixDeleteDialogComponent,
    cashIssueRoute,
    cashIssuePopupRoute,
    CashIssueMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cashIssueRoute,
    ...cashIssuePopupRoute,
];

@NgModule({
    imports: [
        AtmCashLoadSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CashIssueMySuffixComponent,
        CashIssueMySuffixDetailComponent,
        CashIssueMySuffixDialogComponent,
        CashIssueMySuffixDeleteDialogComponent,
        CashIssueMySuffixPopupComponent,
        CashIssueMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CashIssueMySuffixComponent,
        CashIssueMySuffixDialogComponent,
        CashIssueMySuffixPopupComponent,
        CashIssueMySuffixDeleteDialogComponent,
        CashIssueMySuffixDeletePopupComponent,
    ],
    providers: [
        CashIssueMySuffixService,
        CashIssueMySuffixPopupService,
        CashIssueMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtmCashLoadCashIssueMySuffixModule {}
