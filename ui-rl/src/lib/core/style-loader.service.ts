import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class StyleLoader implements OnDestroy {
    private loadedStyles = new Map<string, HTMLLinkElement>();

    loadStyles(urls: string[]): void {
        urls.forEach(url => {
            if (!this.loadedStyles.has(url)) {
                const link = document.createElement('link');
                link.href = url;
                link.rel = 'stylesheet';
                document.head.appendChild(link);
                this.loadedStyles.set(url, link);
            }
        });
    }

    ngOnDestroy() {
        this.loadedStyles.forEach(link => {
            document.head.removeChild(link);
        });
        this.loadedStyles.clear();
    }
}
