import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CashBalanceMySuffix } from './cash-balance-my-suffix.model';
import { CashBalanceMySuffixService } from './cash-balance-my-suffix.service';

@Component({
    selector: 'jhi-cash-balance-my-suffix-detail',
    templateUrl: './cash-balance-my-suffix-detail.component.html'
})
export class CashBalanceMySuffixDetailComponent implements OnInit, OnDestroy {

    cashBalance: CashBalanceMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cashBalanceService: CashBalanceMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCashBalances();
    }

    load(id) {
        this.cashBalanceService.find(id)
            .subscribe((cashBalanceResponse: HttpResponse<CashBalanceMySuffix>) => {
                this.cashBalance = cashBalanceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCashBalances() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cashBalanceListModification',
            (response) => this.load(this.cashBalance.id)
        );
    }
}
