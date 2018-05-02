import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserInformationMySuffix } from './user-information-my-suffix.model';
import { UserInformationMySuffixPopupService } from './user-information-my-suffix-popup.service';
import { UserInformationMySuffixService } from './user-information-my-suffix.service';

@Component({
    selector: 'jhi-user-information-my-suffix-delete-dialog',
    templateUrl: './user-information-my-suffix-delete-dialog.component.html'
})
export class UserInformationMySuffixDeleteDialogComponent {

    userInformation: UserInformationMySuffix;

    constructor(
        private userInformationService: UserInformationMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userInformationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userInformationListModification',
                content: 'Deleted an userInformation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-information-my-suffix-delete-popup',
    template: ''
})
export class UserInformationMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userInformationPopupService: UserInformationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userInformationPopupService
                .open(UserInformationMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
