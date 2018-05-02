/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CashIssueMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cash-issue-my-suffix/cash-issue-my-suffix-delete-dialog.component';
import { CashIssueMySuffixService } from '../../../../../../main/webapp/app/entities/cash-issue-my-suffix/cash-issue-my-suffix.service';

describe('Component Tests', () => {

    describe('CashIssueMySuffix Management Delete Component', () => {
        let comp: CashIssueMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CashIssueMySuffixDeleteDialogComponent>;
        let service: CashIssueMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CashIssueMySuffixDeleteDialogComponent],
                providers: [
                    CashIssueMySuffixService
                ]
            })
            .overrideTemplate(CashIssueMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashIssueMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashIssueMySuffixService);
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
