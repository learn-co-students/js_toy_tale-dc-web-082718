const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false
let subBtn = document.querySelector('body > div.container > form > input.submit')
let addToyForm = document.querySelector('body > div.container > form')

// YOUR CODE
document.addEventListener('DOMContentLoaded', function(){

})

fetchAllToys()


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    addToyForm.addEventListener('submit', function(event){
      event.preventDefault()
      let name = document.querySelector('body > div.container > form > input:nth-child(2)').value
      let imgURL = document.querySelector('body > div.container > form > input:nth-child(4)').value
      postToy(name, imgURL)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

function postToy(name, imgURL){

  let body = {
    "name": name,
    "image": imgURL,
    "likes": 0
  }
  fetch('http://localhost:3000/toys', {
  method: "POST",
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(body)
  })
  .then(
    render(body))
    console.log("Posted new toy")
}

function fetchAllToys(){
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => data.forEach(toy => render(toy)))
}

function render(toy){
  let toyCard = document.createElement('div')
  // let toyCard.innerHTML = ""
  toyCard.className = "card"
  toyCard.setAttribute('id', `${toy.id}`)
  toyCard.innerHTML = `<h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar"></img><p id='${toy.id}-likes'>${toy.likes} Likes</p><button class="like-btn">Like</button>`
  toyCollection.appendChild(toyCard)

  // debugger
  let id = `${toy.id}`
  let likes = `${toy.likes}`
  // debugger
  toyCard.querySelector('.like-btn').addEventListener('click', patchLikes)
  function logIt() { console.log('clicked it')}
}

function patchLikes(e){
  // debugger
  let id = parseInt(this.parentElement.querySelector('p').id.split("-")[0])
  let likes = parseInt(this.parentElement.querySelector('p').innerText.split(" ")[0])
  let body = {
    "likes": (likes + 1)
    }
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers:
      {
      "Content-Type": "application/json",
      Accept: "application/json"
      },
    body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(toy => document.getElementById(`${toy.id}-likes`).innerText = `${toy.likes} likes`)
}
