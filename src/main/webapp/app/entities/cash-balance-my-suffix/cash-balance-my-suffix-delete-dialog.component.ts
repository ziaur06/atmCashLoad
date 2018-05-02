import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CashBalanceMySuffix } from './cash-balance-my-suffix.model';
import { CashBalanceMySuffixPopupService } from './cash-balance-my-suffix-popup.service';
import { CashBalanceMySuffixService } from './cash-balance-my-suffix.service';

@Component({
    selector: 'jhi-cash-balance-my-suffix-delete-dialog',
    templateUrl: './cash-balance-my-suffix-delete-dialog.component.html'
})
export class CashBalanceMySuffixDeleteDialogComponent {

    cashBalance: CashBalanceMySuffix;

    constructor(
        private cashBalanceService: CashBalanceMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cashBalanceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cashBalanceListModification',
                content: 'Deleted an cashBalance'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cash-balance-my-suffix-delete-popup',
    template: ''
})
export class CashBalanceMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashBalancePopupService: CashBalanceMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cashBalancePopupService
                .open(CashBalanceMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
