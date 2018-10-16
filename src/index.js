const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function(){
  fetchToys()
  createToy()
})

function fetchToys(){
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(json => {
      json.forEach(toy => render(toy))
    })
}

function render(toy){
  let divElement = document.createElement("div")
  divElement.classList.add(`card`)
  divElement.id = `card-${toy.id}`
  divElement.innerHTML =
    `<h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes} Likes <p>
    <button id="${toy.id}-like-btn">Like <3</button>`
  document.querySelector("#toy-collection").appendChild(divElement)

  likeListener(toy)
}

function likeListener(toy){
  document.getElementById(`${toy.id}-like-btn`).addEventListener("click", function(){
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({likes: parseInt(`${toy.likes + 1}`)})
    }).then(response => response.json())
      .then(json => updateCard(json))
  })
}

function updateCard(json){
  let card = document.querySelector(`#card-${json.id}`)
  card.innerHTML =
    `<h2>${json.name}</h2>
    <img src="${json.image}" class="toy-avatar">
    <p>${json.likes} Likes <p>
    <button id="${json.id}-like-btn">Like <3</button>`

  likeListener(json)
}


function createToy(){
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      document.querySelector(".add-toy-form").addEventListener("submit", function(event){
        let name = document.querySelectorAll(".input-text")[0].value
        let url = document.querySelectorAll(".input-text")[1].value

        postToy(name, url)
        event.preventDefault()
        event.currentTarget.reset()
      })

    } else {
      toyForm.style.display = 'none'
    }
  })
}

function postToy(name, url){
  let data = {name: name, image: url, likes: 0}

  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then(json => render(json))
}
