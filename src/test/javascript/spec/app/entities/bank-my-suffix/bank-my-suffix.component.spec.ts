/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AtmCashLoadTestModule } from '../../../test.module';
import { BankMySuffixComponent } from '../../../../../../main/webapp/app/entities/bank-my-suffix/bank-my-suffix.component';
import { BankMySuffixService } from '../../../../../../main/webapp/app/entities/bank-my-suffix/bank-my-suffix.service';
import { BankMySuffix } from '../../../../../../main/webapp/app/entities/bank-my-suffix/bank-my-suffix.model';

describe('Component Tests', () => {

    describe('BankMySuffix Management Component', () => {
        let comp: BankMySuffixComponent;
        let fixture: ComponentFixture<BankMySuffixComponent>;
        let service: BankMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [BankMySuffixComponent],
                providers: [
                    BankMySuffixService
                ]
            })
            .overrideTemplate(BankMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BankMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.banks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
