import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UserInformationMySuffixComponent } from './user-information-my-suffix.component';
import { UserInformationMySuffixDetailComponent } from './user-information-my-suffix-detail.component';
import { UserInformationMySuffixPopupComponent } from './user-information-my-suffix-dialog.component';
import { UserInformationMySuffixDeletePopupComponent } from './user-information-my-suffix-delete-dialog.component';

@Injectable()
export class UserInformationMySuffixResolvePagingParams implements Resolve<any> {

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

export const userInformationRoute: Routes = [
    {
        path: 'user-information-my-suffix',
        component: UserInformationMySuffixComponent,
        resolve: {
            'pagingParams': UserInformationMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.userInformation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-information-my-suffix/:id',
        component: UserInformationMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.userInformation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userInformationPopupRoute: Routes = [
    {
        path: 'user-information-my-suffix-new',
        component: UserInformationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.userInformation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-information-my-suffix/:id/edit',
        component: UserInformationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.userInformation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-information-my-suffix/:id/delete',
        component: UserInformationMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.userInformation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
