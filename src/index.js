const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const createButton = document.querySelectorAll('input')[2]
let addToy = false


// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function(){
  addToyButtonListener();
  fetchToys();
  addCreateToyButtonListener();

})

function fetchToys(){
  return fetch("http://localhost:3000/toys").then(res => res.json()).then(data => {
    data.forEach(toy =>
      {
      renderToy(toy)
      })
  })
}

function renderToy(toy){
  let newToyDiv = document.createElement('div');
  newToyDiv.classList.add("card");

  let container = document.getElementById('toy-collection');
  container.appendChild(newToyDiv);

  let h2 = document.createElement('h2');
  h2.innerText = toy.name;
  h2.id = toy.id
  newToyDiv.appendChild(h2);

// debugger
  let pic = document.createElement('img');
  pic.src= `${toy.image}`
  pic.classList.add("toy-avatar")
  newToyDiv.appendChild(pic)

  let p = document.createElement('p');
  if (toy.likes !== 1){
    p.innerText = `${toy.likes} Likes`;
  } else {
    p.innerText = `${toy.likes} Like`;
  };
  newToyDiv.appendChild(p);

  let button = document.createElement('button');
  button.innerText = "Like";
  button.classList.add("like-btn");
  button.addEventListener("click", likeToy);
  newToyDiv.appendChild(button);

}

function likeToy(e){
  patchLike(e);
}

function patchLike(e){
  let id = parseInt(e.currentTarget.parentElement.querySelector('h2').id)
  let newLikesNum = parseInt(e.currentTarget.parentElement.querySelector('p').innerText.split(" ")[0])+1

  fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body:
      JSON.stringify({likes: newLikesNum})
  }).then(res => res.json()).then(toy => {
    renderSingleToy(toy)
      }
    )
}

////// still need to do step 4 and 5 ////

function renderSingleToy(toy){
  let id = toy.id
  let likes = toy.likes
  document.getElementById(`${id}`).parentElement.querySelector('p').innerText = `${likes} Likes`
}




function addToyButtonListener(){
  addBtn.addEventListener('click', hideSeek)}
    // hide & seek with the form

function hideSeek(){
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
}



function addCreateToyButtonListener(){
  toyForm.addEventListener('submit', addToyFunc)
}

function addToyFunc(e){
    e.preventDefault();

    let name = e.target.children[1].value
    let src = e.target.children[3].value

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:
      JSON.stringify({
        "name": name,
       "image": src,
       "likes": 0
     })
   }).then(res => res.json()).then(data => renderToy(data)
   )

   document.querySelector('.add-toy-form').reset()

   hideSeek();
  }





// OR HERE!
