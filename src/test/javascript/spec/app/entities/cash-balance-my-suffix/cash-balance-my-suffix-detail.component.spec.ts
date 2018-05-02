/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CashBalanceMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/cash-balance-my-suffix/cash-balance-my-suffix-detail.component';
import { CashBalanceMySuffixService } from '../../../../../../main/webapp/app/entities/cash-balance-my-suffix/cash-balance-my-suffix.service';
import { CashBalanceMySuffix } from '../../../../../../main/webapp/app/entities/cash-balance-my-suffix/cash-balance-my-suffix.model';

describe('Component Tests', () => {

    describe('CashBalanceMySuffix Management Detail Component', () => {
        let comp: CashBalanceMySuffixDetailComponent;
        let fixture: ComponentFixture<CashBalanceMySuffixDetailComponent>;
        let service: CashBalanceMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CashBalanceMySuffixDetailComponent],
                providers: [
                    CashBalanceMySuffixService
                ]
            })
            .overrideTemplate(CashBalanceMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashBalanceMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashBalanceMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CashBalanceMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cashBalance).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
