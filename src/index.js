import '/src/input.css';
import UI from './js/UI';

const ui = new UI();

document.addEventListener('DOMContentLoaded', ui.loadHomepage.bind(ui));
