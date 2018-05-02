/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CashIssueMySuffixComponent } from '../../../../../../main/webapp/app/entities/cash-issue-my-suffix/cash-issue-my-suffix.component';
import { CashIssueMySuffixService } from '../../../../../../main/webapp/app/entities/cash-issue-my-suffix/cash-issue-my-suffix.service';
import { CashIssueMySuffix } from '../../../../../../main/webapp/app/entities/cash-issue-my-suffix/cash-issue-my-suffix.model';

describe('Component Tests', () => {

    describe('CashIssueMySuffix Management Component', () => {
        let comp: CashIssueMySuffixComponent;
        let fixture: ComponentFixture<CashIssueMySuffixComponent>;
        let service: CashIssueMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CashIssueMySuffixComponent],
                providers: [
                    CashIssueMySuffixService
                ]
            })
            .overrideTemplate(CashIssueMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashIssueMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashIssueMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CashIssueMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cashIssues[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
