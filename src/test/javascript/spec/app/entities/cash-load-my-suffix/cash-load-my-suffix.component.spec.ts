/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CashLoadMySuffixComponent } from '../../../../../../main/webapp/app/entities/cash-load-my-suffix/cash-load-my-suffix.component';
import { CashLoadMySuffixService } from '../../../../../../main/webapp/app/entities/cash-load-my-suffix/cash-load-my-suffix.service';
import { CashLoadMySuffix } from '../../../../../../main/webapp/app/entities/cash-load-my-suffix/cash-load-my-suffix.model';

describe('Component Tests', () => {

    describe('CashLoadMySuffix Management Component', () => {
        let comp: CashLoadMySuffixComponent;
        let fixture: ComponentFixture<CashLoadMySuffixComponent>;
        let service: CashLoadMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CashLoadMySuffixComponent],
                providers: [
                    CashLoadMySuffixService
                ]
            })
            .overrideTemplate(CashLoadMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashLoadMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashLoadMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CashLoadMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cashLoads[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
