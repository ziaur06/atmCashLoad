/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AtmCashLoadTestModule } from '../../../test.module';
import { UserInformationMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/user-information-my-suffix/user-information-my-suffix-detail.component';
import { UserInformationMySuffixService } from '../../../../../../main/webapp/app/entities/user-information-my-suffix/user-information-my-suffix.service';
import { UserInformationMySuffix } from '../../../../../../main/webapp/app/entities/user-information-my-suffix/user-information-my-suffix.model';

describe('Component Tests', () => {

    describe('UserInformationMySuffix Management Detail Component', () => {
        let comp: UserInformationMySuffixDetailComponent;
        let fixture: ComponentFixture<UserInformationMySuffixDetailComponent>;
        let service: UserInformationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [UserInformationMySuffixDetailComponent],
                providers: [
                    UserInformationMySuffixService
                ]
            })
            .overrideTemplate(UserInformationMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserInformationMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserInformationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserInformationMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userInformation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
