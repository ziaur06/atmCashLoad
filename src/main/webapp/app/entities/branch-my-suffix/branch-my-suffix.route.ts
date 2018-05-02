import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BranchMySuffixComponent } from './branch-my-suffix.component';
import { BranchMySuffixDetailComponent } from './branch-my-suffix-detail.component';
import { BranchMySuffixPopupComponent } from './branch-my-suffix-dialog.component';
import { BranchMySuffixDeletePopupComponent } from './branch-my-suffix-delete-dialog.component';

@Injectable()
export class BranchMySuffixResolvePagingParams implements Resolve<any> {

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

export const branchRoute: Routes = [
    {
        path: 'branch-my-suffix',
        component: BranchMySuffixComponent,
        resolve: {
            'pagingParams': BranchMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.branch.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'branch-my-suffix/:id',
        component: BranchMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.branch.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const branchPopupRoute: Routes = [
    {
        path: 'branch-my-suffix-new',
        component: BranchMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.branch.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'branch-my-suffix/:id/edit',
        component: BranchMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.branch.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'branch-my-suffix/:id/delete',
        component: BranchMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.branch.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
