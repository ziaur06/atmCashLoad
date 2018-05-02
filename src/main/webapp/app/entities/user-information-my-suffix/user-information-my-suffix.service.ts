import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserInformationMySuffix } from './user-information-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserInformationMySuffix>;

@Injectable()
export class UserInformationMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/user-informations';

    constructor(private http: HttpClient) { }

    create(userInformation: UserInformationMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(userInformation);
        return this.http.post<UserInformationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userInformation: UserInformationMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(userInformation);
        return this.http.put<UserInformationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserInformationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserInformationMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserInformationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserInformationMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserInformationMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserInformationMySuffix[]>): HttpResponse<UserInformationMySuffix[]> {
        const jsonResponse: UserInformationMySuffix[] = res.body;
        const body: UserInformationMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserInformationMySuffix.
     */
    private convertItemFromServer(userInformation: UserInformationMySuffix): UserInformationMySuffix {
        const copy: UserInformationMySuffix = Object.assign({}, userInformation);
        return copy;
    }

    /**
     * Convert a UserInformationMySuffix to a JSON which can be sent to the server.
     */
    private convert(userInformation: UserInformationMySuffix): UserInformationMySuffix {
        const copy: UserInformationMySuffix = Object.assign({}, userInformation);
        return copy;
    }
}
