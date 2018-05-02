import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CompanyMySuffix } from './company-my-suffix.model';
import { CompanyMySuffixPopupService } from './company-my-suffix-popup.service';
import { CompanyMySuffixService } from './company-my-suffix.service';

@Component({
    selector: 'jhi-company-my-suffix-dialog',
    templateUrl: './company-my-suffix-dialog.component.html'
})
export class CompanyMySuffixDialogComponent implements OnInit {

    company: CompanyMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private companyService: CompanyMySuffixService,
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
        if (this.company.id !== undefined) {
            this.subscribeToSaveResponse(
                this.companyService.update(this.company));
        } else {
            this.subscribeToSaveResponse(
                this.companyService.create(this.company));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CompanyMySuffix>>) {
        result.subscribe((res: HttpResponse<CompanyMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CompanyMySuffix) {
        this.eventManager.broadcast({ name: 'companyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-company-my-suffix-popup',
    template: ''
})
export class CompanyMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private companyPopupService: CompanyMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.companyPopupService
                    .open(CompanyMySuffixDialogComponent as Component, params['id']);
            } else {
                this.companyPopupService
                    .open(CompanyMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
