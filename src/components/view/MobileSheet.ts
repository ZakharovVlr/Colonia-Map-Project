// src/components/view/MobileSheet.ts

export class MobileSheet {
    protected sidebar: HTMLElement;
    protected excludeElements: HTMLElement[];
    protected searchInput: HTMLInputElement;
    protected handle: HTMLElement;

    private startY = 0;
    private startTranslateY = 0;
    private currentTranslateY = 0;
    private isDragging = false;

    private sheetHeight = window.innerHeight * 0.7; // 70vh
    private minVisibleHeight = 76;
    private collapsedTranslateY = this.sheetHeight - this.minVisibleHeight;

    constructor(sidebar: HTMLElement, excludeElements: HTMLElement[] = []) {
        this.sidebar = sidebar;
        this.excludeElements = excludeElements;
        this.searchInput = document.getElementById('map-search') as HTMLInputElement;
        this.handle = this.sidebar?.querySelector('.max-md\\:block') as HTMLElement;

        if (!this.sidebar) {
            console.error('MobileSheet: Элемент #sidebar не найден в DOM!');
            return;
        }

        this.init();
    }

    private init(): void {
        // Настраиваем дефолтное положение
        this.updateDimensions();
        this.initPosition();

        window.addEventListener('resize', () => {
            this.updateDimensions();
            this.initPosition();
        });

        // Используем Pointer Events (поддерживают и мышь в эмуляторе, и палец на телефоне)
        this.handle?.addEventListener('pointerdown', this.onDragStart.bind(this));

        // Позволяем тянуть также за область поиска (первые 85px шторки)
        this.sidebar.addEventListener('pointerdown', (e) => {
            if (e.target === this.searchInput) return; // Не мешаем кликать по инпуту
            const rect = this.sidebar.getBoundingClientRect();
            if (e.clientY - rect.top < 85) {
                this.onDragStart(e);
            }
        });

        // Слушатели движения вешаем на window, чтобы шторка не "теряла" палец/курсор при быстрых движениях
        window.addEventListener('pointermove', this.onDragMove.bind(this));
        window.addEventListener('pointerup', this.onDragEnd.bind(this));
        window.addEventListener('pointercancel', this.onDragEnd.bind(this));

        // Раскрытие при фокусе на инпут
        this.searchInput?.addEventListener('focus', () => {
            if (window.innerWidth <= 768) {
                this.sidebar.style.setProperty('transition', 'transform 0.3s ease-in-out', 'important');
                this.open();
            }
        });

        // Клик по карте закрывает шторку
        document.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const clickedInsideExcluded = this.excludeElements.some(el => el.contains(target));

            if (window.innerWidth <= 768 && !this.sidebar.contains(target) && !clickedInsideExcluded) {
                this.sidebar.style.setProperty('transition', 'transform 0.3s ease-in-out', 'important');
                this.close();
            }
        });
    }

    private updateDimensions(): void {
        this.sheetHeight = window.innerHeight * 0.7;
        this.collapsedTranslateY = this.sheetHeight - this.minVisibleHeight;
    }

    private initPosition(): void {
        if (window.innerWidth <= 768) {
            this.sidebar.style.setProperty('transform', `translateY(${this.collapsedTranslateY}px)`, 'important');
        } else {
            this.sidebar.style.removeProperty('transform');
        }
    }

    public open(): void {
        if (window.innerWidth <= 768) {
            this.sidebar.style.setProperty('transform', 'translateY(0)', 'important');
            this.sidebar.classList.add('sidebar--mobile-opened');
        }
    }

    public close(): void {
        if (window.innerWidth <= 768) {
            this.sidebar.style.setProperty('transform', `translateY(${this.collapsedTranslateY}px)`, 'important');
            this.sidebar.classList.remove('sidebar--mobile-opened', 'sidebar--mobile-full');
        }
    }

    // Начало перетаскивания
    private onDragStart(e: PointerEvent): void {
        if (window.innerWidth > 768) return;

        this.isDragging = true;
        this.startY = e.clientY;

        // Захватываем указатель, чтобы события не обрывались за пределами элемента
        (e.target as HTMLElement).setPointerCapture(e.pointerId);

        if (this.sidebar.classList.contains('sidebar--mobile-opened')) {
            this.startTranslateY = 0;
        } else {
            this.startTranslateY = this.collapsedTranslateY;
        }

        // Выключаем анимацию на время перетаскивания (чтобы шторка не "вязла")
        this.sidebar.style.setProperty('transition', 'none', 'important');
    }

    // Процесс движения
    private onDragMove(e: PointerEvent): void {
        if (!this.isDragging || window.innerWidth > 768) return;

        const currentY = e.clientY;
        const deltaY = currentY - this.startY;

        this.currentTranslateY = this.startTranslateY + deltaY;

        // Ограничители (чтобы шторка не улетела в космос или под землю)
        if (this.currentTranslateY < 0) this.currentTranslateY = 0;
        if (this.currentTranslateY > this.collapsedTranslateY) this.currentTranslateY = this.collapsedTranslateY;

        // Двигаем элемент
        this.sidebar.style.setProperty('transform', `translateY(${this.currentTranslateY}px)`, 'important');
    }

    // Окончание перетаскивания
    private onDragEnd(e: PointerEvent): void {
        if (!this.isDragging) return;
        this.isDragging = false;

        // Освобождаем указатель
        try {
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        } catch (err) { }

        // Возвращаем плавную анимацию доводчика
        this.sidebar.style.setProperty('transition', 'transform 0.3s ease-in-out', 'important');

        const threshold = this.collapsedTranslateY / 4; // Четверть пути для триггера

        if (this.startTranslateY === this.collapsedTranslateY) {
            // Тянули снизу вверх
            if (this.currentTranslateY < this.collapsedTranslateY - threshold) {
                this.open();
            } else {
                this.close();
            }
        } else {
            // Тянули сверху вниз
            if (this.currentTranslateY > threshold) {
                this.close();
            } else {
                this.open();
            }
        }
    }
}

//Что это даёт: теперь MobileSheet вообще не содержит строки 
// #toolbar — он просто получает "список элементов, клик по 
// которым не закрывает меня" и ничего не знает о том, что это 
// конкретно тулбар. Захочешь завтра добавить ещё один 
// элемент-исключение (например, выпадающий список результатов поиска) 
// — просто добавишь его в массив при создании, не трогая сам MobileSheet.