/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AtmCashLoadTestModule } from '../../../test.module';
import { UserInformationMySuffixComponent } from '../../../../../../main/webapp/app/entities/user-information-my-suffix/user-information-my-suffix.component';
import { UserInformationMySuffixService } from '../../../../../../main/webapp/app/entities/user-information-my-suffix/user-information-my-suffix.service';
import { UserInformationMySuffix } from '../../../../../../main/webapp/app/entities/user-information-my-suffix/user-information-my-suffix.model';

describe('Component Tests', () => {

    describe('UserInformationMySuffix Management Component', () => {
        let comp: UserInformationMySuffixComponent;
        let fixture: ComponentFixture<UserInformationMySuffixComponent>;
        let service: UserInformationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [UserInformationMySuffixComponent],
                providers: [
                    UserInformationMySuffixService
                ]
            })
            .overrideTemplate(UserInformationMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserInformationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserInformationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UserInformationMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userInformations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
