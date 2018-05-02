import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CashReceiveMySuffixComponent } from './cash-receive-my-suffix.component';
import { CashReceiveMySuffixDetailComponent } from './cash-receive-my-suffix-detail.component';
import { CashReceiveMySuffixPopupComponent } from './cash-receive-my-suffix-dialog.component';
import { CashReceiveMySuffixDeletePopupComponent } from './cash-receive-my-suffix-delete-dialog.component';

@Injectable()
export class CashReceiveMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const cashReceiveRoute: Routes = [
    {
        path: 'cash-receive-my-suffix',
        component: CashReceiveMySuffixComponent,
        resolve: {
            'pagingParams': CashReceiveMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashReceive.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cash-receive-my-suffix/:id',
        component: CashReceiveMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashReceive.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cashReceivePopupRoute: Routes = [
    {
        path: 'cash-receive-my-suffix-new',
        component: CashReceiveMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashReceive.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-receive-my-suffix/:id/edit',
        component: CashReceiveMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashReceive.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-receive-my-suffix/:id/delete',
        component: CashReceiveMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashReceive.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
