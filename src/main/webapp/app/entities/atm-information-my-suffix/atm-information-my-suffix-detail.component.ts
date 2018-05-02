import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AtmInformationMySuffix } from './atm-information-my-suffix.model';
import { AtmInformationMySuffixService } from './atm-information-my-suffix.service';

@Component({
    selector: 'jhi-atm-information-my-suffix-detail',
    templateUrl: './atm-information-my-suffix-detail.component.html'
})
export class AtmInformationMySuffixDetailComponent implements OnInit, OnDestroy {

    atmInformation: AtmInformationMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private atmInformationService: AtmInformationMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAtmInformations();
    }

    load(id) {
        this.atmInformationService.find(id)
            .subscribe((atmInformationResponse: HttpResponse<AtmInformationMySuffix>) => {
                this.atmInformation = atmInformationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAtmInformations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'atmInformationListModification',
            (response) => this.load(this.atmInformation.id)
        );
    }
}
