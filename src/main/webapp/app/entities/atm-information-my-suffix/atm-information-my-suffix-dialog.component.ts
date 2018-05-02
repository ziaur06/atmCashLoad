import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AtmInformationMySuffix } from './atm-information-my-suffix.model';
import { AtmInformationMySuffixPopupService } from './atm-information-my-suffix-popup.service';
import { AtmInformationMySuffixService } from './atm-information-my-suffix.service';
import { LocationMySuffix, LocationMySuffixService } from '../location-my-suffix';
import { BranchMySuffix, BranchMySuffixService } from '../branch-my-suffix';

@Component({
    selector: 'jhi-atm-information-my-suffix-dialog',
    templateUrl: './atm-information-my-suffix-dialog.component.html'
})
export class AtmInformationMySuffixDialogComponent implements OnInit {

    atmInformation: AtmInformationMySuffix;
    isSaving: boolean;

    locations: LocationMySuffix[];

    branches: BranchMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private atmInformationService: AtmInformationMySuffixService,
        private locationService: LocationMySuffixService,
        private branchService: BranchMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.locationService.query()
            .subscribe((res: HttpResponse<LocationMySuffix[]>) => { this.locations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.branchService.query()
            .subscribe((res: HttpResponse<BranchMySuffix[]>) => { this.branches = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.atmInformation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.atmInformationService.update(this.atmInformation));
        } else {
            this.subscribeToSaveResponse(
                this.atmInformationService.create(this.atmInformation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AtmInformationMySuffix>>) {
        result.subscribe((res: HttpResponse<AtmInformationMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AtmInformationMySuffix) {
        this.eventManager.broadcast({ name: 'atmInformationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLocationById(index: number, item: LocationMySuffix) {
        return item.id;
    }

    trackBranchById(index: number, item: BranchMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-atm-information-my-suffix-popup',
    template: ''
})
export class AtmInformationMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private atmInformationPopupService: AtmInformationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.atmInformationPopupService
                    .open(AtmInformationMySuffixDialogComponent as Component, params['id']);
            } else {
                this.atmInformationPopupService
                    .open(AtmInformationMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
