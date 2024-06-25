import { Directive, ElementRef, Renderer2, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

/**
    nie działa poprawnie z tailwind class, tailwind definiować poprze @apply

     definiowanie własnych breakpointów
     <div rlResClass='xs::bg-black sm::bg-green-500 md::bg-red-600  lg::bg-violet-900 xl::bg-blue-700' class='red border-1 w-96'  [customBreakpoints]="{
     class='xs::bg-black sm::bg-green-500 md::bg-red-600  lg::bg-violet-900 xl::bg-blue-700 red border-1 w-96
        xs: { min: 0, max: 300 },
        sm: { min: 301, max: 600 },
        md: { min: 601, max: 900 },
        lg: { min: 901, max: 1200 },
        xl: { min: 1201, max: 1500 }
         }">
        Treść responsywna
    </div>
*/

interface Breakpoint {
    min: number;
    max: number;
}

interface Breakpoints {
    [key: string]: Breakpoint;
}

@Directive({
    selector: '[rlResClass]',
    standalone: true,
})
export class ResponsiveClassDirective implements AfterViewInit {
    @Input() rlResClass?: string;
    @Input() customBreakpoints?: Breakpoints;

    @Output() width = new EventEmitter<string>();
    @Output() resClass = new EventEmitter<string>();

    private defaultBreakpoints: Breakpoints = {
        xxs: { min: 0, max: 239 },
        xs: { min: 240, max: 479 },
        sm: { min: 480, max: 720 },
        md: { min: 720, max: 959 },
        lg: { min: 960, max: 1199 },
        xl: { min: 1200, max: 1919 },
        xxl: { min: 1920, max: 8192 },
    };

    private defaultClasses = 'xxs:xxs xs:xs sm:sm md:md lg:lg xl:xl xxl:xxl';

    private initialClasses: string[] = [];

    constructor(
        private el: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this.captureInitialClasses();
        this.manageClasses();

        const ro = new ResizeObserver(() => {
            this.manageClasses();
        });
        ro.observe(this.el.nativeElement);
    }

    private captureInitialClasses(): void {
        this.rlResClass = this.rlResClass ? this.rlResClass : this.defaultClasses;
        this.initialClasses = Array.from(this.rlResClass.split(' ')).filter(cls => !!cls);
    }

    private manageClasses(): void {
        const breakpoints = this.customBreakpoints || this.defaultBreakpoints;
        const width: number = this.el.nativeElement.offsetWidth;
        this.width.emit(`${width}`);

        Object.entries(breakpoints).forEach(([breakpoint, { min, max }]) => {
            this.initialClasses.forEach(cls => {
                if (cls.startsWith(`${breakpoint}:`)) {
                    const className = cls.split(':')[1];
                    if (width >= min && (width <= max || max === undefined)) {
                        this.renderer.addClass(this.el.nativeElement, className);
                        this.resClass.emit(className);
                    } else {
                        this.renderer.removeClass(this.el.nativeElement, className);
                    }
                }
            });
        });
    }
}
