/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AtmCashLoadTestModule } from '../../../test.module';
import { AtmInformationMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/atm-information-my-suffix/atm-information-my-suffix-dialog.component';
import { AtmInformationMySuffixService } from '../../../../../../main/webapp/app/entities/atm-information-my-suffix/atm-information-my-suffix.service';
import { AtmInformationMySuffix } from '../../../../../../main/webapp/app/entities/atm-information-my-suffix/atm-information-my-suffix.model';
import { LocationMySuffixService } from '../../../../../../main/webapp/app/entities/location-my-suffix';
import { BranchMySuffixService } from '../../../../../../main/webapp/app/entities/branch-my-suffix';

describe('Component Tests', () => {

    describe('AtmInformationMySuffix Management Dialog Component', () => {
        let comp: AtmInformationMySuffixDialogComponent;
        let fixture: ComponentFixture<AtmInformationMySuffixDialogComponent>;
        let service: AtmInformationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [AtmInformationMySuffixDialogComponent],
                providers: [
                    LocationMySuffixService,
                    BranchMySuffixService,
                    AtmInformationMySuffixService
                ]
            })
            .overrideTemplate(AtmInformationMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtmInformationMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtmInformationMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AtmInformationMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.atmInformation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'atmInformationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AtmInformationMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.atmInformation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'atmInformationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
