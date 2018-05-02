import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CashBalanceMySuffixComponent } from './cash-balance-my-suffix.component';
import { CashBalanceMySuffixDetailComponent } from './cash-balance-my-suffix-detail.component';
import { CashBalanceMySuffixPopupComponent } from './cash-balance-my-suffix-dialog.component';
import { CashBalanceMySuffixDeletePopupComponent } from './cash-balance-my-suffix-delete-dialog.component';

export const cashBalanceRoute: Routes = [
    {
        path: 'cash-balance-my-suffix',
        component: CashBalanceMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashBalance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cash-balance-my-suffix/:id',
        component: CashBalanceMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashBalance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cashBalancePopupRoute: Routes = [
    {
        path: 'cash-balance-my-suffix-new',
        component: CashBalanceMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashBalance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-balance-my-suffix/:id/edit',
        component: CashBalanceMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashBalance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-balance-my-suffix/:id/delete',
        component: CashBalanceMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashBalance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
