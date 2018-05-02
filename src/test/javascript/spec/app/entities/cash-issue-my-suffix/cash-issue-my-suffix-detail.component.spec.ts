/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CashIssueMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/cash-issue-my-suffix/cash-issue-my-suffix-detail.component';
import { CashIssueMySuffixService } from '../../../../../../main/webapp/app/entities/cash-issue-my-suffix/cash-issue-my-suffix.service';
import { CashIssueMySuffix } from '../../../../../../main/webapp/app/entities/cash-issue-my-suffix/cash-issue-my-suffix.model';

describe('Component Tests', () => {

    describe('CashIssueMySuffix Management Detail Component', () => {
        let comp: CashIssueMySuffixDetailComponent;
        let fixture: ComponentFixture<CashIssueMySuffixDetailComponent>;
        let service: CashIssueMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CashIssueMySuffixDetailComponent],
                providers: [
                    CashIssueMySuffixService
                ]
            })
            .overrideTemplate(CashIssueMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashIssueMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashIssueMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CashIssueMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cashIssue).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
