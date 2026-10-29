// src/components/view/toolbar.ts
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';

export interface IToolbar {
    toggle(): void;
    toggleTheme(): void;
}

export class Toolbar implements IToolbar {
    protected isOpen: boolean = true;
    protected isDark: boolean = false;
    protected events: IEvents;
    protected actionsElement: HTMLElement;
    protected menuButton: HTMLButtonElement;
    protected closeButton: HTMLButtonElement;
    protected themeButton: HTMLButtonElement;
    protected sunIcon: SVGElement;
    protected moonIcon: SVGElement;

    constructor(events: IEvents) {
        this.events = events;
        this.actionsElement = ensureElement<HTMLElement>('#toolbar-actions');
        this.menuButton = ensureElement<HTMLButtonElement>('#toolbar-menu-btn');
        this.closeButton = ensureElement<HTMLButtonElement>('#toolbar-close-btn');
        this.themeButton = ensureElement<HTMLButtonElement>('#toolbar-theme-btn');
        this.sunIcon = ensureElement<SVGElement>('#toolbar-theme-icon-sun');
        this.moonIcon = ensureElement<SVGElement>('#toolbar-theme-icon-moon');

        this.menuButton.addEventListener('click', () => this.toggle());
        this.closeButton.addEventListener('click', () => this.toggle());
        this.themeButton.addEventListener('click', () => this.toggleTheme());
    }

    // Свернуть/развернуть всю панель действий.
    toggle(): void {
        this.isOpen = !this.isOpen;
        this.renderOpenState();
    }

    // Переключить светлую/тёмную тему самой панели.
    toggleTheme(): void {
        this.isDark = !this.isDark;
        this.renderTheme();
        this.events.emit('theme:changed', { isDark: this.isDark });
    }

    protected renderOpenState(): void {
        this.actionsElement.classList.toggle('hidden', !this.isOpen);
        this.closeButton.classList.toggle('hidden', !this.isOpen);
        this.menuButton.classList.toggle('hidden', this.isOpen);
        this.menuButton.classList.toggle('flex', !this.isOpen);
        this.menuButton.setAttribute('aria-expanded', String(this.isOpen));
    }

    // Переключить тему (отвечает за цвета)
    protected renderTheme(): void {
        // 1. Вешаем темную тему на весь body (это автоматически перекрасит кнопки карты справа)
        //document.body.classList.toggle('dark--theme', this.isDark);

        // 1. Переключаем класс на элементах панели тулбара
        this.actionsElement.classList.toggle('dark--theme', this.isDark);
        this.closeButton.classList.toggle('dark--theme', this.isDark);
        if (this.menuButton) {
            this.menuButton.classList.toggle('dark--theme', this.isDark);
        }

        // 2. Иконки солнца/луны
        this.sunIcon.classList.toggle('hidden', this.isDark);
        this.moonIcon.classList.toggle('hidden', !this.isDark);
        this.themeButton.setAttribute('aria-pressed', String(this.isDark));
    }
}