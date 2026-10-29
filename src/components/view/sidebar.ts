import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { MobileSheet } from '../view/MobileSheet';
/**
 * Класс для управления компонентом боковой панели (Сайдбара)
 */
export interface ISidebar {
    toggle(): void;
}

export class Sidebar implements ISidebar {
    protected isDark: boolean = false;
    protected events: IEvents;
    protected isCollapsed: boolean = false;
    protected sidebarElement: HTMLElement;
    protected toggleButton: HTMLButtonElement;
    protected mobileSheet: MobileSheet;

    constructor(events: IEvents) {
        this.events = events;
        this.sidebarElement = ensureElement<HTMLElement>('#sidebar');
        const toolbarElement = document.getElementById('toolbar');
        this.mobileSheet = new MobileSheet(this.sidebarElement, toolbarElement ? [toolbarElement] : []);
        this.toggleButton = ensureElement<HTMLButtonElement>('#sidebar-toggle');
        this.toggleButton.addEventListener( 'click', () => {
            this.toggle();
        });

        this.events.on<{ isDark: boolean }>('theme:changed', (data) => {
            this.isDark = data.isDark;
            this.renderTheme();
        });
    }

    // Переключить видимость панели.
    toggle(): void {
        this.isCollapsed = !this.isCollapsed;
        this.sidebarElement.classList.toggle('sidebar--collapsed', this.isCollapsed);
    }

    protected renderTheme(): void {
    // 1. Переключаем класс на сайдбаре
    this.sidebarElement.classList.toggle('dark--theme', this.isDark);
    }
}