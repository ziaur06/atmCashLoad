/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CashReceiveMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/cash-receive-my-suffix/cash-receive-my-suffix-detail.component';
import { CashReceiveMySuffixService } from '../../../../../../main/webapp/app/entities/cash-receive-my-suffix/cash-receive-my-suffix.service';
import { CashReceiveMySuffix } from '../../../../../../main/webapp/app/entities/cash-receive-my-suffix/cash-receive-my-suffix.model';

describe('Component Tests', () => {

    describe('CashReceiveMySuffix Management Detail Component', () => {
        let comp: CashReceiveMySuffixDetailComponent;
        let fixture: ComponentFixture<CashReceiveMySuffixDetailComponent>;
        let service: CashReceiveMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CashReceiveMySuffixDetailComponent],
                providers: [
                    CashReceiveMySuffixService
                ]
            })
            .overrideTemplate(CashReceiveMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashReceiveMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashReceiveMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CashReceiveMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cashReceive).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
