import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AtmCashLoadSharedModule } from '../../shared';
import {
    UserInformationMySuffixService,
    UserInformationMySuffixPopupService,
    UserInformationMySuffixComponent,
    UserInformationMySuffixDetailComponent,
    UserInformationMySuffixDialogComponent,
    UserInformationMySuffixPopupComponent,
    UserInformationMySuffixDeletePopupComponent,
    UserInformationMySuffixDeleteDialogComponent,
    userInformationRoute,
    userInformationPopupRoute,
    UserInformationMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userInformationRoute,
    ...userInformationPopupRoute,
];

@NgModule({
    imports: [
        AtmCashLoadSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserInformationMySuffixComponent,
        UserInformationMySuffixDetailComponent,
        UserInformationMySuffixDialogComponent,
        UserInformationMySuffixDeleteDialogComponent,
        UserInformationMySuffixPopupComponent,
        UserInformationMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        UserInformationMySuffixComponent,
        UserInformationMySuffixDialogComponent,
        UserInformationMySuffixPopupComponent,
        UserInformationMySuffixDeleteDialogComponent,
        UserInformationMySuffixDeletePopupComponent,
    ],
    providers: [
        UserInformationMySuffixService,
        UserInformationMySuffixPopupService,
        UserInformationMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtmCashLoadUserInformationMySuffixModule {}
