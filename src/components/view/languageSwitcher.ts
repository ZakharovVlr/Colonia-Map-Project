// src/components/view/languageSwitcher.ts
import { ensureElement } from '../../utils/utils';
import { TranslationKey, translations } from '../../i18n/translations';

/**
 * Класс для управления переключателем языка интерфейса
 */
export interface ILanguageSwitcher {
    setLanguage(language: 'ru' | 'en'): void;
}

export class LanguageSwitcher implements ILanguageSwitcher {
    protected language: 'ru' | 'en' = 'ru';
    protected toggleButton: HTMLButtonElement;
    protected labelElement: HTMLElement;

    constructor() {
        this.toggleButton = ensureElement<HTMLButtonElement>('#lang-switch-btn');
        this.labelElement = ensureElement<HTMLElement>('#lang-switch-label');

        this.toggleButton.addEventListener('click', () => {
            const next = this.language === 'ru' ? 'en' : 'ru';
            this.setLanguage(next);
        });
    }

    setLanguage(language: 'ru' | 'en'): void {
        this.language = language;
        this.labelElement.textContent = language.toUpperCase();
        this.applyTranslations(language);
    }

    protected applyTranslations(language: 'ru' | 'en'): void {
        // 1. Пройтись по всем элементам с data-i18n и подставить текст
        document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((element) => {
            const key = element.dataset.i18n as TranslationKey;
            element.textContent = translations[language][key];
        });

        // 2. Отдельно — поле поиска (placeholder, а не textContent)
        const searchInput = ensureElement<HTMLInputElement>('#map-search');
        const placeholderKey = searchInput.dataset.i18nPlaceholder as TranslationKey; // подсказка: searchInput.dataset.???
        searchInput.placeholder = translations[language][placeholderKey];
    }
}
