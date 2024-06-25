// interfaces/state-service.interface.ts
import { Observable } from 'rxjs';
import { StateInput } from '../../../../graphql/_generated/types';
import { SetStateMutation } from '../../../../graphql/_state/mutate/set-state.mutate.generated';
import { GetStateQuery } from '../../../../graphql/_state/query/get-state.query.generated';
import { ListStateQuery } from '../../../../graphql/_state/query/list-state.query.generated';
import { DeleteStateMutation } from '../../../../graphql/_state/mutate/delete-state.mutate.generated';
import { DeleteStateByIdMutation } from '../../../../graphql/_state/mutate/delete-stateById.mutate.generated';

export interface IServerStateService {
    /**
     * Ustawia lub aktualizuje stan w systemie na podstawie przekazanego inputu.
     * @param input {StateInput} - Dane wejściowe dla stanu:
     *   key: string - Klucz identyfikujący stan.
     *   userId?: string | null - Identyfikator użytkownika związanego ze stanem; jeżeli null lub undefined, użytkownik pobierany jest z tokenu.
     *   value?: any | null - Wartość stanu do ustawienia; jeżeli null, rekord zostanie usunięty.
     * @returns Observable zwracający wynik operacji ustawienia stanu.
     */
    setState(input: StateInput): Observable<SetStateMutation['setState']>;

    /**
     * Pobiera stan dla podanego klucza i opcjonalnego identyfikatora użytkownika.
     * @param key {string} - Klucz, dla którego stan ma zostać pobrany.
     * @param userId {string | null} - Opcjonalny identyfikator użytkownika, dla którego stan jest pobierany.
     *    Jeśli nie zostanie podany, wykorzystywane będą dane zalogowanego użytkownika.
     * @returns {GetStateQuery['getState']} Observable zwracający obiekt stanu, zawierający m.in. id, key, userId i value.
     */
    getState(key: string, userId?: string | null): Observable<GetStateQuery['getState']>;

    /**
     * Pobiera listę wszystkich stanów zapisanych w systemie.
     * @returns {ListStateQuery['listState']} Observable zwracający tablicę obiektów stanu, każdy zawierający m.in. id, key, userId i value.
     */
    listState(): Observable<ListStateQuery['listState']>;

    /**
     * Usuwa stan na podstawie podanego klucza i identyfikatora użytkownika.
     * @param key {string} - Klucz stanu, który ma zostać usunięty.
     * @param userId {string | null} - Opcjonalny identyfikator użytkownika, dla którego stan jest usuwany.
     *    Jeśli nie zostanie podany, wykorzystywane będą dane zalogowanego użytkownika.
     * @returns {DeleteStateMutation['deleteState']} Observable zwracający wynik operacji usunięcia stanu.
     */
    deleteState(key: string, userId?: string | null): Observable<DeleteStateMutation['deleteState']>;

    /**
     * Usuwa stan na podstawie identyfikatora.
     * @param id {string} - Identyfikator stanu, który ma zostać usunięty.
     * @returns {DeleteStateByIdMutation['deleteStateById']} Observable zwracający id usunięcia stanu.
     */
    deleteStateById(id: string): Observable<DeleteStateByIdMutation['deleteStateById']>;
}
