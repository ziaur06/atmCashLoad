import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AtmCashLoadSharedModule } from '../../shared';
import {
    AtmInformationMySuffixService,
    AtmInformationMySuffixPopupService,
    AtmInformationMySuffixComponent,
    AtmInformationMySuffixDetailComponent,
    AtmInformationMySuffixDialogComponent,
    AtmInformationMySuffixPopupComponent,
    AtmInformationMySuffixDeletePopupComponent,
    AtmInformationMySuffixDeleteDialogComponent,
    atmInformationRoute,
    atmInformationPopupRoute,
    AtmInformationMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...atmInformationRoute,
    ...atmInformationPopupRoute,
];

@NgModule({
    imports: [
        AtmCashLoadSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AtmInformationMySuffixComponent,
        AtmInformationMySuffixDetailComponent,
        AtmInformationMySuffixDialogComponent,
        AtmInformationMySuffixDeleteDialogComponent,
        AtmInformationMySuffixPopupComponent,
        AtmInformationMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AtmInformationMySuffixComponent,
        AtmInformationMySuffixDialogComponent,
        AtmInformationMySuffixPopupComponent,
        AtmInformationMySuffixDeleteDialogComponent,
        AtmInformationMySuffixDeletePopupComponent,
    ],
    providers: [
        AtmInformationMySuffixService,
        AtmInformationMySuffixPopupService,
        AtmInformationMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtmCashLoadAtmInformationMySuffixModule {}
