import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [],
    resolve: {
        alias: {
            '@model': resolve(__dirname, 'src/model'),
            '@view': resolve(__dirname, 'src/view'),
            '@presenter': resolve(__dirname, 'src/presenter'),
        },
    },
});