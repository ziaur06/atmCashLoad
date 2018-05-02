import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BankMySuffix } from './bank-my-suffix.model';
import { BankMySuffixPopupService } from './bank-my-suffix-popup.service';
import { BankMySuffixService } from './bank-my-suffix.service';

@Component({
    selector: 'jhi-bank-my-suffix-dialog',
    templateUrl: './bank-my-suffix-dialog.component.html'
})
export class BankMySuffixDialogComponent implements OnInit {

    bank: BankMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private bankService: BankMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bank.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bankService.update(this.bank));
        } else {
            this.subscribeToSaveResponse(
                this.bankService.create(this.bank));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BankMySuffix>>) {
        result.subscribe((res: HttpResponse<BankMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BankMySuffix) {
        this.eventManager.broadcast({ name: 'bankListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-bank-my-suffix-popup',
    template: ''
})
export class BankMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankPopupService: BankMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bankPopupService
                    .open(BankMySuffixDialogComponent as Component, params['id']);
            } else {
                this.bankPopupService
                    .open(BankMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
