export default {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
    KEY_SECRET_ENCRYPT: import.meta.env.VITE_API_KEY_SECRET || 'Kronos@2023',
    GRAFANA_HOST: import.meta.env.VITE_GRAFANA_HOST || 'http://localhost:3000',
    GRAPHIC_PERCENT: import.meta.env.VITE_GRAPHIC_PERCENT || "",
    GRAPHIC_BURNDOWN: import.meta.env.VITE_GRAPHIC_BURNDOWN || "",
    GRAPHIC_COMPARE: import.meta.env.VITE_GRAPHIC_COMPARE || "",
}