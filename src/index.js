/* eslint no-restricted-syntax: 0, arrow-parens: 0 */
import './index.css';
import { count } from 'rxjs/operators';

const urlApi = 'https://5ac1f9a6cb6ba3001425789c.mockapi.io/cat/catImages';
const catList = document.querySelector('aside.cat-list');
const catWrapper = document.querySelector('main.cat-wrapper');
const createNode = element => document.createElement(element);
const createTextNode = text => document.createTextNode(text);
const appendElement = (parent, elem) => parent.appendChild(elem);
const catStates = [];

document.addEventListener('DOMContentLoaded', () => {

  // fetch the data
  const fetchData = (url) => {
    fetch(url)
      .then(response => (
        response.json()
      ))
      .then(jsonData => {
        for (const data of jsonData) {
          const image = createNode('img');
          image.src = data.imageUrl;
          // check where cat index located for the img.alt attribute
          const catIndex = data.imageUrl.indexOf('cat');
          image.alt = data.imageUrl.substring(catIndex, catIndex + 5);

          const catObj = {
            name: data.name,
            image,
            likes: 0,
          };
          catStates.push(catObj);

          const div = createNode('div');
          const p = createNode('p');
          const catText = createTextNode(data.name);
          div.className = 'cat-list-item';
          appendElement(p, catText);
          appendElement(div, p);
          appendElement(catList, div);
        }

        // return [catImages, catNames];
        return catStates;
      })
      .then(states => {
        const catChildren = catList.children;

        const showImage = (element, name, likes) => {
          if (catWrapper.childNodes) {
            catWrapper.innerHTML = '';
          }
          const h2 = createNode('h2');
          const catText = createTextNode(name);
          const p = createNode('p');
          const likeText = createTextNode('likes: ');
          const countLike = createTextNode(likes);
          const span = createNode('span');
          span.className = 'cat-likes';
          appendElement(p, likeText);
          appendElement(span, countLike);
          appendElement(p, span);
          appendElement(h2, catText);
          appendElement(catWrapper, h2);
          appendElement(catWrapper, element);
          appendElement(catWrapper, p);
        };



        // process the click event
        for (let i = 0; i < catChildren.length; i += 1) {
          catChildren[i].addEventListener('click', () => { showImage(states[i].image, states[i].name, states[i].likes); });
        }
        for (const state of states) {
          state.image.addEventListener('click', () => {
            console.log(state.image);
            state.likes += 1;
            showImage(state.image, state.name, state.likes);
          });
        }
      });
  };

  fetchData(urlApi);


  // const incrementlikeBox = document.querySelector('span.incrementlike');
  // const images = document.querySelectorAll('.cat-image');
  // const catImages = document.querySelectorAll('.cat-image > img');
  // const catNames = ['John', 'Herald'];

  // let counterClick = 0;

  // const addIncrementlike = () => {
  //   counterClick += 1;
  //   incrementlikeBox.removeChild(incrementlikeBox.childNodes[0]);
  //   incrementlikeBox.appendChild(document.createTextNode(counterClick));
  // };

  // for (let i = 0; i < images.length; i += 1) {
  //   const catNameElement = document.createElement('p').appendChild(document.createTextNode(catNames[i]));
  //   images[i].appendChild(catNameElement);
  // }

  // for (const image of catImages) {
  //   // add name above the cat

  //   // increase counter per clicked cat images
  //   image.addEventListener('click', addIncrementlike);
  // }

  // Array.prototype.forEach.call(image, () => {
  //   this.addEventListener('click', () => {
  //     counterClick += 1;
  //     incrementlikeBox.removeChild(incrementlikeBox.childNodes[0]);
  //     incrementlikeBox.appendChild(document.createTextNode(counterClick));
  //   });
  // });
});
