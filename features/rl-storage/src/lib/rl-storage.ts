export const DEFAULT_KEY_PREFIX = 'RL-Store';

export function getKey(key: string | undefined, propertyName: string): string {
    return key || `${DEFAULT_KEY_PREFIX}__${propertyName}`;
}

export function getFromStore<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (data) {
        try {
            return JSON.parse(data);
        } catch (err) {
            console.error('Błąd podczas parsowania danych z localStorage', err);
            return null;
        }
    }
    return null;
}

async function getFromStore$<T>(key: string): Promise<T | null> {
    return getFromStore<T>(key);
}

export function saveToStore<T>(key: string, value: T | null): void {
    if (value === null) {
        localStorage.removeItem(key);
    } else {
        try {
            const serializedData = JSON.stringify(value);
            localStorage.setItem(key, serializedData);
        } catch (err) {
            console.error('Błąd podczas zapisywania danych do localStorage', err);
        }
    }
}

async function saveToStore$<T>(key: string, value: T | null): Promise<void> {
    saveToStore<T>(key, value);
}

export class RL_LocalStore<T> {
    private _valueCache: T | null;
    private readonly _key: string;

    constructor(key: string) {
        this._key = getKey(key, '');
        this._valueCache = null;
        window.addEventListener('storage', event => {
            if (event.key === this._key) {
                this._valueCache = null;
            }
        });
    }

    getValue(): T | null {
        if (this._valueCache === null) {
            this._valueCache = getFromStore<T>(this._key);
        }
        return this._valueCache;
    }

    async getValue$(): Promise<T | null> {
        if (this._valueCache === null) {
            this._valueCache = await getFromStore$<T>(this._key);
        }
        return this._valueCache;
    }

    setValue(value: T | null): void {
        this._valueCache = value;
        saveToStore<T>(this._key, value);
    }

    async setValue$(value: T | null): Promise<void> {
        this._valueCache = value;
        await saveToStore$<T>(this._key, value);
    }
}

type StorageOptions = {
    mode: 'single' | 'multi';
};

const storageModes: Map<string, 'single' | 'multi'> = new Map();

export function RL_Storage<T>(key: string, options: StorageOptions = { mode: 'single' }): PropertyDecorator {
    return function (target: object, propertyKey: string | symbol) {
        const storageKey = getKey(key, propertyKey.toString());
        const existingMode = storageModes.get(storageKey);

        if (existingMode === 'multi') {
            options.mode = 'multi';
        } else if (existingMode && existingMode !== options.mode) {
            throw new Error(
                `Niespójny tryb przechowywania dla klucza '${storageKey}'. Poprzedni tryb: ${existingMode}, nowy tryb: ${options.mode}`
            );
        }
        storageModes.set(storageKey, options.mode);

        const storage = new RL_LocalStore<T | Record<string, T>>(storageKey);

        Reflect.defineProperty(target, propertyKey, {
            get: () =>
                options.mode === 'multi' ? (storage.getValue() as never)[propertyKey.toString()] : storage.getValue(),
            set: (newValue: T) =>
                options.mode === 'multi'
                    ? storage.setValue({
                          ...storage.getValue(),
                          [propertyKey]: newValue as T,
                      })
                    : storage.setValue(newValue),
            enumerable: true,
            configurable: true,
        });
    };
}

export function RL_StoragePromise<T>(key: string, options: StorageOptions = { mode: 'single' }): PropertyDecorator {
    return function (target: object, propertyKey: string | symbol) {
        const storageKey = getKey(key, propertyKey.toString());
        const existingMode = storageModes.get(storageKey);

        if (existingMode === 'multi') {
            options.mode = 'multi';
        } else if (existingMode && existingMode !== options.mode) {
            throw new Error(
                `Niespójny tryb przechowywania dla klucza '${storageKey}'. Poprzedni tryb: ${existingMode}, nowy tryb: ${options.mode}`
            );
        }
        storageModes.set(storageKey, options.mode);

        const storage = new RL_LocalStore<T | Record<string, T>>(storageKey);

        Reflect.defineProperty(target, propertyKey, {
            get: async () =>
                options.mode === 'multi'
                    ? ((await storage.getValue$()) as never)[propertyKey.toString()]
                    : await storage.getValue$(),
            set: async (newValue: T) =>
                options.mode === 'multi'
                    ? await storage.setValue$({
                          ...storage.getValue(),
                          [propertyKey]: newValue as T,
                      })
                    : await storage.setValue$(newValue),
            enumerable: true,
            configurable: true,
        });
    };
}

import { Subject } from 'rxjs';

export function RL_Storage$<T>(key: string, options: StorageOptions = { mode: 'single' }): PropertyDecorator {
    return function (target: object, propertyKey: string | symbol) {
        const storageKey = getKey(key, propertyKey.toString());
        const existingMode = storageModes.get(storageKey);

        if (existingMode === 'multi') {
            options.mode = 'multi';
        } else if (existingMode && existingMode !== options.mode) {
            throw new Error(
                `Niespójny tryb przechowywania dla klucza '${storageKey}'. Poprzedni tryb: ${existingMode}, nowy tryb: ${options.mode}`
            );
        }
        storageModes.set(storageKey, options.mode);

        const storage = new RL_LocalStore<T | Record<string, T>>(storageKey);

        const subject = new Subject<T>();

        Reflect.defineProperty(target, propertyKey, {
            get: () =>
                options.mode === 'multi' ? (storage.getValue() as never)[propertyKey.toString()] : storage.getValue(),
            set: (newValue: T) => {
                options.mode === 'multi'
                    ? storage.setValue({
                          ...storage.getValue(),
                          [propertyKey]: newValue as T,
                      })
                    : storage.setValue(newValue);
                subject.next(newValue); // Emit the new value via the Subject
            },
            enumerable: true,
            configurable: true,
        });

        // Add a getter for the Subject
        const subjectKey = `${propertyKey.toString()}$`;
        Reflect.defineProperty(target, subjectKey, {
            get: () => subject,
            enumerable: true,
            configurable: true,
        });
    };
}
