import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { route as routeFn } from 'ziggy-js';
import { initializeTheme } from './hooks/use-appearance';

declare global {
    const route: typeof routeFn;
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        /**
         * This is a special case for the Rapid CMS package.
         * It allows us to load the page components from the Rapid CMS package.
         *
         * WARNING: This is required don't change.
         */

        if (name.includes('rapid-cms')) {
            return resolvePageComponent(
                `../../vendor/rapid-cms/core/resources/js/pages/react/${name.replaceAll('rapid-cms::', '')}.tsx`,
                import.meta.glob('../../vendor/rapid-cms/core/resources/js/pages/react/**/*.tsx'),
            );
        }

        /**
         * This is the project related code and can be updated as needed.
         */
        return resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx'));
    },
    // resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
