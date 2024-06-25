import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flattenObject, flattenObjectToKeyValueArray, getObjectPaths } from '../../Helpers/form-generator/flat-list';
import { ServerStateService } from '../../core/services/server-state/server-state.service';

@Component({
    selector: 'randem-frames-offer-for-employee',
    templateUrl: './offerForEmployee.component.html',
    styleUrl: './offerForEmployee.component.scss',
})
export class OfferForEmployeeComponent implements OnInit {
    //
    constructor(
        private activatedRoute: ActivatedRoute,
        private serverState: ServerStateService
    ) {}
    //
    offerForEmployeeList = signal<Record<string, any>[]>([]);
    offerForEmployeeFlatKeyValueList = signal<any[]>([]);

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ offerForEmployeeListResolver }) => {
            console.log(
                '[OfferForEmployeeComponent] keyValue',
                flattenObjectToKeyValueArray(offerForEmployeeListResolver)
            );
            console.log('[OfferForEmployeeComponent] path', getObjectPaths(offerForEmployeeListResolver));
            console.log('[OfferForEmployeeComponent] flatten', flattenObject(offerForEmployeeListResolver));
            console.log('[OfferForEmployeeComponent] res', offerForEmployeeListResolver);
            this.offerForEmployeeList.set(offerForEmployeeListResolver);

            this.offerForEmployeeFlatKeyValueList.set(
                offerForEmployeeListResolver.map((item: Record<string, any>) => flattenObjectToKeyValueArray(item))
            );
        });
    }
}
