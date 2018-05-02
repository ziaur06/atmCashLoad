import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BranchMySuffix } from './branch-my-suffix.model';
import { BranchMySuffixPopupService } from './branch-my-suffix-popup.service';
import { BranchMySuffixService } from './branch-my-suffix.service';
import { BankMySuffix, BankMySuffixService } from '../bank-my-suffix';

@Component({
    selector: 'jhi-branch-my-suffix-dialog',
    templateUrl: './branch-my-suffix-dialog.component.html'
})
export class BranchMySuffixDialogComponent implements OnInit {

    branch: BranchMySuffix;
    isSaving: boolean;

    banks: BankMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private branchService: BranchMySuffixService,
        private bankService: BankMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bankService.query()
            .subscribe((res: HttpResponse<BankMySuffix[]>) => { this.banks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.branch.id !== undefined) {
            this.subscribeToSaveResponse(
                this.branchService.update(this.branch));
        } else {
            this.subscribeToSaveResponse(
                this.branchService.create(this.branch));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BranchMySuffix>>) {
        result.subscribe((res: HttpResponse<BranchMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BranchMySuffix) {
        this.eventManager.broadcast({ name: 'branchListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBankById(index: number, item: BankMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-branch-my-suffix-popup',
    template: ''
})
export class BranchMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private branchPopupService: BranchMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.branchPopupService
                    .open(BranchMySuffixDialogComponent as Component, params['id']);
            } else {
                this.branchPopupService
                    .open(BranchMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
