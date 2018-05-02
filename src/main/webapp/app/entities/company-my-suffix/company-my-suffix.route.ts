import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CompanyMySuffixComponent } from './company-my-suffix.component';
import { CompanyMySuffixDetailComponent } from './company-my-suffix-detail.component';
import { CompanyMySuffixPopupComponent } from './company-my-suffix-dialog.component';
import { CompanyMySuffixDeletePopupComponent } from './company-my-suffix-delete-dialog.component';

export const companyRoute: Routes = [
    {
        path: 'company-my-suffix',
        component: CompanyMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'company-my-suffix/:id',
        component: CompanyMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companyPopupRoute: Routes = [
    {
        path: 'company-my-suffix-new',
        component: CompanyMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.company.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'company-my-suffix/:id/edit',
        component: CompanyMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.company.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'company-my-suffix/:id/delete',
        component: CompanyMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.company.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
