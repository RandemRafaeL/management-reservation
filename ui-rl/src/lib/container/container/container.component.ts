import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    signal,
    SimpleChanges,
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'rl-container',
    templateUrl: './container.component.html',
    styleUrl: './container.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('expandCollapse', [
            state('collapsed', style({ height: '0px', opacity: 0, filter: 'blur(2px)' })),
            state('expanded', style({ height: '*', opacity: 1, filter: 'blur(0px)' })),
            transition('expanded <=> collapsed', [animate('0.25s ease-in-out')]),
        ]),
    ],
})
export class ContainerComponent implements OnChanges {
    @Input() isExpanded: boolean | undefined | null;

    constructor(private cdr: ChangeDetectorRef) {}

    state = signal('initial');

    ngOnChanges(changes: SimpleChanges) {
        // console.log('changes', this.isExpanded);
        if (
            changes['isExpanded'] &&
            changes['isExpanded'].currentValue !== changes['isExpanded'].previousValue &&
            changes['isExpanded'].currentValue !== null &&
            changes['isExpanded'].currentValue !== undefined
        ) {
            this.state.set(this.isExpanded ? 'expanded' : 'collapsed');
        }
    }
}
