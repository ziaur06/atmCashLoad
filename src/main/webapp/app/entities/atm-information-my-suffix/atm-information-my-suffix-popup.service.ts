import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AtmInformationMySuffix } from './atm-information-my-suffix.model';
import { AtmInformationMySuffixService } from './atm-information-my-suffix.service';

@Injectable()
export class AtmInformationMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private atmInformationService: AtmInformationMySuffixService

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
                this.atmInformationService.find(id)
                    .subscribe((atmInformationResponse: HttpResponse<AtmInformationMySuffix>) => {
                        const atmInformation: AtmInformationMySuffix = atmInformationResponse.body;
                        this.ngbModalRef = this.atmInformationModalRef(component, atmInformation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.atmInformationModalRef(component, new AtmInformationMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    atmInformationModalRef(component: Component, atmInformation: AtmInformationMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.atmInformation = atmInformation;
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
