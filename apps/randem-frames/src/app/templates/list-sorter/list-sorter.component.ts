import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSorterService } from './list-sorter.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '@randem-frames/ui-rl';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';

@Component({
    selector: 'randem-frames-list-sorter',
    templateUrl: './list-sorter.component.html',
    styleUrl: './list-sorter.component.scss',
    standalone: true,
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: { class: 'list-sorter' },
    encapsulation: ViewEncapsulation.None,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        CardModule,
        MatIcon,
        MatInput,
        MatIconButton,
    ],
    // providers: [ListSorterService],
})
export class ListSorterComponent implements OnInit, OnDestroy {
    @Input() set list(list: Record<string, any>[]) {
        this.service.defaultList = list;
    }

    @Input() set keyListItem(key: string) {
        this.service.keyListItem = key;
        this.keyListItemControl.setValue(key);
    }
    @Input() set sortingDirection(value: 'asc' | 'desc') {
        this.service.sortingDirection = value;
        this.sortingDirectionControl.setValue(value);
    }

    @Input() set options(value: KeyName<any>[]) {
        this.optionsSignal.set(value);
    }

    @Output() sortedList = new EventEmitter();

    optionsSignal: WritableSignal<KeyName<any>[]> = signal([]);

    subscription = new Subscription();
    constructor(private service: ListSorterService) {}

    keyListItemControl = new FormControl();
    sortingDirectionControl = new FormControl<'asc' | 'desc'>('asc');
    searchedTextControl = new FormControl<string>('');

    ngOnInit() {
        this.subscription.add(
            this.service.sortedAndSearchedList.subscribe(sortedList => {
                console.log('[ListSorterComponent] sortedList', sortedList);
                this.sortedList.emit(sortedList);
            })
        );

        this.keyListItemControl.valueChanges
            .pipe(filter((key): key is string => !!key))
            .subscribe(value => (this.service.keyListItem = value as string));

        this.sortingDirectionControl.valueChanges
            .pipe(filter((flow): flow is 'asc' | 'desc' => !!flow))
            .subscribe(flow => (this.service.sortingDirection = flow));

        this.searchedTextControl.valueChanges
            .pipe(
                distinctUntilChanged(),
                debounceTime(200),
                filter((text): text is string => text !== null)
            )
            .subscribe(flow => (this.service.searchedText = flow));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

export type KeyName<T> = { key: keyof T; name: string };
