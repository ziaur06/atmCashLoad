/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AtmCashLoadTestModule } from '../../../test.module';
import { AtmInformationMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/atm-information-my-suffix/atm-information-my-suffix-detail.component';
import { AtmInformationMySuffixService } from '../../../../../../main/webapp/app/entities/atm-information-my-suffix/atm-information-my-suffix.service';
import { AtmInformationMySuffix } from '../../../../../../main/webapp/app/entities/atm-information-my-suffix/atm-information-my-suffix.model';

describe('Component Tests', () => {

    describe('AtmInformationMySuffix Management Detail Component', () => {
        let comp: AtmInformationMySuffixDetailComponent;
        let fixture: ComponentFixture<AtmInformationMySuffixDetailComponent>;
        let service: AtmInformationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [AtmInformationMySuffixDetailComponent],
                providers: [
                    AtmInformationMySuffixService
                ]
            })
            .overrideTemplate(AtmInformationMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtmInformationMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtmInformationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AtmInformationMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.atmInformation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
