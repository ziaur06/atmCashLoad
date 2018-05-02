/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AtmCashLoadTestModule } from '../../../test.module';
import { OfficeMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/office-my-suffix/office-my-suffix-detail.component';
import { OfficeMySuffixService } from '../../../../../../main/webapp/app/entities/office-my-suffix/office-my-suffix.service';
import { OfficeMySuffix } from '../../../../../../main/webapp/app/entities/office-my-suffix/office-my-suffix.model';

describe('Component Tests', () => {

    describe('OfficeMySuffix Management Detail Component', () => {
        let comp: OfficeMySuffixDetailComponent;
        let fixture: ComponentFixture<OfficeMySuffixDetailComponent>;
        let service: OfficeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [OfficeMySuffixDetailComponent],
                providers: [
                    OfficeMySuffixService
                ]
            })
            .overrideTemplate(OfficeMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfficeMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfficeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OfficeMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.office).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
