import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserInformationMySuffix } from './user-information-my-suffix.model';
import { UserInformationMySuffixPopupService } from './user-information-my-suffix-popup.service';
import { UserInformationMySuffixService } from './user-information-my-suffix.service';
import { OfficeMySuffix, OfficeMySuffixService } from '../office-my-suffix';

@Component({
    selector: 'jhi-user-information-my-suffix-dialog',
    templateUrl: './user-information-my-suffix-dialog.component.html'
})
export class UserInformationMySuffixDialogComponent implements OnInit {

    userInformation: UserInformationMySuffix;
    isSaving: boolean;

    offices: OfficeMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userInformationService: UserInformationMySuffixService,
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
        if (this.userInformation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userInformationService.update(this.userInformation));
        } else {
            this.subscribeToSaveResponse(
                this.userInformationService.create(this.userInformation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserInformationMySuffix>>) {
        result.subscribe((res: HttpResponse<UserInformationMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserInformationMySuffix) {
        this.eventManager.broadcast({ name: 'userInformationListModification', content: 'OK'});
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
    selector: 'jhi-user-information-my-suffix-popup',
    template: ''
})
export class UserInformationMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userInformationPopupService: UserInformationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userInformationPopupService
                    .open(UserInformationMySuffixDialogComponent as Component, params['id']);
            } else {
                this.userInformationPopupService
                    .open(UserInformationMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
