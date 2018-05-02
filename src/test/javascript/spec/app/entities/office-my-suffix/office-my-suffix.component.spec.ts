/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AtmCashLoadTestModule } from '../../../test.module';
import { OfficeMySuffixComponent } from '../../../../../../main/webapp/app/entities/office-my-suffix/office-my-suffix.component';
import { OfficeMySuffixService } from '../../../../../../main/webapp/app/entities/office-my-suffix/office-my-suffix.service';
import { OfficeMySuffix } from '../../../../../../main/webapp/app/entities/office-my-suffix/office-my-suffix.model';

describe('Component Tests', () => {

    describe('OfficeMySuffix Management Component', () => {
        let comp: OfficeMySuffixComponent;
        let fixture: ComponentFixture<OfficeMySuffixComponent>;
        let service: OfficeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [OfficeMySuffixComponent],
                providers: [
                    OfficeMySuffixService
                ]
            })
            .overrideTemplate(OfficeMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OfficeMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OfficeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OfficeMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.offices[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
