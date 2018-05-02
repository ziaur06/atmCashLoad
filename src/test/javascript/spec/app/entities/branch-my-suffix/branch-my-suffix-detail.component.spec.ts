/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AtmCashLoadTestModule } from '../../../test.module';
import { BranchMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/branch-my-suffix/branch-my-suffix-detail.component';
import { BranchMySuffixService } from '../../../../../../main/webapp/app/entities/branch-my-suffix/branch-my-suffix.service';
import { BranchMySuffix } from '../../../../../../main/webapp/app/entities/branch-my-suffix/branch-my-suffix.model';

describe('Component Tests', () => {

    describe('BranchMySuffix Management Detail Component', () => {
        let comp: BranchMySuffixDetailComponent;
        let fixture: ComponentFixture<BranchMySuffixDetailComponent>;
        let service: BranchMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AtmCashLoadTestModule],
                declarations: [BranchMySuffixDetailComponent],
                providers: [
                    BranchMySuffixService
                ]
            })
            .overrideTemplate(BranchMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BranchMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BranchMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BranchMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.branch).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
