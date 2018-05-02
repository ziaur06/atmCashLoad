import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BankMySuffixComponent } from './bank-my-suffix.component';
import { BankMySuffixDetailComponent } from './bank-my-suffix-detail.component';
import { BankMySuffixPopupComponent } from './bank-my-suffix-dialog.component';
import { BankMySuffixDeletePopupComponent } from './bank-my-suffix-delete-dialog.component';

@Injectable()
export class BankMySuffixResolvePagingParams implements Resolve<any> {

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

export const bankRoute: Routes = [
    {
        path: 'bank-my-suffix',
        component: BankMySuffixComponent,
        resolve: {
            'pagingParams': BankMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bank-my-suffix/:id',
        component: BankMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankPopupRoute: Routes = [
    {
        path: 'bank-my-suffix-new',
        component: BankMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-my-suffix/:id/edit',
        component: BankMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-my-suffix/:id/delete',
        component: BankMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.bank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
