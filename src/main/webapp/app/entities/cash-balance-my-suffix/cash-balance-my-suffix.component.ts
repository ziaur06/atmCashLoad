import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashBalanceMySuffix } from './cash-balance-my-suffix.model';
import { CashBalanceMySuffixService } from './cash-balance-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cash-balance-my-suffix',
    templateUrl: './cash-balance-my-suffix.component.html'
})
export class CashBalanceMySuffixComponent implements OnInit, OnDestroy {
cashBalances: CashBalanceMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cashBalanceService: CashBalanceMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cashBalanceService.query().subscribe(
            (res: HttpResponse<CashBalanceMySuffix[]>) => {
                this.cashBalances = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCashBalances();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CashBalanceMySuffix) {
        return item.id;
    }
    registerChangeInCashBalances() {
        this.eventSubscriber = this.eventManager.subscribe('cashBalanceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
