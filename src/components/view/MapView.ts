// src/components/view/mapView.ts
import { ensureElement } from '../../utils/utils';

// ПРЕДСТАВЛЕНИЕ — инициализирует карту Яндекса в уже существующем контейнере.
// Сама карта создаёт свою внутреннюю разметку — это код библиотеки, не наш.
export interface IMapView {
    zoomIn(): void;
    zoomOut(): void;
}

export class MapView implements IMapView {
    protected containerElement: HTMLElement;
    protected map: ymaps.Map | null = null;

    constructor(center: [number, number], zoom: number = 16) {
        this.containerElement = ensureElement<HTMLElement>('#map-canvas');

        ymaps.ready(() => {
            this.map = new ymaps.Map(this.containerElement, {
                center: center,
                zoom: zoom,
                controls: [], // свои кнопки зума уже нарисованы в разметке
            });
        });
    }

    zoomIn(): void {
        if (!this.map) return;
        this.map.setZoom(this.map.getZoom() + 1, { duration: 200 });
    }

    zoomOut(): void {
        if (!this.map) return;
        this.map.setZoom(this.map.getZoom() - 1, { duration: 200 });
    }
}