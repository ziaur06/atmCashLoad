import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BranchMySuffix } from './branch-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BranchMySuffix>;

@Injectable()
export class BranchMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/branches';

    constructor(private http: HttpClient) { }

    create(branch: BranchMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(branch);
        return this.http.post<BranchMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(branch: BranchMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(branch);
        return this.http.put<BranchMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BranchMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BranchMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<BranchMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BranchMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BranchMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BranchMySuffix[]>): HttpResponse<BranchMySuffix[]> {
        const jsonResponse: BranchMySuffix[] = res.body;
        const body: BranchMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BranchMySuffix.
     */
    private convertItemFromServer(branch: BranchMySuffix): BranchMySuffix {
        const copy: BranchMySuffix = Object.assign({}, branch);
        return copy;
    }

    /**
     * Convert a BranchMySuffix to a JSON which can be sent to the server.
     */
    private convert(branch: BranchMySuffix): BranchMySuffix {
        const copy: BranchMySuffix = Object.assign({}, branch);
        return copy;
    }
}
