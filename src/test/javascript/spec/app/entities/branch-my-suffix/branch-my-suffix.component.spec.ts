/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AtmCashLoadTestModule } from '../../../test.module';
import { BranchMySuffixComponent } from '../../../../../../main/webapp/app/entities/branch-my-suffix/branch-my-suffix.component';
import { BranchMySuffixService } from '../../../../../../main/webapp/app/entities/branch-my-suffix/branch-my-suffix.service';
import { BranchMySuffix } from '../../../../../../main/webapp/app/entities/branch-my-suffix/branch-my-suffix.model';

describe('Component Tests', () => {

    describe('BranchMySuffix Management Component', () => {
        let comp: BranchMySuffixComponent;
        let fixture: ComponentFixture<BranchMySuffixComponent>;
        let service: BranchMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [BranchMySuffixComponent],
                providers: [
                    BranchMySuffixService
                ]
            })
            .overrideTemplate(BranchMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BranchMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BranchMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BranchMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.branches[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
