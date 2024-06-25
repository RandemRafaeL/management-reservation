import { Component, OnInit } from '@angular/core';
import { RL_Storage } from '@randem-frames/rlStorage';

@Component({
    selector: 'randem-frames-sandbox-template',
    templateUrl: './sandbox-template.component.html',
    styleUrl: './sandbox-template.component.scss',
})
export class SandboxTemplateComponent implements OnInit {
    @RL_Storage('sandViewStyle')
    viewStyle!: 'cards' | 'list' | 'table';

    ngOnInit() {
        this.viewStyle = this.viewStyle || 'cards';
    }
}
