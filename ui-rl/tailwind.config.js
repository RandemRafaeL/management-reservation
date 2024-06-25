const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                xs: { raw: '(min-width: 480px)' },
                sm: { raw: '(min-width: 640px)' },
                md: { raw: '(min-width: 768px)' },
                lg: { raw: '(min-width: 1024px)' },
                xl: { raw: '(min-width: 1280px)' },
                '2xl': { raw: '(min-width: 1536px)' },
                '3xl': { raw: '(min-width: 1800px)' },

                // Dodanie niestandardowych klas z prefixem 'max-' dla istniejących breakpointów
                'max-3xl': { raw: '(max-width: 1799px)' },
                'max-2xl': { raw: '(max-width: 1535px)' },
                'max-xl': { raw: '(max-width: 1279px)' },
                'max-lg': { raw: '(max-width: 1023px)' },
                'max-md': { raw: '(max-width: 767px)' },
                'max-sm': { raw: '(max-width: 639px)' },
                'max-xs': { raw: '(max-width: 479px)' },
            },
        },
    },
    plugins: [],
};
