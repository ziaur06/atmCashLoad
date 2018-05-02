import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashReceiveMySuffix } from './cash-receive-my-suffix.model';
import { CashReceiveMySuffixPopupService } from './cash-receive-my-suffix-popup.service';
import { CashReceiveMySuffixService } from './cash-receive-my-suffix.service';
import { OfficeMySuffix, OfficeMySuffixService } from '../office-my-suffix';

@Component({
    selector: 'jhi-cash-receive-my-suffix-dialog',
    templateUrl: './cash-receive-my-suffix-dialog.component.html'
})
export class CashReceiveMySuffixDialogComponent implements OnInit {

    cashReceive: CashReceiveMySuffix;
    isSaving: boolean;

    offices: OfficeMySuffix[];
    receiveDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cashReceiveService: CashReceiveMySuffixService,
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
        if (this.cashReceive.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cashReceiveService.update(this.cashReceive));
        } else {
            this.subscribeToSaveResponse(
                this.cashReceiveService.create(this.cashReceive));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CashReceiveMySuffix>>) {
        result.subscribe((res: HttpResponse<CashReceiveMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CashReceiveMySuffix) {
        this.eventManager.broadcast({ name: 'cashReceiveListModification', content: 'OK'});
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
    selector: 'jhi-cash-receive-my-suffix-popup',
    template: ''
})
export class CashReceiveMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashReceivePopupService: CashReceiveMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cashReceivePopupService
                    .open(CashReceiveMySuffixDialogComponent as Component, params['id']);
            } else {
                this.cashReceivePopupService
                    .open(CashReceiveMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
