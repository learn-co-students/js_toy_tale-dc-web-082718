const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE


document.addEventListener("DOMContentLoaded",function(){

    fetchToys();
    addNewToyListener();


})

// On the index.html page, there is a div with the id "toy-collection"
//
// When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.

function renderToy(toy){
    let list = document.getElementById("toy-collection");

    let card = document.createElement("div");
    card.className = "card";

    let name = document.createElement("h2");
    name.innerHTML = toy.name;

    let img = document.createElement("img");
    img.className = "toy-avatar";
    img.setAttribute("src",toy.image);

    let likes = document.createElement("p");
    likes.id = `${toy.id}-likes`;
    likes.innerHTML = `Likes: ${toy.likes}`;

    let button = document.createElement("button");
    button.className = "like-btn";
    button.innerHTML = "Like <3";
    button.dataset.likes = toy.likes;
    button.dataset.id = toy.id;
    //add data for number of likes so i dont have to fetch the current number of likes and also be safe?

    card.appendChild(name);
    card.appendChild(img);
    card.appendChild(likes);
    card.appendChild(button);
    list.appendChild(card);



    //this is async so dom may not be loaded
    //so put this here after adding to dom
    button.addEventListener("click",function(e){

        data = {likes: (parseInt(e.target.dataset.likes)+1)}
        fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then((json) => {
            alert(`You liked ${json.name}!`);
            document.getElementById(`${e.target.dataset.id}-likes`).innerHTML =
            `Likes: ${json.likes}`;
            e.target.dataset.likes = parseInt(e.target.dataset.likes)+1;
        })
    });

}

function renderToys(toys){
    // toys.forEach(function(toy){
    //     console.log(toy);
    // })

    // let list = document.getElementById("toy-collection");

    toys.forEach(function(toy){
        renderToy(toy);
    });

}


function fetchToys(){


    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(json => renderToys(json))



}

function fetchAddToy(event){

    //name entered
    let name = event.target.name.value
    //image link entered
    let url = event.target.image.value

    if(name && url){
        let data = {name: name, image: url, likes: 0}
        fetch("http://localhost:3000/toys", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then((json) => {
            renderToy(json)
            alert("Added Toy!");
        })



    }
    else{
        alert("Please enter both a name and url!");
    }
}


function addNewToyListener(){

    let form = document.querySelector(".add-toy-form");
    form.addEventListener("submit",function(e){
        e.preventDefault();
        fetchAddToy(e);
    })


}

function fetchAddLike(event){

    console.log(event);

}







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
