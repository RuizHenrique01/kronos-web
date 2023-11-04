export default {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
    KEY_SECRET_ENCRYPT: import.meta.env.VITE_API_KEY_SECRET || 'Kronos@2023',
    GRAFANA_HOST: import.meta.env.VITE_GRAFANA_HOST || 'http://localhost:3000'
}