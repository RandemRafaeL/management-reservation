import { Component } from '@angular/core';
import {
    ListCategoryOfOfferGQL,
    ListCategoryOfOfferQuery,
} from '../../../graphql/offer/categoryOfOffer/listCcategoryOfOffer.query.generated';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, firstValueFrom, Observable } from 'rxjs';
import { B } from '@angular/cdk/keycodes';

type Steps = Array<{
    title: string;
    itemId?: string;
    items: Array<{ id: string; name: string; imageUrl: string }>;
}>;

@Component({
    selector: 'randem-frames-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
    listCategory$: Observable<ListCategoryOfOfferQuery['listCategoryOfOffer']>;
    currentCategory$: BehaviorSubject<ListCategoryOfOfferQuery['listCategoryOfOffer'][number] | null>;

    listOffer$: Observable<ListCategoryOfOfferQuery['listCategoryOfOffer'][number]['offers'] | null>;

    stepList$: Observable<Steps>;
    step$: Observable<Steps[number]>;
    currentStep$: BehaviorSubject<number>;
    currentId$!: BehaviorSubject<string>;

    constructor(private listCategoryOfOfferGQL: ListCategoryOfOfferGQL) {
        this.listCategory$ = this.listCategoryOfOfferGQL //
            .fetch()
            .pipe(map(res => res.data.listCategoryOfOffer));

        this.currentCategory$ = new BehaviorSubject<ListCategoryOfOfferQuery['listCategoryOfOffer'][number] | null>(
            null
        );

        this.listOffer$ = combineLatest([this.listCategory$, this.currentCategory$]).pipe(
            map(
                ([listCategory, currentCategory]) =>
                    listCategory.find(category => currentCategory?.id === category.id)?.offers || null
            )
        );

        this.stepList$ = combineLatest([this.listCategory$, this.listOffer$]).pipe(
            map(([listCategory, listOffer]) => [
                {
                    title: 'Kategorie',
                    items: listCategory.map(item => {
                        const { id, name, imageUrl } = item;
                        return {
                            id: id,
                            name: name,
                            imageUrl: imageUrl || '',
                        };
                    }),
                },
                {
                    title: 'Usługi',
                    itemId: '',
                    items: [],
                    // listOffer.find( item => item.id ===  ),
                },
            ])
        );

        this.currentStep$ = new BehaviorSubject(0);

        this.step$ = combineLatest([this.stepList$, this.currentStep$]).pipe(
            map(([stepList, currentStep]) => stepList[currentStep])
        );
    }

    async nextStep(id: string) {
        const _currentStep = this.currentStep$.value;
        const _maxStep = await firstValueFrom(this.stepList$.pipe(map(list => list.length)));
        if (_currentStep < _maxStep) {
            this.currentStep$.next(_currentStep + 1);
        }
    }

    prevStep() {
        const _currentStep = this.currentStep$.value;
        if (_currentStep > 0) {
            this.currentStep$.next(_currentStep - 1);
        }
    }

    setCurrentCategory(categoryOfferId: string) {
        // Przykładowa implementacja, która aktualizuje `currentCategory$`
        this.listCategory$
            .pipe(map(categories => categories.find(category => category.id === categoryOfferId) || null))
            .subscribe(category => this.currentCategory$.next(category));
    }
}
