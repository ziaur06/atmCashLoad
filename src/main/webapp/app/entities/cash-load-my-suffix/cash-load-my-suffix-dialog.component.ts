import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CashLoadMySuffix } from './cash-load-my-suffix.model';
import { CashLoadMySuffixPopupService } from './cash-load-my-suffix-popup.service';
import { CashLoadMySuffixService } from './cash-load-my-suffix.service';
import { AtmInformationMySuffix, AtmInformationMySuffixService } from '../atm-information-my-suffix';

@Component({
    selector: 'jhi-cash-load-my-suffix-dialog',
    templateUrl: './cash-load-my-suffix-dialog.component.html'
})
export class CashLoadMySuffixDialogComponent implements OnInit {

    cashLoad: CashLoadMySuffix;
    isSaving: boolean;

    atminformations: AtmInformationMySuffix[];
    loadingDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cashLoadService: CashLoadMySuffixService,
        private atmInformationService: AtmInformationMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.atmInformationService.query()
            .subscribe((res: HttpResponse<AtmInformationMySuffix[]>) => { this.atminformations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cashLoad.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cashLoadService.update(this.cashLoad));
        } else {
            this.subscribeToSaveResponse(
                this.cashLoadService.create(this.cashLoad));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CashLoadMySuffix>>) {
        result.subscribe((res: HttpResponse<CashLoadMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CashLoadMySuffix) {
        this.eventManager.broadcast({ name: 'cashLoadListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAtmInformationById(index: number, item: AtmInformationMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cash-load-my-suffix-popup',
    template: ''
})
export class CashLoadMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashLoadPopupService: CashLoadMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cashLoadPopupService
                    .open(CashLoadMySuffixDialogComponent as Component, params['id']);
            } else {
                this.cashLoadPopupService
                    .open(CashLoadMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
