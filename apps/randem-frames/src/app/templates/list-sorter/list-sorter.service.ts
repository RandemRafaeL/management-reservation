import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { flattenObject } from '../../Helpers/form-generator/flat-list';

@Injectable()
export class ListSorterService {
    private _defaultList = new BehaviorSubject<Record<string, string>[]>([]);
    private _keyListItem = new BehaviorSubject<string>('');
    private _sortingDirection = new BehaviorSubject<'asc' | 'desc'>('asc');
    private _searchedText = new BehaviorSubject<string>('');
    private readonly _sortedAndSearchedList: Observable<Record<string, string>[]> = of([]);

    private _defaultFlattenList: Record<string, string>[] = [];

    constructor() {
        this._sortedAndSearchedList = combineLatest([
            this._defaultList,
            this._keyListItem,
            this._sortingDirection,
            this._searchedText,
        ]).pipe(
            map(([list, key, direction, searchText]) => {
                return this._defaultFlattenList
                    ?.filter(item => !searchText || item[key]?.toLowerCase().includes(searchText.toLowerCase()))
                    .sort((a, b) => {
                        const itemA = `${a[key]}`.toLowerCase();
                        const itemB = `${b[key]}`.toLowerCase();
                        return direction === 'asc' ? itemA.localeCompare(itemB) : itemB.localeCompare(itemA);
                    });
            })
        );
    }

    set defaultList(list: Record<string, string>[]) {
        this._defaultFlattenList = list.map(item => flattenObject(item));
        this._defaultList.next(list);
    }

    set keyListItem(key: string) {
        this._keyListItem.next(key);
    }

    set sortingDirection(direction: 'asc' | 'desc') {
        this._sortingDirection.next(direction);
    }

    set searchedText(text: string) {
        this._searchedText.next(text);
    }

    get sortedAndSearchedList() {
        return this._sortedAndSearchedList.pipe(
            map(
                sortedList =>
                    sortedList //
                        .map(item => item['id'])
                        .map(id => this._defaultList.value.find(item => item['id'] === id)) // TODO mało optymalne poprawić w razie potrzeby
            )
        );
    }
}
