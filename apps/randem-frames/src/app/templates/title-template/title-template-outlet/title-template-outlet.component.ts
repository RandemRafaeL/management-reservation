import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'randem-frames-title-template-outlet',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './title-template-outlet.component.html',
    styleUrls: ['./title-template-outlet.component.scss', '../title-template.component.scss'],
})
export class TitleTemplateOutletComponent {}
