function itemTemplate(item){
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
    <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
    <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
    </li>`
}

//Initial Page load render
let ourHTML = items.map(function (item){
return itemTemplate(item)
}).join('')

document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML)

//Create Feature
let createField = document.getElementById("create-field")

document.getElementById("create-form").addEventListener("submit", function(e){
e.preventDefault()
axios.post('/create-item', {text: createField.value}).then(function(response){
    
    //Run after the action is complete update HTML
    //Create HTML for new item
  document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
  createField.value=""
  createField.focus()
  //alert("You just crerted")

}).catch(function(){
     console.log("We are currently under construction, please try again later.")
 })
})

document.addEventListener("click", function(e){
    //Delete Feature
    if (e.target.classList.contains("delete-me")){
        if (confirm("Do you really want to delete this item permanently")){
            axios.post('/delete-item', {id: e.target.getAttribute("data-id")}).then(function(){
                //Run after the action is complete update HTML
                e.target.parentElement.parentElement.remove()
            
           }).catch(function(){
                 console.log("We are currently under construction, please try again later.")
             })
        }

    }
    //Update Feature
if (e.target.classList.contains("edit-me")){

  let userInput =  prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
  if (userInput){
   //the if will check if there is a value and will not update to blank
    axios.post('/update-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function(){
        //Run after the action is complete update HTML
        e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
    
   }).catch(function(){
         console.log("We are currently under construction, please try again later.")
     })
  }
}
})