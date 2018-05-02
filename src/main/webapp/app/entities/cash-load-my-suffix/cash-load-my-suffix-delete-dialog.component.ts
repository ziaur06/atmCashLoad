import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CashLoadMySuffix } from './cash-load-my-suffix.model';
import { CashLoadMySuffixPopupService } from './cash-load-my-suffix-popup.service';
import { CashLoadMySuffixService } from './cash-load-my-suffix.service';

@Component({
    selector: 'jhi-cash-load-my-suffix-delete-dialog',
    templateUrl: './cash-load-my-suffix-delete-dialog.component.html'
})
export class CashLoadMySuffixDeleteDialogComponent {

    cashLoad: CashLoadMySuffix;

    constructor(
        private cashLoadService: CashLoadMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cashLoadService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cashLoadListModification',
                content: 'Deleted an cashLoad'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cash-load-my-suffix-delete-popup',
    template: ''
})
export class CashLoadMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashLoadPopupService: CashLoadMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cashLoadPopupService
                .open(CashLoadMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
