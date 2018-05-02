import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OfficeMySuffix } from './office-my-suffix.model';
import { OfficeMySuffixPopupService } from './office-my-suffix-popup.service';
import { OfficeMySuffixService } from './office-my-suffix.service';
import { AtmInformationMySuffix, AtmInformationMySuffixService } from '../atm-information-my-suffix';
import { CompanyMySuffix, CompanyMySuffixService } from '../company-my-suffix';

@Component({
    selector: 'jhi-office-my-suffix-dialog',
    templateUrl: './office-my-suffix-dialog.component.html'
})
export class OfficeMySuffixDialogComponent implements OnInit {

    office: OfficeMySuffix;
    isSaving: boolean;

    atminformations: AtmInformationMySuffix[];

    companies: CompanyMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private officeService: OfficeMySuffixService,
        private atmInformationService: AtmInformationMySuffixService,
        private companyService: CompanyMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.atmInformationService.query()
            .subscribe((res: HttpResponse<AtmInformationMySuffix[]>) => { this.atminformations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.companyService.query()
            .subscribe((res: HttpResponse<CompanyMySuffix[]>) => { this.companies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.office.id !== undefined) {
            this.subscribeToSaveResponse(
                this.officeService.update(this.office));
        } else {
            this.subscribeToSaveResponse(
                this.officeService.create(this.office));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OfficeMySuffix>>) {
        result.subscribe((res: HttpResponse<OfficeMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OfficeMySuffix) {
        this.eventManager.broadcast({ name: 'officeListModification', content: 'OK'});
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

    trackCompanyById(index: number, item: CompanyMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-office-my-suffix-popup',
    template: ''
})
export class OfficeMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private officePopupService: OfficeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.officePopupService
                    .open(OfficeMySuffixDialogComponent as Component, params['id']);
            } else {
                this.officePopupService
                    .open(OfficeMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
