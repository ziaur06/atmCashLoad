import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CompanyMySuffix } from './company-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CompanyMySuffix>;

@Injectable()
export class CompanyMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/companies';

    constructor(private http: HttpClient) { }

    create(company: CompanyMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(company);
        return this.http.post<CompanyMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(company: CompanyMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(company);
        return this.http.put<CompanyMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CompanyMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CompanyMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CompanyMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CompanyMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CompanyMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CompanyMySuffix[]>): HttpResponse<CompanyMySuffix[]> {
        const jsonResponse: CompanyMySuffix[] = res.body;
        const body: CompanyMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CompanyMySuffix.
     */
    private convertItemFromServer(company: CompanyMySuffix): CompanyMySuffix {
        const copy: CompanyMySuffix = Object.assign({}, company);
        return copy;
    }

    /**
     * Convert a CompanyMySuffix to a JSON which can be sent to the server.
     */
    private convert(company: CompanyMySuffix): CompanyMySuffix {
        const copy: CompanyMySuffix = Object.assign({}, company);
        return copy;
    }
}
