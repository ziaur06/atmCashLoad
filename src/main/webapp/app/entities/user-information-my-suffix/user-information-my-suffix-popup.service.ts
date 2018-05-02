import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UserInformationMySuffix } from './user-information-my-suffix.model';
import { UserInformationMySuffixService } from './user-information-my-suffix.service';

@Injectable()
export class UserInformationMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private userInformationService: UserInformationMySuffixService

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
                this.userInformationService.find(id)
                    .subscribe((userInformationResponse: HttpResponse<UserInformationMySuffix>) => {
                        const userInformation: UserInformationMySuffix = userInformationResponse.body;
                        this.ngbModalRef = this.userInformationModalRef(component, userInformation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.userInformationModalRef(component, new UserInformationMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userInformationModalRef(component: Component, userInformation: UserInformationMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userInformation = userInformation;
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
