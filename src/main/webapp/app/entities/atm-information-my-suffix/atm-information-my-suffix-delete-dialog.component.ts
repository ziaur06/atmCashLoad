import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AtmInformationMySuffix } from './atm-information-my-suffix.model';
import { AtmInformationMySuffixPopupService } from './atm-information-my-suffix-popup.service';
import { AtmInformationMySuffixService } from './atm-information-my-suffix.service';

@Component({
    selector: 'jhi-atm-information-my-suffix-delete-dialog',
    templateUrl: './atm-information-my-suffix-delete-dialog.component.html'
})
export class AtmInformationMySuffixDeleteDialogComponent {

    atmInformation: AtmInformationMySuffix;

    constructor(
        private atmInformationService: AtmInformationMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.atmInformationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'atmInformationListModification',
                content: 'Deleted an atmInformation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-atm-information-my-suffix-delete-popup',
    template: ''
})
export class AtmInformationMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private atmInformationPopupService: AtmInformationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.atmInformationPopupService
                .open(AtmInformationMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
