import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CashIssueMySuffix } from './cash-issue-my-suffix.model';
import { CashIssueMySuffixService } from './cash-issue-my-suffix.service';

@Component({
    selector: 'jhi-cash-issue-my-suffix-detail',
    templateUrl: './cash-issue-my-suffix-detail.component.html'
})
export class CashIssueMySuffixDetailComponent implements OnInit, OnDestroy {

    cashIssue: CashIssueMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cashIssueService: CashIssueMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCashIssues();
    }

    load(id) {
        this.cashIssueService.find(id)
            .subscribe((cashIssueResponse: HttpResponse<CashIssueMySuffix>) => {
                this.cashIssue = cashIssueResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCashIssues() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cashIssueListModification',
            (response) => this.load(this.cashIssue.id)
        );
    }
}
