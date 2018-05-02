import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CashReceiveMySuffix } from './cash-receive-my-suffix.model';
import { CashReceiveMySuffixService } from './cash-receive-my-suffix.service';

@Injectable()
export class CashReceiveMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cashReceiveService: CashReceiveMySuffixService

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
                this.cashReceiveService.find(id)
                    .subscribe((cashReceiveResponse: HttpResponse<CashReceiveMySuffix>) => {
                        const cashReceive: CashReceiveMySuffix = cashReceiveResponse.body;
                        if (cashReceive.receiveDate) {
                            cashReceive.receiveDate = {
                                year: cashReceive.receiveDate.getFullYear(),
                                month: cashReceive.receiveDate.getMonth() + 1,
                                day: cashReceive.receiveDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.cashReceiveModalRef(component, cashReceive);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cashReceiveModalRef(component, new CashReceiveMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cashReceiveModalRef(component: Component, cashReceive: CashReceiveMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cashReceive = cashReceive;
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
