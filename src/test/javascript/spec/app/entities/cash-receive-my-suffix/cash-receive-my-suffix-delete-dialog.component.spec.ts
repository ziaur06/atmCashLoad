/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CashReceiveMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cash-receive-my-suffix/cash-receive-my-suffix-delete-dialog.component';
import { CashReceiveMySuffixService } from '../../../../../../main/webapp/app/entities/cash-receive-my-suffix/cash-receive-my-suffix.service';

describe('Component Tests', () => {

    describe('CashReceiveMySuffix Management Delete Component', () => {
        let comp: CashReceiveMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CashReceiveMySuffixDeleteDialogComponent>;
        let service: CashReceiveMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CashReceiveMySuffixDeleteDialogComponent],
                providers: [
                    CashReceiveMySuffixService
                ]
            })
            .overrideTemplate(CashReceiveMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashReceiveMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashReceiveMySuffixService);
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
