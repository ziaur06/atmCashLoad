import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CashBalanceMySuffix } from './cash-balance-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CashBalanceMySuffix>;

@Injectable()
export class CashBalanceMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/cash-balances';

    constructor(private http: HttpClient) { }

    create(cashBalance: CashBalanceMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cashBalance);
        return this.http.post<CashBalanceMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cashBalance: CashBalanceMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cashBalance);
        return this.http.put<CashBalanceMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CashBalanceMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CashBalanceMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CashBalanceMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CashBalanceMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CashBalanceMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CashBalanceMySuffix[]>): HttpResponse<CashBalanceMySuffix[]> {
        const jsonResponse: CashBalanceMySuffix[] = res.body;
        const body: CashBalanceMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CashBalanceMySuffix.
     */
    private convertItemFromServer(cashBalance: CashBalanceMySuffix): CashBalanceMySuffix {
        const copy: CashBalanceMySuffix = Object.assign({}, cashBalance);
        return copy;
    }

    /**
     * Convert a CashBalanceMySuffix to a JSON which can be sent to the server.
     */
    private convert(cashBalance: CashBalanceMySuffix): CashBalanceMySuffix {
        const copy: CashBalanceMySuffix = Object.assign({}, cashBalance);
        return copy;
    }
}
