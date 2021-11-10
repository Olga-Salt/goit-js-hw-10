import './css/styles.css';
import debounce from 'lodash.debounce';
import SEARCH from './js/fetchCountries.js';
import { Notify } from 'notiflix';
import oneCountryTpl from './js/one-country-tpl.hbs';
import allCountriesTpl from './js/all-countries.hbs';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const coutryListRef = document.querySelector('.country-list');
// const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  SEARCH.fetchCountries(inputRef.value.trim()).then(renderCoutryList).catch(onFetchError);
}

function renderCoutryList(country) {
  if (country.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  //   if (inputRef.value === '') {
  //     coutryListRef.innerHTML = '';
  //   }

  if (country.length === 1) {
    return oneCountryMurkup(country);
  } else {
    return manyCountries(country);
  }
  //   if (country.length > 2 && country.length < 10) {
  //     return manyCountries(country);
  //   }
}

function oneCountryMurkup(country) {
  //   const lang = Object.values(country[0].languages);
  //   console.log(lang);

  //   coutryListRef.innerHTML = country
  //     .map(
  //       country => `<li><img src="${country.flags.svg}" width = 40px alt="${country.name}">
  //           <li>capital: ${country.capital}</li>
  //           <li>population: ${country.population}</li>
  //           <li>Languages: ${lang} </li>
  //           </ul>
  //         </li>`,
  //     )
  //     .join('');
  const countryMurkup = oneCountryTpl(country);
  coutryListRef.innerHTML = countryMurkup;
}

function manyCountries(country) {
  coutryListRef.innerHTML = allCountriesTpl(country);
  //   coutryListRef.innerHTML = country
  //     .map(
  //       country => `<li><img src="${country.flags.svg}" width = 40px alt="${country.name}">
  //               <p><b>Name</b>: ${country.name.official}</p>
  //             </li>`,
  //     )
  //     .join('');
}
function onFetchError(error) {
  console.log(error);
  Notify.failure('Oops, there is no country with that name');
  if (inputRef.value === '') {
    coutryListRef.innerHTML = '';
  }
}
