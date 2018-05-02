import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CompanyMySuffix } from './company-my-suffix.model';
import { CompanyMySuffixService } from './company-my-suffix.service';

@Component({
    selector: 'jhi-company-my-suffix-detail',
    templateUrl: './company-my-suffix-detail.component.html'
})
export class CompanyMySuffixDetailComponent implements OnInit, OnDestroy {

    company: CompanyMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private companyService: CompanyMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCompanies();
    }

    load(id) {
        this.companyService.find(id)
            .subscribe((companyResponse: HttpResponse<CompanyMySuffix>) => {
                this.company = companyResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCompanies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'companyListModification',
            (response) => this.load(this.company.id)
        );
    }
}
