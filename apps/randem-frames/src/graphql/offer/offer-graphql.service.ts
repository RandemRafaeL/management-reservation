import { Injectable } from '@angular/core';
import { GetAllOffersExtendGQL, GetAllOffersExtendQueryVariables } from './query/getOffersExtend.query.generated';

@Injectable({
    providedIn: 'root',
})
export class OfferGraphqlService {
    constructor(private _getAllOffersExtendGQL: GetAllOffersExtendGQL) {}

    private _variablesAllOfferExtends!: GetAllOffersExtendQueryVariables;

    get getAllOffersExtendGQL() {
        return this._getAllOffersExtendGQL.watch(this._variablesAllOfferExtends).valueChanges;
    }

    get variablesAllOfferExtends() {
        return this._variablesAllOfferExtends;
    }

    setAllOffersExtendVariable(variables: GetAllOffersExtendQueryVariables) {
        this._variablesAllOfferExtends = variables;
    }
}
