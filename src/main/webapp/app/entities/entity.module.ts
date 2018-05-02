import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AtmCashLoadBankMySuffixModule } from './bank-my-suffix/bank-my-suffix.module';
import { AtmCashLoadBranchMySuffixModule } from './branch-my-suffix/branch-my-suffix.module';
import { AtmCashLoadLocationMySuffixModule } from './location-my-suffix/location-my-suffix.module';
import { AtmCashLoadAtmInformationMySuffixModule } from './atm-information-my-suffix/atm-information-my-suffix.module';
import { AtmCashLoadCompanyMySuffixModule } from './company-my-suffix/company-my-suffix.module';
import { AtmCashLoadOfficeMySuffixModule } from './office-my-suffix/office-my-suffix.module';
import { AtmCashLoadUserInformationMySuffixModule } from './user-information-my-suffix/user-information-my-suffix.module';
import { AtmCashLoadCashReceiveMySuffixModule } from './cash-receive-my-suffix/cash-receive-my-suffix.module';
import { AtmCashLoadCashIssueMySuffixModule } from './cash-issue-my-suffix/cash-issue-my-suffix.module';
import { AtmCashLoadCashBalanceMySuffixModule } from './cash-balance-my-suffix/cash-balance-my-suffix.module';
import { AtmCashLoadCashLoadMySuffixModule } from './cash-load-my-suffix/cash-load-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AtmCashLoadBankMySuffixModule,
        AtmCashLoadBranchMySuffixModule,
        AtmCashLoadLocationMySuffixModule,
        AtmCashLoadAtmInformationMySuffixModule,
        AtmCashLoadCompanyMySuffixModule,
        AtmCashLoadOfficeMySuffixModule,
        AtmCashLoadUserInformationMySuffixModule,
        AtmCashLoadCashReceiveMySuffixModule,
        AtmCashLoadCashIssueMySuffixModule,
        AtmCashLoadCashBalanceMySuffixModule,
        AtmCashLoadCashLoadMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtmCashLoadEntityModule {}
