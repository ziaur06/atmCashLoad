import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BankMySuffix } from './bank-my-suffix.model';
import { BankMySuffixService } from './bank-my-suffix.service';

@Component({
    selector: 'jhi-bank-my-suffix-detail',
    templateUrl: './bank-my-suffix-detail.component.html'
})
export class BankMySuffixDetailComponent implements OnInit, OnDestroy {

    bank: BankMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bankService: BankMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBanks();
    }

    load(id) {
        this.bankService.find(id)
            .subscribe((bankResponse: HttpResponse<BankMySuffix>) => {
                this.bank = bankResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBanks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bankListModification',
            (response) => this.load(this.bank.id)
        );
    }
}
