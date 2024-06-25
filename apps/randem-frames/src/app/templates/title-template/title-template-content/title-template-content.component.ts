import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'randem-frames-title-template-content',
    templateUrl: './title-template-content.component.html',
    styleUrl: './title-template-content.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class TitleTemplateContentComponent {
    @HostBinding('class') class = 'title-template-content custom-scrollbar';
}
