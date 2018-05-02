import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CashReceiveMySuffix } from './cash-receive-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CashReceiveMySuffix>;

@Injectable()
export class CashReceiveMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/cash-receives';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cashReceive: CashReceiveMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cashReceive);
        return this.http.post<CashReceiveMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cashReceive: CashReceiveMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cashReceive);
        return this.http.put<CashReceiveMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CashReceiveMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CashReceiveMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CashReceiveMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CashReceiveMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CashReceiveMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CashReceiveMySuffix[]>): HttpResponse<CashReceiveMySuffix[]> {
        const jsonResponse: CashReceiveMySuffix[] = res.body;
        const body: CashReceiveMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CashReceiveMySuffix.
     */
    private convertItemFromServer(cashReceive: CashReceiveMySuffix): CashReceiveMySuffix {
        const copy: CashReceiveMySuffix = Object.assign({}, cashReceive);
        copy.receiveDate = this.dateUtils
            .convertLocalDateFromServer(cashReceive.receiveDate);
        return copy;
    }

    /**
     * Convert a CashReceiveMySuffix to a JSON which can be sent to the server.
     */
    private convert(cashReceive: CashReceiveMySuffix): CashReceiveMySuffix {
        const copy: CashReceiveMySuffix = Object.assign({}, cashReceive);
        copy.receiveDate = this.dateUtils
            .convertLocalDateToServer(cashReceive.receiveDate);
        return copy;
    }
}
