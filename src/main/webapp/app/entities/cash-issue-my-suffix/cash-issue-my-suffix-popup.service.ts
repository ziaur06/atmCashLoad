import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CashIssueMySuffix } from './cash-issue-my-suffix.model';
import { CashIssueMySuffixService } from './cash-issue-my-suffix.service';

@Injectable()
export class CashIssueMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cashIssueService: CashIssueMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.cashIssueService.find(id)
                    .subscribe((cashIssueResponse: HttpResponse<CashIssueMySuffix>) => {
                        const cashIssue: CashIssueMySuffix = cashIssueResponse.body;
                        if (cashIssue.issueDate) {
                            cashIssue.issueDate = {
                                year: cashIssue.issueDate.getFullYear(),
                                month: cashIssue.issueDate.getMonth() + 1,
                                day: cashIssue.issueDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.cashIssueModalRef(component, cashIssue);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cashIssueModalRef(component, new CashIssueMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cashIssueModalRef(component: Component, cashIssue: CashIssueMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cashIssue = cashIssue;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
