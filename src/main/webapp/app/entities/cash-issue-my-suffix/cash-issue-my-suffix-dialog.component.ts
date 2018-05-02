import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashIssueMySuffix } from './cash-issue-my-suffix.model';
import { CashIssueMySuffixPopupService } from './cash-issue-my-suffix-popup.service';
import { CashIssueMySuffixService } from './cash-issue-my-suffix.service';
import { OfficeMySuffix, OfficeMySuffixService } from '../office-my-suffix';

@Component({
    selector: 'jhi-cash-issue-my-suffix-dialog',
    templateUrl: './cash-issue-my-suffix-dialog.component.html'
})
export class CashIssueMySuffixDialogComponent implements OnInit {

    cashIssue: CashIssueMySuffix;
    isSaving: boolean;

    offices: OfficeMySuffix[];
    issueDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cashIssueService: CashIssueMySuffixService,
        private officeService: OfficeMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.officeService.query()
            .subscribe((res: HttpResponse<OfficeMySuffix[]>) => { this.offices = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cashIssue.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cashIssueService.update(this.cashIssue));
        } else {
            this.subscribeToSaveResponse(
                this.cashIssueService.create(this.cashIssue));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CashIssueMySuffix>>) {
        result.subscribe((res: HttpResponse<CashIssueMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CashIssueMySuffix) {
        this.eventManager.broadcast({ name: 'cashIssueListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOfficeById(index: number, item: OfficeMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cash-issue-my-suffix-popup',
    template: ''
})
export class CashIssueMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashIssuePopupService: CashIssueMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cashIssuePopupService
                    .open(CashIssueMySuffixDialogComponent as Component, params['id']);
            } else {
                this.cashIssuePopupService
                    .open(CashIssueMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
