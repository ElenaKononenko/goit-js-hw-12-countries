import './styles.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import { debounce } from 'debounce';
import fetchCountries from './js/fetchCountries';
import refs from './js/refs';
import templates from './templates/tempList.hbs';
import temp from './templates/temp.hbs';

import { alert, Stack } from '@pnotify/core';

const { query, list, notify } = refs;
const myStack = new Stack({
  dir1: 'down',
  dir2: 'left',
  firstpos1: 25,
  firstpos2: 25,
  spacing1: 36,
  spacing2: 36,
  push: 'bottom',
  context: notify,
});

function onSearch() {
  list.innerHTML = '';
  fetchCountries(query.value, list, displayResult);
}

query.addEventListener('input', debounce(onSearch, 500));

function displayResult(data, place) {
  if (data.length === 1) {
    const item = temp(data);
    return place.insertAdjacentHTML('beforeend', item);
  }
  if (data.length <= 10) {
    const items = templates(data.map(el => el.name));
    return place.insertAdjacentHTML('beforeend', items);
  }
  if (!data.length) {
    alert({
      text: 'Нет совпадений',
      type: 'info',
      sticker: false,
      closer: false,
      delay: 500,
      animation: 'fade',
      stack: myStack,
    });
  }

  if (data.length > 10) {
    alert({
      text: 'Необходимо сделать запрос более специфичным',
      type: 'error',
      sticker: false,
      closer: false,
      delay: 500,
      animation: 'fade',
      stack: myStack,
    });
  }
}
