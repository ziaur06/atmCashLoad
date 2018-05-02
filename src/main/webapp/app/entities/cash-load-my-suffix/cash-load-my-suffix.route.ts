import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CashLoadMySuffixComponent } from './cash-load-my-suffix.component';
import { CashLoadMySuffixDetailComponent } from './cash-load-my-suffix-detail.component';
import { CashLoadMySuffixPopupComponent } from './cash-load-my-suffix-dialog.component';
import { CashLoadMySuffixDeletePopupComponent } from './cash-load-my-suffix-delete-dialog.component';

@Injectable()
export class CashLoadMySuffixResolvePagingParams implements Resolve<any> {

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

export const cashLoadRoute: Routes = [
    {
        path: 'cash-load-my-suffix',
        component: CashLoadMySuffixComponent,
        resolve: {
            'pagingParams': CashLoadMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashLoad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cash-load-my-suffix/:id',
        component: CashLoadMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashLoad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cashLoadPopupRoute: Routes = [
    {
        path: 'cash-load-my-suffix-new',
        component: CashLoadMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashLoad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-load-my-suffix/:id/edit',
        component: CashLoadMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashLoad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-load-my-suffix/:id/delete',
        component: CashLoadMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashLoad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
