import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CashReceiveMySuffix } from './cash-receive-my-suffix.model';
import { CashReceiveMySuffixPopupService } from './cash-receive-my-suffix-popup.service';
import { CashReceiveMySuffixService } from './cash-receive-my-suffix.service';

@Component({
    selector: 'jhi-cash-receive-my-suffix-delete-dialog',
    templateUrl: './cash-receive-my-suffix-delete-dialog.component.html'
})
export class CashReceiveMySuffixDeleteDialogComponent {

    cashReceive: CashReceiveMySuffix;

    constructor(
        private cashReceiveService: CashReceiveMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cashReceiveService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cashReceiveListModification',
                content: 'Deleted an cashReceive'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cash-receive-my-suffix-delete-popup',
    template: ''
})
export class CashReceiveMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashReceivePopupService: CashReceiveMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cashReceivePopupService
                .open(CashReceiveMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
