/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CashBalanceMySuffixComponent } from '../../../../../../main/webapp/app/entities/cash-balance-my-suffix/cash-balance-my-suffix.component';
import { CashBalanceMySuffixService } from '../../../../../../main/webapp/app/entities/cash-balance-my-suffix/cash-balance-my-suffix.service';
import { CashBalanceMySuffix } from '../../../../../../main/webapp/app/entities/cash-balance-my-suffix/cash-balance-my-suffix.model';

describe('Component Tests', () => {

    describe('CashBalanceMySuffix Management Component', () => {
        let comp: CashBalanceMySuffixComponent;
        let fixture: ComponentFixture<CashBalanceMySuffixComponent>;
        let service: CashBalanceMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CashBalanceMySuffixComponent],
                providers: [
                    CashBalanceMySuffixService
                ]
            })
            .overrideTemplate(CashBalanceMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashBalanceMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashBalanceMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CashBalanceMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cashBalances[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
