/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CashBalanceMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cash-balance-my-suffix/cash-balance-my-suffix-delete-dialog.component';
import { CashBalanceMySuffixService } from '../../../../../../main/webapp/app/entities/cash-balance-my-suffix/cash-balance-my-suffix.service';

describe('Component Tests', () => {

    describe('CashBalanceMySuffix Management Delete Component', () => {
        let comp: CashBalanceMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CashBalanceMySuffixDeleteDialogComponent>;
        let service: CashBalanceMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CashBalanceMySuffixDeleteDialogComponent],
                providers: [
                    CashBalanceMySuffixService
                ]
            })
            .overrideTemplate(CashBalanceMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashBalanceMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashBalanceMySuffixService);
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
