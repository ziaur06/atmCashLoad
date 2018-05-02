/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AtmCashLoadTestModule } from '../../../test.module';
import { AtmInformationMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/atm-information-my-suffix/atm-information-my-suffix-delete-dialog.component';
import { AtmInformationMySuffixService } from '../../../../../../main/webapp/app/entities/atm-information-my-suffix/atm-information-my-suffix.service';

describe('Component Tests', () => {

    describe('AtmInformationMySuffix Management Delete Component', () => {
        let comp: AtmInformationMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<AtmInformationMySuffixDeleteDialogComponent>;
        let service: AtmInformationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [AtmInformationMySuffixDeleteDialogComponent],
                providers: [
                    AtmInformationMySuffixService
                ]
            })
            .overrideTemplate(AtmInformationMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtmInformationMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtmInformationMySuffixService);
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
