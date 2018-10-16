document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(json => {
      init(json);
    });
})

// VARIABLES

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false

// INIT

const init = (json) => {
  addAllToys(json);
}

// FUNCTIONS

const addAllToys = (json) => {
  json.forEach(toy => createToy(toy));
}

const createToy = (toy) => {

  let card = document.createElement('div');
  card.classList.add('card');
  let name = document.createElement('h2');
  name.innerText = toy.name;
  let image = document.createElement('img');
  image.src = toy.image;
  image.classList.add('toy-avatar');
  let likes = document.createElement('p');
  likes.innerText = toy.likes;
  let likeButton = document.createElement('button');
  likeButton.classList.add('like-btn');
  likeButton.innerText = "Like 👍"
  let id = toy.id

  likeButton.addEventListener('click', function(e) {
    let newLikes = (parseInt(likes.innerText) + 1);
    let data = {"likes": newLikes}

    fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
    })

    likes.innerText = newLikes;

  })

  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(likes);
  card.appendChild(likeButton);

  toyCollection.appendChild(card);

}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    addSubmitListener();
  } else {
    toyForm.style.display = 'none'
  }
})

const addSubmitListener = () => {
  let submit = document.querySelector('body > div.container > form > input.submit');
  submit.addEventListener('click', submitNewToy)
}

const submitNewToy = (e) => {
  e.preventDefault();
  let nameField = document.querySelector('body > div.container > form > input:nth-child(2)').value
  let imageField = document.querySelector('body > div.container > form > input:nth-child(4)').value

  data = {name: nameField, image: imageField, likes: 0}

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => console.log(json))

  createToy(data)

}
