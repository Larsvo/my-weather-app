import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from "url";
import svgLoader from "vite-svg-loader";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        svgLoader(),
    ],
    css: {
        preprocessorOptions: {
            scss: {}
        }
    },
    build: {
        cssCodeSplit: false
    },
    server: {
        host: true // or '0.0.0.0'
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
})
