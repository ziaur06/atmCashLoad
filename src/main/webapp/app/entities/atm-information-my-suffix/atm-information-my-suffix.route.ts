import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AtmInformationMySuffixComponent } from './atm-information-my-suffix.component';
import { AtmInformationMySuffixDetailComponent } from './atm-information-my-suffix-detail.component';
import { AtmInformationMySuffixPopupComponent } from './atm-information-my-suffix-dialog.component';
import { AtmInformationMySuffixDeletePopupComponent } from './atm-information-my-suffix-delete-dialog.component';

@Injectable()
export class AtmInformationMySuffixResolvePagingParams implements Resolve<any> {

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

export const atmInformationRoute: Routes = [
    {
        path: 'atm-information-my-suffix',
        component: AtmInformationMySuffixComponent,
        resolve: {
            'pagingParams': AtmInformationMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.atmInformation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'atm-information-my-suffix/:id',
        component: AtmInformationMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.atmInformation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const atmInformationPopupRoute: Routes = [
    {
        path: 'atm-information-my-suffix-new',
        component: AtmInformationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.atmInformation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'atm-information-my-suffix/:id/edit',
        component: AtmInformationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.atmInformation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'atm-information-my-suffix/:id/delete',
        component: AtmInformationMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'atmCashLoadApp.atmInformation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
