document.addEventListener("DOMContentLoaded", function() {

  fetchAllToys()
})
// YOUR CODE HERE
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    let addToyForm = document.querySelector(".add-toy-form")
    addToyForm.addEventListener('submit', createToy)
  } else {
    toyForm.style.display = 'none'
  }
})

//STEP 2
function fetchAllToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {data.forEach(toy => render(toy))
  })
}

//STEP 3
function render(toy) {
  let toyCollection = document.getElementById("toy-collection")
  toyCollection.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p id= "likes"> ${toy.likes}: Likes </p>
   <button id= ${toy.id} class="like-btn">Like <3</button> </div>
  `
  let likeButtons = document.querySelectorAll(".like-btn")
  likeButtons.forEach(button => {
    button.addEventListener('click', incrementLike)
  })
}


//STEP 4:
function createToy(event){
  event.preventDefault()
  // event listener is a submit - so we have to prevent default
  let name = document.querySelector('#input-name').value
  let image = document.querySelector('#input-image').value

  let data = {
    name: name,
    image: image,
    likes: 0
    }
  fetch('http://localhost:3000/toys', {
    method: "POST",
   headers: {
     "Content-Type": "application/json"
   },
   body: JSON.stringify(data)
 })
 .then(res => res.json())
 .then(data => {render(data)})
}

//STEP 5:
function incrementLike(event) {
  //go through all toys and find the one clicked on
  //increment like count by 1
  // debugger
  let allToys = document.querySelectorAll(".card")
  let clickedToy = Array.from(allToys).filter(function(toy) {
    return toy.querySelector("button").id === event.currentTarget.id
  })
  let id = clickedToy[0].querySelector("button").id
  let likeCount = event.currentTarget.previousElementSibling
  let newLikes = likeCount.innerText = parseInt(likeCount.innerText) + 1
  updateToy(id, newLikes)
}

function updateToy(id, newLikes) {
  console.log(id)
  fetch(`http://localhost:3000/pokemon/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(
      {likes: newLikes}
    ),
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(data => {
      console.log(data)})
}

// OR HERE!
