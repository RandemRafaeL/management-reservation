import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isEmptyArray',
    standalone: true,
})
export class IsEmptyArrayPipe implements PipeTransform {
    transform(value: Array<any> | undefined | null | boolean): boolean {
        return Array.isArray(value) && value.length === 0;
    }
}

@Pipe({
    name: 'isNotEmptyArray',
    standalone: true,
})
export class IsNotEmptyArrayPipe implements PipeTransform {
    transform(value: Array<any> | undefined | null | boolean): boolean {
        return !(Array.isArray(value) && value.length === 0);
    }
}
