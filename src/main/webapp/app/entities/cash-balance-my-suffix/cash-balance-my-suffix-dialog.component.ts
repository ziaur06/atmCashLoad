import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashBalanceMySuffix } from './cash-balance-my-suffix.model';
import { CashBalanceMySuffixPopupService } from './cash-balance-my-suffix-popup.service';
import { CashBalanceMySuffixService } from './cash-balance-my-suffix.service';
import { OfficeMySuffix, OfficeMySuffixService } from '../office-my-suffix';

@Component({
    selector: 'jhi-cash-balance-my-suffix-dialog',
    templateUrl: './cash-balance-my-suffix-dialog.component.html'
})
export class CashBalanceMySuffixDialogComponent implements OnInit {

    cashBalance: CashBalanceMySuffix;
    isSaving: boolean;

    offices: OfficeMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cashBalanceService: CashBalanceMySuffixService,
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
        if (this.cashBalance.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cashBalanceService.update(this.cashBalance));
        } else {
            this.subscribeToSaveResponse(
                this.cashBalanceService.create(this.cashBalance));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CashBalanceMySuffix>>) {
        result.subscribe((res: HttpResponse<CashBalanceMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CashBalanceMySuffix) {
        this.eventManager.broadcast({ name: 'cashBalanceListModification', content: 'OK'});
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
    selector: 'jhi-cash-balance-my-suffix-popup',
    template: ''
})
export class CashBalanceMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashBalancePopupService: CashBalanceMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cashBalancePopupService
                    .open(CashBalanceMySuffixDialogComponent as Component, params['id']);
            } else {
                this.cashBalancePopupService
                    .open(CashBalanceMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
