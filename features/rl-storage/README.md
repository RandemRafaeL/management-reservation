
# rlStorage

Biblioteka `rlStorage` umożliwia łatwą i efektywną pracę z `localStorage` w aplikacjach Angular. Zaprojektowana z myślą o wygodzie deweloperów, oferuje dekoratory do przechowywania danych w sposób zorganizowany i typowany, bez potrzeby bezpośredniego korzystania z `localStorage`.

## Sposób Użycia

### Tryb Single

W trybie `single`, każda wartość jest przechowywana pod unikalnym kluczem.

#### Deklaracja

```typescript
import { RL_Storage } from '@randem-frames/rlStorage';

class UserProfileComponent {
  @RL_Storage('user-profile')
  public username!: string;

  @RL_Storage('user-profile-email')
  public email!: string;

  @RL_Storage('settings')
  public theme!: string | null;
}
```

#### Zapis do LocalStorage

```typescript
this.username = 'janek';
this.theme = 'dark';
this.email = 'janek@example.com';
```

#### Odczyt z LocalStorage

```typescript
console.log('Username:', this.username);
console.log('Email:', this.email);
console.log('Theme:', this.theme);
```

#### Usunięcie wartości

```typescript
this.theme = null;
```

### Tryb Multi

W trybie `multi`, wiele wartości jest przechowywanych jako obiekt pod jednym kluczem, co pozwala na bardziej zorganizowane zarządzanie danymi.

#### Deklaracja

```typescript
@RL_Storage('activity', { mode: 'multi' })
public loginTimes!: string[];

@RL_Storage('activity')
public logoutTimes!: string[];
```

#### Zapis do LocalStorage

```typescript
this.loginTimes = ['2023-01-01 10:00', '2023-01-02 11:00', 'pierwszy'];
this.logoutTimes = ['2023-01-01 18:00', '2023-01-02 19:00', 'drugi'];
```

#### Odczyt z LocalStorage

```typescript
console.log('Login Times:', this.loginTimes);
console.log('Logout Times:', this.logoutTimes);
```

### Wersja Asynchroniczna

Dla operacji wymagających asynchroniczności, `rlStorage` oferuje dekoratory zwracające `Promise` lub obsługujące `Observable` z RxJS.

#### Deklaracja Asynchroniczna

```typescript
@RL_StoragePromise('asyncMyStore')
myStore!: string | null;
```

#### Odczyt Asynchroniczny

```typescript
async logStore() {
    return await this.myStore;
}


this.logStore().then( value => console.log(value));

console.log('LOGSTORE', await this.logStore());
```


Wersja experimental z rx pod spodem w trakcie rozwoju 

```typescript
@RL_Storage$('rxjsStore')
obs!: string;
```