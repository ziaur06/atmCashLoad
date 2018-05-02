import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OfficeMySuffix } from './office-my-suffix.model';
import { OfficeMySuffixService } from './office-my-suffix.service';

@Component({
    selector: 'jhi-office-my-suffix-detail',
    templateUrl: './office-my-suffix-detail.component.html'
})
export class OfficeMySuffixDetailComponent implements OnInit, OnDestroy {

    office: OfficeMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private officeService: OfficeMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOffices();
    }

    load(id) {
        this.officeService.find(id)
            .subscribe((officeResponse: HttpResponse<OfficeMySuffix>) => {
                this.office = officeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOffices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'officeListModification',
            (response) => this.load(this.office.id)
        );
    }
}
