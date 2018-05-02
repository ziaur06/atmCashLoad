import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CashLoadMySuffix } from './cash-load-my-suffix.model';
import { CashLoadMySuffixService } from './cash-load-my-suffix.service';

@Component({
    selector: 'jhi-cash-load-my-suffix-detail',
    templateUrl: './cash-load-my-suffix-detail.component.html'
})
export class CashLoadMySuffixDetailComponent implements OnInit, OnDestroy {

    cashLoad: CashLoadMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cashLoadService: CashLoadMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCashLoads();
    }

    load(id) {
        this.cashLoadService.find(id)
            .subscribe((cashLoadResponse: HttpResponse<CashLoadMySuffix>) => {
                this.cashLoad = cashLoadResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCashLoads() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cashLoadListModification',
            (response) => this.load(this.cashLoad.id)
        );
    }
}
