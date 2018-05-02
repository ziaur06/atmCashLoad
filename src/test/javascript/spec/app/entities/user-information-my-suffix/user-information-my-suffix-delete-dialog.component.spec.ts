/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AtmCashLoadTestModule } from '../../../test.module';
import { UserInformationMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/user-information-my-suffix/user-information-my-suffix-delete-dialog.component';
import { UserInformationMySuffixService } from '../../../../../../main/webapp/app/entities/user-information-my-suffix/user-information-my-suffix.service';

describe('Component Tests', () => {

    describe('UserInformationMySuffix Management Delete Component', () => {
        let comp: UserInformationMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<UserInformationMySuffixDeleteDialogComponent>;
        let service: UserInformationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [UserInformationMySuffixDeleteDialogComponent],
                providers: [
                    UserInformationMySuffixService
                ]
            })
            .overrideTemplate(UserInformationMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserInformationMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserInformationMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
