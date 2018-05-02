import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BranchMySuffix } from './branch-my-suffix.model';
import { BranchMySuffixPopupService } from './branch-my-suffix-popup.service';
import { BranchMySuffixService } from './branch-my-suffix.service';

@Component({
    selector: 'jhi-branch-my-suffix-delete-dialog',
    templateUrl: './branch-my-suffix-delete-dialog.component.html'
})
export class BranchMySuffixDeleteDialogComponent {

    branch: BranchMySuffix;

    constructor(
        private branchService: BranchMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.branchService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'branchListModification',
                content: 'Deleted an branch'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-branch-my-suffix-delete-popup',
    template: ''
})
export class BranchMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private branchPopupService: BranchMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.branchPopupService
                .open(BranchMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
