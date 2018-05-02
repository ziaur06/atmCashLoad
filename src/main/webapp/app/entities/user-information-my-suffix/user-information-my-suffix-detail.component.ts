import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserInformationMySuffix } from './user-information-my-suffix.model';
import { UserInformationMySuffixService } from './user-information-my-suffix.service';

@Component({
    selector: 'jhi-user-information-my-suffix-detail',
    templateUrl: './user-information-my-suffix-detail.component.html'
})
export class UserInformationMySuffixDetailComponent implements OnInit, OnDestroy {

    userInformation: UserInformationMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userInformationService: UserInformationMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserInformations();
    }

    load(id) {
        this.userInformationService.find(id)
            .subscribe((userInformationResponse: HttpResponse<UserInformationMySuffix>) => {
                this.userInformation = userInformationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserInformations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userInformationListModification',
            (response) => this.load(this.userInformation.id)
        );
    }
}
