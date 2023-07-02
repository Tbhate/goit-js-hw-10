import {fetchBreed,fetchCatByBreed} from "./js/services/cat-api";

const catSelector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfOutput = document.querySelector('.cat-info');

const hideEl = (e) =>e.style.display = 'none'; 
const showElBlock = (e) => e.style.display = 'block';
const showElFlex= (e) => e.style.display = 'flex';
const onChoose = (event) => {
    hideEl(catInfOutput);
    showElBlock(loader);
    fetchCatByBreed(event.target.value)
        .then(data => makeMarkup(data))
        .catch(err => {
            console.warn(err); hideEl(loader);showElBlock(error)
        })
        .finally(()=>{hideEl(loader);showElFlex(catInfOutput)});

};

function makeOptions(el) {
    const markup = el.map(breed => {return `<option value="${breed.id}">${breed.name}</option>`});
    catSelector.innerHTML = markup;
};
function makeMarkup(cat) {
  const url = cat[0].url;
  const { name, temperament, description } = cat[0].breeds[0];
  const markup = `<img width='300' src='${url}'/><div class='description'>
    <h1 class='name'>${name}</h1><p class='desc'>${description}</p>
    <p class='temperament'><b>Temperament: </b>${temperament}</p></div>`;
  catInfOutput.innerHTML = markup;
}

hideEl(catSelector);
hideEl(error);
catSelector.addEventListener("change", onChoose);
    fetchBreed()
    .then(res => makeOptions(res))
    .finally(()=>{showElFlex(catSelector), hideEl(loader)})
    .catch(err => { console.log(err); showElBlock(error); hideEl(catSelector) });