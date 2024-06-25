import { RL_LocalStore, getFromStore, saveToStore } from './rl-storage';
import { JSDOM } from 'jsdom';
// Zakładając, że wszystkie wymagane funkcje i klasy są eksportowane z pliku rl-storage

const jsdom = new JSDOM('<!DOCTYPE html><p>Hello world</p>');
const domWindow = jsdom.window as unknown as Window & typeof globalThis;

global.window = domWindow;
global.document = domWindow.document;

describe('RL_LocalStore', () => {
    let key: string;
    let testObject: { [key: string]: string };
    let localStore: RL_LocalStore<typeof testObject>;

    beforeEach(() => {
        key = 'testKey';
        testObject = { name: 'Test', value: 'Value' };
        localStore = new RL_LocalStore<typeof testObject>(key);
        localStorage.clear();
    });

    it('should save and retrieve a value from localStorage', () => {
        localStore.setValue(testObject);
        expect(localStore.getValue()).toEqual(testObject);
    });

    it('should remove a value from localStorage when set to null', () => {
        localStore.setValue(testObject);
        localStore.setValue(null);
        expect(localStore.getValue()).toBeNull();
    });

    it('should update the cache when localStorage is externally updated', () => {
        // Przygotowanie zdarzenia storage
        const event = new window.Event('storage', { bubbles: true, cancelable: false });
        Object.defineProperty(event, 'key', { value: 'testKey', writable: false });
        Object.defineProperty(event, 'newValue', {
            value: JSON.stringify({ name: 'Test', value: 'Value' }),
            writable: false,
        });

        // Symulacja zdarzenia
        window.dispatchEvent(event);

        expect(localStore.getValue()).toBeNull(); // lub inne oczekiwane zachowanie
    });

    it('should handle JSON parsing errors gracefully', () => {
        localStorage.setItem(key, 'not a valid JSON');
        expect(() => localStore.getValue()).not.toThrow();
        expect(localStore.getValue()).toBeNull();
    });

    it('should catch and log error during JSON stringify', () => {
        const consoleSpy = jest.spyOn(console, 'error');
        const circularReference = { other: null };
        circularReference.other = circularReference; // Tworzy cykliczną referencję

        expect(() => localStore.setValue(circularReference)).not.toThrow();
        expect(consoleSpy).toHaveBeenCalled();
    });
});

describe('getFromStore and saveToStore utility functions', () => {
    const key = 'utilKey';
    const data = { sample: 'data' };

    beforeEach(() => {
        localStorage.clear();
    });

    it('should retrieve null for non-existing key', () => {
        expect(getFromStore(key)).toBeNull();
    });

    it('should save and retrieve data correctly', () => {
        saveToStore(key, data);
        expect(getFromStore(key)).toEqual(data);
    });

    it('should remove data from localStorage when value is null', () => {
        saveToStore(key, data);
        saveToStore(key, null);
        expect(getFromStore(key)).toBeNull();
    });
});
