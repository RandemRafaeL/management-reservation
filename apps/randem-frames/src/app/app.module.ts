import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { StartTemplateModule } from './start-template/start-template.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './state/randem-frame.store';
import { CompanyModule } from './modules/company/company.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './http-services/interceptors/authorization-interceptor.service';
import { UserEffects } from './state/user';
import * as user from './state/user';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { EntityMetadataModule } from './state/entities/entity-metadata.module';
import { DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { IMAGE_SERVICE, IMAGES_CONFIG } from '@randem-frames/ui-rl';
import { ImageHttpService } from './modules/images/image-http.service';
import { IsEmptyArrayPipe } from './Helpers/pipes/isEmptyArray.pipe';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        StartTemplateModule,
        RouterModule.forRoot(appRoutes, {
            initialNavigation: 'enabledBlocking',
            enableTracing: false,
            useHash: true,
            scrollPositionRestoration: 'top',
            // onSameUrlNavigation: 'reload',
        }),
        StoreModule.forRoot(reducers, {
            runtimeChecks: {
                strictActionImmutability: true,
                strictStateImmutability: true,
            },
        }),
        StoreModule.forFeature(user.FEATURE_USER, user.userReducer),
        EffectsModule.forRoot([UserEffects]),
        StoreRouterConnectingModule.forRoot(),
        StoreDevtoolsModule.instrument({ logOnly: !isDevMode(), trace: isDevMode() }),
        EntityMetadataModule,
        ApolloModule,
        DialogModule,
        CompanyModule,
        MatBottomSheetModule,
        IsEmptyArrayPipe,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => {
                return {
                    cache: new InMemoryCache(),
                    connectToDevTools: true,
                    link: httpLink.create({
                        uri: environment.graphqlUrl, // URL do endpoint GraphQL
                    }),
                    defaultOptions: {
                        watchQuery: {
                            fetchPolicy: 'cache-first', //  globalna politykę pobierania
                            errorPolicy: 'all',
                        },
                        query: {
                            fetchPolicy: 'network-only', //  pojedynczych zapytań
                            errorPolicy: 'all',
                        },
                    },
                };
            },
            deps: [HttpLink],
        },
        { provide: DIALOG_DATA, useValue: {} },
        { provide: IMAGES_CONFIG, useValue: { apiUrl: environment.apiUrl } },
        {
            provide: IMAGE_SERVICE,
            useClass: ImageHttpService,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
