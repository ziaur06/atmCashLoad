/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AtmCashLoadTestModule } from '../../../test.module';
import { OfficeMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/office-my-suffix/office-my-suffix-dialog.component';
import { OfficeMySuffixService } from '../../../../../../main/webapp/app/entities/office-my-suffix/office-my-suffix.service';
import { OfficeMySuffix } from '../../../../../../main/webapp/app/entities/office-my-suffix/office-my-suffix.model';
import { AtmInformationMySuffixService } from '../../../../../../main/webapp/app/entities/atm-information-my-suffix';
import { CompanyMySuffixService } from '../../../../../../main/webapp/app/entities/company-my-suffix';

describe('Component Tests', () => {

    describe('OfficeMySuffix Management Dialog Component', () => {
        let comp: OfficeMySuffixDialogComponent;
        let fixture: ComponentFixture<OfficeMySuffixDialogComponent>;
        let service: OfficeMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [OfficeMySuffixDialogComponent],
                providers: [
                    AtmInformationMySuffixService,
                    CompanyMySuffixService,
                    OfficeMySuffixService
                ]
            })
            .overrideTemplate(OfficeMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfficeMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfficeMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OfficeMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.office = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'officeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OfficeMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.office = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'officeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
