const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
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


// OR HERE!

document.addEventListener('DOMContentLoaded', function(){
  let toyButton = document.getElementById('submit-btn')
  toyButton.addEventListener('click', function(event){
    event.preventDefault()
    let name = document.getElementById('toy-name-input').value
    let imgUrl = document.getElementById('toy-img-input').value
    createNewToy(name, imgUrl)
    document.getElementById('toy-form').reset()
  })
  fetchToys()
})


function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(r => r.json())
    .then(toys => {
      toys.forEach(toy => render(toy))
    })
}

function render(toy) {
  let toySection = document.getElementById('toy-collection')
  let toyCard = document.createElement('div')
  toyCard.classList.add('card')
  toyCard.id = `toy-${toy.id}`
  let toyHeader = document.createElement('h2')
  toyHeader.innerText = `${toy.name}`
  let toyLikes = document.createElement('p')
  toyLikes.id = `toy${toy.id}-likes`
  toyLikes.innerText = `${toy.likes} Likes`
  let toyButton = document.createElement('button')
  toyButton.classList.add('like-btn')
  toyButton.addEventListener('click', function(event){
    debugger
    if (event.target.className === "like-btn") {
     let likeNum = event.target.previousElementSibling
     likeNum.innerText = parseInt(likeNum.innerText) + 1 + " likes"
     likeaToy(parseInt(event.target.id), parseInt(likeNum.innerText))
   }
  })
  toyButton.innerText = `like <3`
  let toyImg = document.createElement('img')
  toyImg.classList.add('toy-avatar')
  toyImg.src = `${toy.image}`
  toyCard.appendChild(toyHeader)
  toyCard.appendChild(toyLikes)
  toyCard.appendChild(toyButton)
  toyCard.appendChild(toyImg)
  toySection.appendChild(toyCard)
}


function createNewToy(name, imgUrl) {
  let data = {name: name, image: imgUrl, likes: 0}
  fetch('http://localhost:3000/toys',{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  }).then(r => r.json())
  .then(data => {
    render(data)
  })
}

function likeaToy(id, likes) {
  fetch(`http://localhost:3000/toys/${id}`), {
    method: "PATCH",
    headers:{
      "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({
      likes: likes
    }).then(r => r.json())
    .then(data =>{
      console.log(data);
    })
  }
}
