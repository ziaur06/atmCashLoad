import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CompanyMySuffix } from './company-my-suffix.model';
import { CompanyMySuffixService } from './company-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-company-my-suffix',
    templateUrl: './company-my-suffix.component.html'
})
export class CompanyMySuffixComponent implements OnInit, OnDestroy {
companies: CompanyMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private companyService: CompanyMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.companyService.query().subscribe(
            (res: HttpResponse<CompanyMySuffix[]>) => {
                this.companies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCompanies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CompanyMySuffix) {
        return item.id;
    }
    registerChangeInCompanies() {
        this.eventSubscriber = this.eventManager.subscribe('companyListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
