/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AtmCashLoadTestModule } from '../../../test.module';
import { UserInformationMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/user-information-my-suffix/user-information-my-suffix-dialog.component';
import { UserInformationMySuffixService } from '../../../../../../main/webapp/app/entities/user-information-my-suffix/user-information-my-suffix.service';
import { UserInformationMySuffix } from '../../../../../../main/webapp/app/entities/user-information-my-suffix/user-information-my-suffix.model';
import { OfficeMySuffixService } from '../../../../../../main/webapp/app/entities/office-my-suffix';

describe('Component Tests', () => {

    describe('UserInformationMySuffix Management Dialog Component', () => {
        let comp: UserInformationMySuffixDialogComponent;
        let fixture: ComponentFixture<UserInformationMySuffixDialogComponent>;
        let service: UserInformationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [UserInformationMySuffixDialogComponent],
                providers: [
                    OfficeMySuffixService,
                    UserInformationMySuffixService
                ]
            })
            .overrideTemplate(UserInformationMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserInformationMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserInformationMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserInformationMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userInformation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userInformationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserInformationMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userInformation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userInformationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
