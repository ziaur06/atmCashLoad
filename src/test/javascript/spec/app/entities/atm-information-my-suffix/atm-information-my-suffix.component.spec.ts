/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AtmCashLoadTestModule } from '../../../test.module';
import { AtmInformationMySuffixComponent } from '../../../../../../main/webapp/app/entities/atm-information-my-suffix/atm-information-my-suffix.component';
import { AtmInformationMySuffixService } from '../../../../../../main/webapp/app/entities/atm-information-my-suffix/atm-information-my-suffix.service';
import { AtmInformationMySuffix } from '../../../../../../main/webapp/app/entities/atm-information-my-suffix/atm-information-my-suffix.model';

describe('Component Tests', () => {

    describe('AtmInformationMySuffix Management Component', () => {
        let comp: AtmInformationMySuffixComponent;
        let fixture: ComponentFixture<AtmInformationMySuffixComponent>;
        let service: AtmInformationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [AtmInformationMySuffixComponent],
                providers: [
                    AtmInformationMySuffixService
                ]
            })
            .overrideTemplate(AtmInformationMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtmInformationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtmInformationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AtmInformationMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.atmInformations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
