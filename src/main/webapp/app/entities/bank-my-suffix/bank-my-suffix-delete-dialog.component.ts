import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BankMySuffix } from './bank-my-suffix.model';
import { BankMySuffixPopupService } from './bank-my-suffix-popup.service';
import { BankMySuffixService } from './bank-my-suffix.service';

@Component({
    selector: 'jhi-bank-my-suffix-delete-dialog',
    templateUrl: './bank-my-suffix-delete-dialog.component.html'
})
export class BankMySuffixDeleteDialogComponent {

    bank: BankMySuffix;

    constructor(
        private bankService: BankMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bankService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bankListModification',
                content: 'Deleted an bank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bank-my-suffix-delete-popup',
    template: ''
})
export class BankMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankPopupService: BankMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bankPopupService
                .open(BankMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
