const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let allToys = [];

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded',
  function()
  {
    fetchToys();
    addCreateNewToyListener();
  });

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

function fetchToys()
{
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
      .then(
        data =>
        {
          console.log(data);
          allToys = data;
          addAllToyCards();
        }
      );
}

function addAllToyCards()
{
  let parentDiv = document.getElementById('toy-collection');
  allToys.forEach(function(object)
  {

    let childDiv = document.createElement('div');
    childDiv.classList.add('card');
    // let h2Tag = document.createElement('h2');
    // let pTag = document.createElement('p');
    // let btnTag = document.createElement('btn');
    //
    // h2Tag.innerT
    //
    // childDiv.appendChild(h2Tag);
    // childDiv.appendChild(pTag);
    // childDiv.appendChild(btnTag);
    let imageUrl = object['image'];
    let id = object['id'];
    //debugger;
    childDiv.id = object['id'];
    childDiv.innerHTML = `<h2>${object['name']}</h2>
    <img src= ${imageUrl} class="toy-avatar">
    <p>${object['likes']} Likes <p>
    <button id= ${id} class="like-btn">Like <3</button>`;
    childDiv.addEventListener('click', addIncreaseLikesListener);
    parentDiv.appendChild(childDiv);
  });
}

function addCreateNewToyListener()
{
  document.getElementById('create-new-toy').addEventListener('click', function(){
      event.preventDefault();
      let newToy =
      {
        name: document.getElementById('new-toy-name').value,
        image: document.getElementById('new-toy-image').value,
        likes: '0'
      };
      debugger;
      fetch('http://localhost:3000/toys',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newToy)
      })
        .then(response => response.json)
          .then(data =>
            {
              render(data);
            })
    });
}

function render(newToy)
{
  console.log(newToy);
}

// function addIncreaseLikesListeners()
// {
//   let likeBtnElements = document.querySelectorAll('.like-btn');
//   debugger;
//   likeBtnElements.forEach(el => el.addEventListener('click', addIncreaseLikesListener));
// }

function addIncreaseLikesListener(event)
{

  console.log(event.target.id);
}
