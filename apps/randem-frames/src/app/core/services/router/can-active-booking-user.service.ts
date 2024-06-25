import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs/operators';
import { GetCurrentUserGQL } from '../../../../graphql/user/getCurrentUser.query.generated';

export const canActiveBooking: CanActivateFn = () => {
    return inject(GetCurrentUserGQL)
        .fetch()
        .pipe(map(res => res.data.getCurrentUser?.role === 'ADMIN'));
};
