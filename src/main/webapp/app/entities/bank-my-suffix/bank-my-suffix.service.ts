import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BankMySuffix } from './bank-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BankMySuffix>;

@Injectable()
export class BankMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/banks';

    constructor(private http: HttpClient) { }

    create(bank: BankMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(bank);
        return this.http.post<BankMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bank: BankMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(bank);
        return this.http.put<BankMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BankMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BankMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<BankMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BankMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BankMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BankMySuffix[]>): HttpResponse<BankMySuffix[]> {
        const jsonResponse: BankMySuffix[] = res.body;
        const body: BankMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BankMySuffix.
     */
    private convertItemFromServer(bank: BankMySuffix): BankMySuffix {
        const copy: BankMySuffix = Object.assign({}, bank);
        return copy;
    }

    /**
     * Convert a BankMySuffix to a JSON which can be sent to the server.
     */
    private convert(bank: BankMySuffix): BankMySuffix {
        const copy: BankMySuffix = Object.assign({}, bank);
        return copy;
    }
}
