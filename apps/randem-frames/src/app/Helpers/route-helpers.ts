import { ActivatedRoute } from '@angular/router';

export function _findParam(input: { route: ActivatedRoute; paramName: string }): Record<string, string> {
    return input.route.snapshot.pathFromRoot //
        .map(el => el.params)
        .reduce((acc, val) => ({ ...acc, ...val }), {});
}

export function findParam(route: ActivatedRoute, paramName: string): string {
    return route.snapshot.pathFromRoot //
        .map(el => el.params)
        .reduce((acc, val) => ({ ...acc, ...val }), {})[paramName];
}
