/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AtmCashLoadTestModule } from '../../../test.module';
import { CashReceiveMySuffixComponent } from '../../../../../../main/webapp/app/entities/cash-receive-my-suffix/cash-receive-my-suffix.component';
import { CashReceiveMySuffixService } from '../../../../../../main/webapp/app/entities/cash-receive-my-suffix/cash-receive-my-suffix.service';
import { CashReceiveMySuffix } from '../../../../../../main/webapp/app/entities/cash-receive-my-suffix/cash-receive-my-suffix.model';

describe('Component Tests', () => {

    describe('CashReceiveMySuffix Management Component', () => {
        let comp: CashReceiveMySuffixComponent;
        let fixture: ComponentFixture<CashReceiveMySuffixComponent>;
        let service: CashReceiveMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [CashReceiveMySuffixComponent],
                providers: [
                    CashReceiveMySuffixService
                ]
            })
            .overrideTemplate(CashReceiveMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CashReceiveMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CashReceiveMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CashReceiveMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cashReceives[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
