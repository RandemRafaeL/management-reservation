import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormCompleteService } from './form-complete.service';
import { MatOption, ThemePalette } from '@angular/material/core';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, startWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

export interface ListFormComplete {
    id: string;
    name: string;
}

@Component({
    selector: 'randem-frames-form-complete',
    templateUrl: './form-complete.component.html',
    styleUrl: './form-complete.component.scss',
    standalone: true,
    imports: [
        CommonModule,
        MatFormField,
        MatInput,
        MatAutocomplete,
        MatOption,
        MatAutocompleteTrigger,
        ReactiveFormsModule,
        MatIconButton,
        MatIcon,
        MatSuffix,
        MatPrefix,
    ],
    providers: [FormCompleteService],
    encapsulation: ViewEncapsulation.None,
})
export class FormCompleteComponent implements OnChanges {
    @Input() color: ThemePalette;
    @Input() label!: string;
    @Input() placeholder = '';
    @Input() optionsList!: ListFormComplete[];
    @Input() startValue!: string;
    @Input() noIcon: boolean | string = false;

    @Output() selectedItemEmitter = new EventEmitter();

    myControl = new FormControl('');
    private _optionsList: ListFormComplete[] = [];

    filteredOptions$!: Observable<ListFormComplete[]>;
    selectedItem!: ListFormComplete;

    constructor(private formCompleteService: FormCompleteService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['optionsList'] || (changes['startValue'] && this.startValue)) {
            this._optionsList = [...(this.optionsList || [])];

            this.filteredOptions$ = this.myControl.valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value || ''))
            );

            const startName = this._optionsList.find(item => item.id === this.startValue);
            console.log('starName', startName);
            if (startName) {
                this.placeholder = startName.name;
                this.myControl.setValue(startName.name);
            }
        }
    }

    private _filter(value: string): ListFormComplete[] {
        const filterValue = value.toLowerCase();

        return this._optionsList //
            .filter(option => `${option['name']}`.toLowerCase().includes(filterValue));
    }

    emitSelect(itemId: string) {
        this.placeholder = this._optionsList.find(option => option.id === itemId)?.name as string;
        this.selectedItemEmitter.emit(itemId);
    }
}
