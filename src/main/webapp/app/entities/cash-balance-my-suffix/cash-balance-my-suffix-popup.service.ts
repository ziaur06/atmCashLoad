import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CashBalanceMySuffix } from './cash-balance-my-suffix.model';
import { CashBalanceMySuffixService } from './cash-balance-my-suffix.service';

@Injectable()
export class CashBalanceMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cashBalanceService: CashBalanceMySuffixService

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
                this.cashBalanceService.find(id)
                    .subscribe((cashBalanceResponse: HttpResponse<CashBalanceMySuffix>) => {
                        const cashBalance: CashBalanceMySuffix = cashBalanceResponse.body;
                        this.ngbModalRef = this.cashBalanceModalRef(component, cashBalance);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cashBalanceModalRef(component, new CashBalanceMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cashBalanceModalRef(component: Component, cashBalance: CashBalanceMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cashBalance = cashBalance;
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
