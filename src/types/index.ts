// src/types/index.ts

// Доменная сущность — объект на карте
export interface IMapObject {
    id: number;
    title: string;
    subtitle: string;
    coords: [number, number];
}

// Доменная сущность — данные о погоде
export interface IWeather {
    city: string;
    icon: string;
    temp: number;
}



