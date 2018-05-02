import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CashReceiveMySuffix } from './cash-receive-my-suffix.model';
import { CashReceiveMySuffixService } from './cash-receive-my-suffix.service';

@Component({
    selector: 'jhi-cash-receive-my-suffix-detail',
    templateUrl: './cash-receive-my-suffix-detail.component.html'
})
export class CashReceiveMySuffixDetailComponent implements OnInit, OnDestroy {

    cashReceive: CashReceiveMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cashReceiveService: CashReceiveMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCashReceives();
    }

    load(id) {
        this.cashReceiveService.find(id)
            .subscribe((cashReceiveResponse: HttpResponse<CashReceiveMySuffix>) => {
                this.cashReceive = cashReceiveResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCashReceives() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cashReceiveListModification',
            (response) => this.load(this.cashReceive.id)
        );
    }
}
