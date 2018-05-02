/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AtmCashLoadTestModule } from '../../../test.module';
import { BankMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/bank-my-suffix/bank-my-suffix-detail.component';
import { BankMySuffixService } from '../../../../../../main/webapp/app/entities/bank-my-suffix/bank-my-suffix.service';
import { BankMySuffix } from '../../../../../../main/webapp/app/entities/bank-my-suffix/bank-my-suffix.model';

describe('Component Tests', () => {

    describe('BankMySuffix Management Detail Component', () => {
        let comp: BankMySuffixDetailComponent;
        let fixture: ComponentFixture<BankMySuffixDetailComponent>;
        let service: BankMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [BankMySuffixDetailComponent],
                providers: [
                    BankMySuffixService
                ]
            })
            .overrideTemplate(BankMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BankMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bank).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
