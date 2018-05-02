/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CashLoadMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cash-load-my-suffix/cash-load-my-suffix-delete-dialog.component';
import { CashLoadMySuffixService } from '../../../../../../main/webapp/app/entities/cash-load-my-suffix/cash-load-my-suffix.service';

describe('Component Tests', () => {

    describe('CashLoadMySuffix Management Delete Component', () => {
        let comp: CashLoadMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CashLoadMySuffixDeleteDialogComponent>;
        let service: CashLoadMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CashLoadMySuffixDeleteDialogComponent],
                providers: [
                    CashLoadMySuffixService
                ]
            })
            .overrideTemplate(CashLoadMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashLoadMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashLoadMySuffixService);
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
