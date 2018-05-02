import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CashIssueMySuffix } from './cash-issue-my-suffix.model';
import { CashIssueMySuffixPopupService } from './cash-issue-my-suffix-popup.service';
import { CashIssueMySuffixService } from './cash-issue-my-suffix.service';

@Component({
    selector: 'jhi-cash-issue-my-suffix-delete-dialog',
    templateUrl: './cash-issue-my-suffix-delete-dialog.component.html'
})
export class CashIssueMySuffixDeleteDialogComponent {

    cashIssue: CashIssueMySuffix;

    constructor(
        private cashIssueService: CashIssueMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cashIssueService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cashIssueListModification',
                content: 'Deleted an cashIssue'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cash-issue-my-suffix-delete-popup',
    template: ''
})
export class CashIssueMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cashIssuePopupService: CashIssueMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cashIssuePopupService
                .open(CashIssueMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
