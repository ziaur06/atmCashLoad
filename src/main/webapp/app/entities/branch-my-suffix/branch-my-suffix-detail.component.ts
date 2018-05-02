import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BranchMySuffix } from './branch-my-suffix.model';
import { BranchMySuffixService } from './branch-my-suffix.service';

@Component({
    selector: 'jhi-branch-my-suffix-detail',
    templateUrl: './branch-my-suffix-detail.component.html'
})
export class BranchMySuffixDetailComponent implements OnInit, OnDestroy {

    branch: BranchMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private branchService: BranchMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBranches();
    }

    load(id) {
        this.branchService.find(id)
            .subscribe((branchResponse: HttpResponse<BranchMySuffix>) => {
                this.branch = branchResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBranches() {
        this.eventSubscriber = this.eventManager.subscribe(
            'branchListModification',
            (response) => this.load(this.branch.id)
        );
    }
}
