export type TranslationKey =
    | 'search-placeholder'
    | 'footer-microservice'
    | 'footer-purpose'
    | 'github-tooltip'
    | 'lang-tooltip'
    | 'sidebar-toggle-tooltip'
    | 'toolbar-print-tooltip'
    | 'toolbar-report-tooltip'
    | 'toolbar-theme-tooltip'
    | 'toolbar-share-tooltip'

export const translations: Record<'ru' | 'en', Record<TranslationKey, string>> = {
    ru: {
        'search-placeholder': 'Поиск',
        'footer-microservice': 'Микросервис карт',
        'footer-purpose': 'Разработано в учебных целях',
        'github-tooltip': 'Открыть репозиторий',
        'lang-tooltip': 'Поменять язык',
        'sidebar-toggle-tooltip': 'Свернуть панель',
        'toolbar-print-tooltip': 'Печать',
        'toolbar-report-tooltip': 'Сообщить об ошибке',
        'toolbar-theme-tooltip': 'Тема',
        'toolbar-share-tooltip': 'Поделиться'
    },
    en: {
        'search-placeholder': 'Search',
        'footer-microservice': 'Map microservice',
        'footer-purpose': 'Developed for educational purposes',
        'github-tooltip': 'Open repository',
        'lang-tooltip': 'Change language',
        'sidebar-toggle-tooltip': 'Collapse panel',
        'toolbar-print-tooltip': 'Seal',
        'toolbar-report-tooltip': 'Report a bug',
        'toolbar-theme-tooltip': 'Theme',
        'toolbar-share-tooltip': 'Share'
    },
};
        