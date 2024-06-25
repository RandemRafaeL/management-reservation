export class RlFlat {
    private _originalObject: { [key: string]: any };
    constructor(private originalObject: { [key: string]: any }) {
        this._originalObject = originalObject;
    }

    get flat(): FlatObject {
        return flattenObject(this._originalObject);
    }

    get paths() {
        return getObjectPaths(this._originalObject);
    }

    get flatArray() {
        return flattenObjectToKeyValueArray(this._originalObject);
    }

    get value() {
        return Object.freeze(this._originalObject);
    }

    update(fn: (arg0: { [key: string]: any }) => any) {
        return fn(this._originalObject);
    }
}

export type FlatObject = Record<string, any>;
export function flattenObject(obj: Record<string, any>, parentKey = '', separator = '.'): FlatObject {
    if (!obj) return {};

    return Object.keys(obj).reduce<FlatObject>((acc, key) => {
        const value = obj[key];
        let newKey = parentKey ? `${parentKey}${separator}${key}` : key;

        // Sprawdzanie, czy klucz jest częścią tablicy i modyfikacja formatu klucza
        if (Array.isArray(obj)) {
            newKey = parentKey ? `${parentKey}[${key}]` : key; // Dla tablic, używamy nawiasów kwadratowych
        }

        if (value && typeof value === 'object') {
            Object.assign(acc, flattenObject(value, newKey, separator));
        } else {
            acc[newKey] = value;
        }

        return acc;
    }, {});
}

export function getObjectPaths(obj: Record<string, any>, prefix = ''): string[] {
    if (!obj) return [];
    let paths: any[] = [];

    if (typeof obj === 'object') {
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            const fullPath = Array.isArray(obj) ? `${prefix}[${key}]` : `${prefix}${prefix ? '.' : ''}${key}`;

            if (typeof value === 'object' && value !== null) {
                // Obsługa tablic oraz obiektów
                paths = paths.concat(getObjectPaths(value, fullPath));
            } else {
                paths.push(fullPath);
            }
        });
    } else {
        // Przypadek bazowy dla tablicy
        paths.push(prefix);
    }

    return paths;
}

type FlatObjectKeyValueArray = Array<{ key: string; value: any }>;

export function flattenObjectToKeyValueArray(
    obj: Record<string, any>,
    parentKey = '',
    separator = '.'
): FlatObjectKeyValueArray {
    if (!obj) return [];

    let result: FlatObjectKeyValueArray = [];

    Object.keys(obj).forEach(key => {
        const newKey = parentKey ? `${parentKey}${separator}${key}` : key;
        const value = obj[key];

        if (value && typeof value === 'object' && !Array.isArray(value)) {
            // Rekurencyjne spłaszczanie zagnieżdżonych obiektów
            result = result.concat(flattenObjectToKeyValueArray(value, newKey, separator));
        } else if (Array.isArray(value)) {
            // Obsługa tablic: każdy element traktowany jako oddzielna wartość
            value.forEach((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    result = result.concat(flattenObjectToKeyValueArray(item, `${newKey}[${index}]`, separator));
                } else {
                    // Proste typy w tablicach są traktowane jako oddzielne ścieżki
                    result.push({ key: `${newKey}[${index}]`, value: item });
                }
            });
        } else {
            // Proste typy są bezpośrednio dodawane do wyniku
            result.push({ key: newKey, value });
        }
    });

    return result;
}
