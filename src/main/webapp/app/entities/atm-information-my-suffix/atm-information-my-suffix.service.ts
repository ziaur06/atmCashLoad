import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AtmInformationMySuffix } from './atm-information-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AtmInformationMySuffix>;

@Injectable()
export class AtmInformationMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/atm-informations';

    constructor(private http: HttpClient) { }

    create(atmInformation: AtmInformationMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(atmInformation);
        return this.http.post<AtmInformationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(atmInformation: AtmInformationMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(atmInformation);
        return this.http.put<AtmInformationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AtmInformationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AtmInformationMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<AtmInformationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AtmInformationMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AtmInformationMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AtmInformationMySuffix[]>): HttpResponse<AtmInformationMySuffix[]> {
        const jsonResponse: AtmInformationMySuffix[] = res.body;
        const body: AtmInformationMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AtmInformationMySuffix.
     */
    private convertItemFromServer(atmInformation: AtmInformationMySuffix): AtmInformationMySuffix {
        const copy: AtmInformationMySuffix = Object.assign({}, atmInformation);
        return copy;
    }

    /**
     * Convert a AtmInformationMySuffix to a JSON which can be sent to the server.
     */
    private convert(atmInformation: AtmInformationMySuffix): AtmInformationMySuffix {
        const copy: AtmInformationMySuffix = Object.assign({}, atmInformation);
        return copy;
    }
}
