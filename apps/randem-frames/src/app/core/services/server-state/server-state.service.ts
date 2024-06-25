import { Injectable } from '@angular/core';
import { SetStateGQL, SetStateMutation } from '../../../../graphql/_state/mutate/set-state.mutate.generated';
import { GetStateGQL, GetStateQuery } from '../../../../graphql/_state/query/get-state.query.generated';
import { ListStateGQL, ListStateQuery } from '../../../../graphql/_state/query/list-state.query.generated';
import { DeleteStateGQL, DeleteStateMutation } from '../../../../graphql/_state/mutate/delete-state.mutate.generated';
import {
    DeleteStateByIdGQL,
    DeleteStateByIdMutation,
} from '../../../../graphql/_state/mutate/delete-stateById.mutate.generated';
import { StateInput } from '../../../../graphql/_generated/types';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IServerStateService } from './server-state-service.interface';

@Injectable({
    providedIn: 'root',
})
export class ServerStateService implements IServerStateService {
    constructor(
        private setStateGQL: SetStateGQL,
        private getStateGQL: GetStateGQL,
        private listStateGQL: ListStateGQL,
        private deleteStateGQL: DeleteStateGQL,
        private deleteStateByIdGQL: DeleteStateByIdGQL
    ) {}

    setState(input: StateInput): Observable<SetStateMutation['setState']> {
        return this.setStateGQL //
            .mutate(
                { input },
                {
                    refetchQueries: [
                        { query: this.getStateGQL.document, variables: { key: input.key, userId: input.userId } },
                    ],
                }
            )
            .pipe(map(res => res.data?.setState as SetStateMutation['setState']));
    }

    getState(key: string, userId?: string | null): Observable<GetStateQuery['getState']> {
        return this.getStateGQL //
            .watch({ key, userId })
            .valueChanges.pipe(map(res => res.data.getState));
    }

    listState(): Observable<ListStateQuery['listState']> {
        return this.listStateGQL //
            .watch()
            .valueChanges.pipe(map(res => res.data.listState));
    }

    deleteState(key: string, userId?: string | null): Observable<DeleteStateMutation['deleteState']> {
        return this.deleteStateGQL //
            .mutate({ key, userId })
            .pipe(map(res => res.data?.deleteState));
    }

    deleteStateById(id: string): Observable<DeleteStateByIdMutation['deleteStateById']> {
        return this.deleteStateByIdGQL //
            .mutate({ deleteStateId: id })
            .pipe(map(res => res.data?.deleteStateById));
    }

    value<T>(key: string, userId?: string | null): Observable<T> {
        return this.getStateGQL //
            .watch({ key, userId })
            .valueChanges.pipe(map(res => res.data.getState?.value));
    }
}
