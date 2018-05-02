/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CompanyMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/company-my-suffix/company-my-suffix-detail.component';
import { CompanyMySuffixService } from '../../../../../../main/webapp/app/entities/company-my-suffix/company-my-suffix.service';
import { CompanyMySuffix } from '../../../../../../main/webapp/app/entities/company-my-suffix/company-my-suffix.model';

describe('Component Tests', () => {

    describe('CompanyMySuffix Management Detail Component', () => {
        let comp: CompanyMySuffixDetailComponent;
        let fixture: ComponentFixture<CompanyMySuffixDetailComponent>;
        let service: CompanyMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CompanyMySuffixDetailComponent],
                providers: [
                    CompanyMySuffixService
                ]
            })
            .overrideTemplate(CompanyMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CompanyMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CompanyMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.company).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
