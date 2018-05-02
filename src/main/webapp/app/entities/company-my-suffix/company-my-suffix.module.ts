import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AtmCashLoadSharedModule } from '../../shared';
import {
    CompanyMySuffixService,
    CompanyMySuffixPopupService,
    CompanyMySuffixComponent,
    CompanyMySuffixDetailComponent,
    CompanyMySuffixDialogComponent,
    CompanyMySuffixPopupComponent,
    CompanyMySuffixDeletePopupComponent,
    CompanyMySuffixDeleteDialogComponent,
    companyRoute,
    companyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...companyRoute,
    ...companyPopupRoute,
];

@NgModule({
    imports: [
        AtmCashLoadSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CompanyMySuffixComponent,
        CompanyMySuffixDetailComponent,
        CompanyMySuffixDialogComponent,
        CompanyMySuffixDeleteDialogComponent,
        CompanyMySuffixPopupComponent,
        CompanyMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CompanyMySuffixComponent,
        CompanyMySuffixDialogComponent,
        CompanyMySuffixPopupComponent,
        CompanyMySuffixDeleteDialogComponent,
        CompanyMySuffixDeletePopupComponent,
    ],
    providers: [
        CompanyMySuffixService,
        CompanyMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtmCashLoadCompanyMySuffixModule {}
