const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection")
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

displayToys()
toyForm.addEventListener("submit",addNewToy)


// OR HERE!

function addNewToy(e) {
  e.preventDefault()
  let name = e.target.name.value
  let image = e.target.image.value
  let toy = {
            "name":name,
            "image":image,
            "likes": 0
            }
  let url = "http://localhost:3000/toys"

  fetch(url, {
    method: "POST",
    body: JSON.stringify(toy),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
  .then(response => response.json())
  .then(toy => renderToy(toy))
}


function displayToys() {
  let url = "http://localhost:3000/toys"
  fetch(url)
  .then(response => response.json())
  .then(function(toys){
    toys.forEach(toy =>renderToy(toy))
  })
}

function renderToy(toy){
  // {id: 1, name: "Woody",
  // image: "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
 // likes: 5}
  let node = document.createElement("div")
  node.classList = 'card'
  node.id = `card-${toy.id}`
  toyCollection.appendChild(node)
  node.innerHTML = `<h2>${toy.name}</h2>
                    <img src="${toy.image}" class="toy-avatar">
                    <p>${toy.likes} Likes <p>
                    <button class="like-btn" data-likes = "${toy.likes}" data-id = "${toy.id}" id = "like-${toy.id}">Like <3</button>`

  document.querySelector(`#like-${toy.id}`).addEventListener("click",likeToy)
}

function likeToy(e) {
  let toyId = e.target.dataset.id
  let likes = e.target.dataset.likes
  let url = `http://localhost:3000/toys/${toyId}`
  let body = {"likes":++likes}
  fetch(url,{
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(body)
  }).then(response => response.json())
  .then(function(toy){
    renderLike(toy)
  })
}

function renderLike(toy){
  let card = document.querySelector(`#card-${toy.id}`)
  card.querySelector("p").innerText = `${toy.likes} Likes`
  card.querySelector("button").dataset.likes = `${toy.likes}`
}
