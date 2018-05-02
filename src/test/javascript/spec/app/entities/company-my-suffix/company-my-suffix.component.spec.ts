/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CompanyMySuffixComponent } from '../../../../../../main/webapp/app/entities/company-my-suffix/company-my-suffix.component';
import { CompanyMySuffixService } from '../../../../../../main/webapp/app/entities/company-my-suffix/company-my-suffix.service';
import { CompanyMySuffix } from '../../../../../../main/webapp/app/entities/company-my-suffix/company-my-suffix.model';

describe('Component Tests', () => {

    describe('CompanyMySuffix Management Component', () => {
        let comp: CompanyMySuffixComponent;
        let fixture: ComponentFixture<CompanyMySuffixComponent>;
        let service: CompanyMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CompanyMySuffixComponent],
                providers: [
                    CompanyMySuffixService
                ]
            })
            .overrideTemplate(CompanyMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompanyMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CompanyMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.companies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
