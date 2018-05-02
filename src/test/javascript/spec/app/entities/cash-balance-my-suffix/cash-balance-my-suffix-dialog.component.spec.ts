/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CashBalanceMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/cash-balance-my-suffix/cash-balance-my-suffix-dialog.component';
import { CashBalanceMySuffixService } from '../../../../../../main/webapp/app/entities/cash-balance-my-suffix/cash-balance-my-suffix.service';
import { CashBalanceMySuffix } from '../../../../../../main/webapp/app/entities/cash-balance-my-suffix/cash-balance-my-suffix.model';
import { OfficeMySuffixService } from '../../../../../../main/webapp/app/entities/office-my-suffix';

describe('Component Tests', () => {

    describe('CashBalanceMySuffix Management Dialog Component', () => {
        let comp: CashBalanceMySuffixDialogComponent;
        let fixture: ComponentFixture<CashBalanceMySuffixDialogComponent>;
        let service: CashBalanceMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CashBalanceMySuffixDialogComponent],
                providers: [
                    OfficeMySuffixService,
                    CashBalanceMySuffixService
                ]
            })
            .overrideTemplate(CashBalanceMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashBalanceMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashBalanceMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CashBalanceMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cashBalance = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cashBalanceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CashBalanceMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cashBalance = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cashBalanceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
