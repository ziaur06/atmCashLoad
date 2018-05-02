/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CashLoadMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/cash-load-my-suffix/cash-load-my-suffix-detail.component';
import { CashLoadMySuffixService } from '../../../../../../main/webapp/app/entities/cash-load-my-suffix/cash-load-my-suffix.service';
import { CashLoadMySuffix } from '../../../../../../main/webapp/app/entities/cash-load-my-suffix/cash-load-my-suffix.model';

describe('Component Tests', () => {

    describe('CashLoadMySuffix Management Detail Component', () => {
        let comp: CashLoadMySuffixDetailComponent;
        let fixture: ComponentFixture<CashLoadMySuffixDetailComponent>;
        let service: CashLoadMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CashLoadMySuffixDetailComponent],
                providers: [
                    CashLoadMySuffixService
                ]
            })
            .overrideTemplate(CashLoadMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashLoadMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashLoadMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CashLoadMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cashLoad).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
