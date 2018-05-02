/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AtmCashLoadTestModule } from '../../../test.module';
import { OfficeMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/office-my-suffix/office-my-suffix-delete-dialog.component';
import { OfficeMySuffixService } from '../../../../../../main/webapp/app/entities/office-my-suffix/office-my-suffix.service';

describe('Component Tests', () => {

    describe('OfficeMySuffix Management Delete Component', () => {
        let comp: OfficeMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<OfficeMySuffixDeleteDialogComponent>;
        let service: OfficeMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [OfficeMySuffixDeleteDialogComponent],
                providers: [
                    OfficeMySuffixService
                ]
            })
            .overrideTemplate(OfficeMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfficeMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfficeMySuffixService);
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
