import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CashIssueMySuffix } from './cash-issue-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CashIssueMySuffix>;

@Injectable()
export class CashIssueMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/cash-issues';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cashIssue: CashIssueMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cashIssue);
        return this.http.post<CashIssueMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cashIssue: CashIssueMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cashIssue);
        return this.http.put<CashIssueMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CashIssueMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CashIssueMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CashIssueMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CashIssueMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CashIssueMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CashIssueMySuffix[]>): HttpResponse<CashIssueMySuffix[]> {
        const jsonResponse: CashIssueMySuffix[] = res.body;
        const body: CashIssueMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CashIssueMySuffix.
     */
    private convertItemFromServer(cashIssue: CashIssueMySuffix): CashIssueMySuffix {
        const copy: CashIssueMySuffix = Object.assign({}, cashIssue);
        copy.issueDate = this.dateUtils
            .convertLocalDateFromServer(cashIssue.issueDate);
        return copy;
    }

    /**
     * Convert a CashIssueMySuffix to a JSON which can be sent to the server.
     */
    private convert(cashIssue: CashIssueMySuffix): CashIssueMySuffix {
        const copy: CashIssueMySuffix = Object.assign({}, cashIssue);
        copy.issueDate = this.dateUtils
            .convertLocalDateToServer(cashIssue.issueDate);
        return copy;
    }
}
