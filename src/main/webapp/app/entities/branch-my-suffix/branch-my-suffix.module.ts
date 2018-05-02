import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AtmCashLoadSharedModule } from '../../shared';
import {
    BranchMySuffixService,
    BranchMySuffixPopupService,
    BranchMySuffixComponent,
    BranchMySuffixDetailComponent,
    BranchMySuffixDialogComponent,
    BranchMySuffixPopupComponent,
    BranchMySuffixDeletePopupComponent,
    BranchMySuffixDeleteDialogComponent,
    branchRoute,
    branchPopupRoute,
    BranchMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...branchRoute,
    ...branchPopupRoute,
];

@NgModule({
    imports: [
        AtmCashLoadSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BranchMySuffixComponent,
        BranchMySuffixDetailComponent,
        BranchMySuffixDialogComponent,
        BranchMySuffixDeleteDialogComponent,
        BranchMySuffixPopupComponent,
        BranchMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        BranchMySuffixComponent,
        BranchMySuffixDialogComponent,
        BranchMySuffixPopupComponent,
        BranchMySuffixDeleteDialogComponent,
        BranchMySuffixDeletePopupComponent,
    ],
    providers: [
        BranchMySuffixService,
        BranchMySuffixPopupService,
        BranchMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtmCashLoadBranchMySuffixModule {}
