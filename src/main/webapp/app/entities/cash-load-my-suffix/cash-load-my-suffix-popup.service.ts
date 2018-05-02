import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CashLoadMySuffix } from './cash-load-my-suffix.model';
import { CashLoadMySuffixService } from './cash-load-my-suffix.service';

@Injectable()
export class CashLoadMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cashLoadService: CashLoadMySuffixService

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
                this.cashLoadService.find(id)
                    .subscribe((cashLoadResponse: HttpResponse<CashLoadMySuffix>) => {
                        const cashLoad: CashLoadMySuffix = cashLoadResponse.body;
                        if (cashLoad.loadingDate) {
                            cashLoad.loadingDate = {
                                year: cashLoad.loadingDate.getFullYear(),
                                month: cashLoad.loadingDate.getMonth() + 1,
                                day: cashLoad.loadingDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.cashLoadModalRef(component, cashLoad);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cashLoadModalRef(component, new CashLoadMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cashLoadModalRef(component: Component, cashLoad: CashLoadMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cashLoad = cashLoad;
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
