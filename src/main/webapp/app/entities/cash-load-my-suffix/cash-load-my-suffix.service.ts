import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CashLoadMySuffix } from './cash-load-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CashLoadMySuffix>;

@Injectable()
export class CashLoadMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/cash-loads';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cashLoad: CashLoadMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cashLoad);
        return this.http.post<CashLoadMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cashLoad: CashLoadMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(cashLoad);
        return this.http.put<CashLoadMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CashLoadMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CashLoadMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CashLoadMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CashLoadMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CashLoadMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CashLoadMySuffix[]>): HttpResponse<CashLoadMySuffix[]> {
        const jsonResponse: CashLoadMySuffix[] = res.body;
        const body: CashLoadMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CashLoadMySuffix.
     */
    private convertItemFromServer(cashLoad: CashLoadMySuffix): CashLoadMySuffix {
        const copy: CashLoadMySuffix = Object.assign({}, cashLoad);
        copy.loadingDate = this.dateUtils
            .convertLocalDateFromServer(cashLoad.loadingDate);
        return copy;
    }

    /**
     * Convert a CashLoadMySuffix to a JSON which can be sent to the server.
     */
    private convert(cashLoad: CashLoadMySuffix): CashLoadMySuffix {
        const copy: CashLoadMySuffix = Object.assign({}, cashLoad);
        copy.loadingDate = this.dateUtils
            .convertLocalDateToServer(cashLoad.loadingDate);
        return copy;
    }
}
