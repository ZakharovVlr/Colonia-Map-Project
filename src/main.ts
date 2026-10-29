//src/main.ts
import './style.css';
import { Sidebar } from './components/view/sidebar';
import { LanguageSwitcher } from './components/view/languageSwitcher';
import { Toolbar } from './components/view/Toolbar';
import { EventEmitter } from './components/base/Events';
// ... в самом низу вашего файла src/main.ts:
import { MapView } from './components/view/MapView';

new MapView([55.549211, 37.663124], 16);

// ...

const events = new EventEmitter();
new Toolbar(events);
new Sidebar(events);
new LanguageSwitcher();

//Красим document.body — в презентере
events.on<{ isDark: boolean }>('theme:changed', (data) => {
    document.body.classList.toggle('dark--theme', data.isDark);
});