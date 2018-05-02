import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CashIssueMySuffixComponent } from './cash-issue-my-suffix.component';
import { CashIssueMySuffixDetailComponent } from './cash-issue-my-suffix-detail.component';
import { CashIssueMySuffixPopupComponent } from './cash-issue-my-suffix-dialog.component';
import { CashIssueMySuffixDeletePopupComponent } from './cash-issue-my-suffix-delete-dialog.component';

@Injectable()
export class CashIssueMySuffixResolvePagingParams implements Resolve<any> {

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

export const cashIssueRoute: Routes = [
    {
        path: 'cash-issue-my-suffix',
        component: CashIssueMySuffixComponent,
        resolve: {
            'pagingParams': CashIssueMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashIssue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cash-issue-my-suffix/:id',
        component: CashIssueMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashIssue.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cashIssuePopupRoute: Routes = [
    {
        path: 'cash-issue-my-suffix-new',
        component: CashIssueMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashIssue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-issue-my-suffix/:id/edit',
        component: CashIssueMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashIssue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cash-issue-my-suffix/:id/delete',
        component: CashIssueMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.cashIssue.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
