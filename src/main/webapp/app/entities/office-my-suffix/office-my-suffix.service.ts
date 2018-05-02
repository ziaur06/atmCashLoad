import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OfficeMySuffix } from './office-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OfficeMySuffix>;

@Injectable()
export class OfficeMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/offices';

    constructor(private http: HttpClient) { }

    create(office: OfficeMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(office);
        return this.http.post<OfficeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(office: OfficeMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(office);
        return this.http.put<OfficeMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OfficeMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OfficeMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<OfficeMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OfficeMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OfficeMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OfficeMySuffix[]>): HttpResponse<OfficeMySuffix[]> {
        const jsonResponse: OfficeMySuffix[] = res.body;
        const body: OfficeMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OfficeMySuffix.
     */
    private convertItemFromServer(office: OfficeMySuffix): OfficeMySuffix {
        const copy: OfficeMySuffix = Object.assign({}, office);
        return copy;
    }

    /**
     * Convert a OfficeMySuffix to a JSON which can be sent to the server.
     */
    private convert(office: OfficeMySuffix): OfficeMySuffix {
        const copy: OfficeMySuffix = Object.assign({}, office);
        return copy;
    }
}
