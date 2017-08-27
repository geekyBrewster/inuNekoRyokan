$(document).ready(function() {
  console.log('JQ linked');

  //call getPets() on page load to display pet and cust info on DOM
  getPets();

  //click listeners...
  $('#addPet').on('click', '#newPetButton', addPet);
  $('#addOwner').on('click', '#newCustomerButton', addCustomer);
  $('.petTable').on('click', '.deletePetButton', deletePet);
  $('.petTable').on('click', '.updatePetButton', updatePet);
  $('.petTable').on('click', '.checkInOutButton', checkInOut);

});//end Document Ready

// GET owners -- retrieve current owner data from DB to display on DOM
function getOwners() {
  $.ajax({
    type: 'GET',
    url: '/owners',
    success: function(response){
      console.log('Getting owners: ', response);
      // Append owner data to DOM
      displayOwners(response);
    }
  });// end GET
} // end getOwners

//function to display pet info on DOM in table
function displayOwners(ownersFromDB) {
  console.log(ownersFromDB);
  //append info on DOM

}//end displayPets


// GET pets -- retrieve current pet data from DB to display on DOM
function getPets() {
  $.ajax({
    type: 'GET',
    url: '/pets', //pet and owner info from server
    success: function(response) {
      console.log(response); //receive: owner, name, breed, color
      displayPets(response);
    }//end success
  });//end GET
}//end getPets

//function to display pet info on DOM in table
function displayPets(petsFromDB) {
  console.log(petsFromDB);
  //append info on DOM

}//end displayPets


// POST new owner -- function to add new owner to db
function addOwner() {
  var first_name; // equal to vals of input fields in html
  var last_name;
  $.ajax({
    type: 'POST',
    url: '/owners/addOwner',
    data: {
      first_name: first_name,
      last_name: last_name
    },
    success: function(response) {
      console.log('Info sent to server: ', response);
      getOwners();
    }//end success
  });//end POST
}//end addCustomer


// POST new pet -- function to add new pet to db
function addPet() {
  var owner; // equal to vals of input fields in html
  var name;
  var breed;
  var color;
  $.ajax({
    type: 'POST',
    url: '/pets/addPet',
    data: {
      //user input - customer and pet info - owner, name, breed, color
      owner: owner, //concatenate first_name and last_name into single name
      name: name,
      breed: breed,
      color: color
    },
    success: function(response) {
      console.log(response); //message to verify info was sent to server
      getPets();
    }//end success
  });//end POST
}//end addPet

// UPDATE pet info -- function to update edited pet info in db
function updatePet() {
  var id; //set equal to id attached to the update button clicked
  $.ajax({
    type: 'PUT',
    url: '/pets' + id,
    success: function(response) {
      console.log(response); //retrieve updated pet info to display on DOM
      getPets();
    }//end success
  });//end PUT
}//end updatePet


// UPDATE owner info -- function to update edited pet info in db
function updateOwner() {
  var id; //set equal to id attached to the update button clicked
  $.ajax({
    type: 'PUT',
    url: '/owners' + id,
    success: function(response) {
      console.log(response); //retrieve updated pet info to display on DOM
      getOwners();
    }//end success
  });//end PUT
}//end updateOwner


// DELETE pet -- function to delete (only) pet from db (not customer)
function deletePet() {
  var id; //set equal to id attached to the delete button clicked
  $.ajax({
    type: 'DELETE',
    utl: '/pets' + id,
    success: function(response) {
      console.log(response); //message to verify pet info to delete sent to server
      getPets();
    }//end success
  });//end DELETE
}//end deletePet

// DELETE owner -- function to delete (only) pet from db (not customer)
function deleteOwner() {
  var id; //set equal to id attached to the delete button clicked
  $.ajax({
    type: 'DELETE',
    utl: '/owners' + id,
    success: function(response) {
      console.log(response); //message to verify pet info to delete sent to server
      getOwners();
    }//end success
  });//end DELETE
}//end deleteOwner


// Check in / check out button
// AJAX to mark checked in: PUT, url: "/pets/checkIn" + id
// data to send: pet id with the url

var checkInStatus = true;
//function to change check in/ out status of pet in db
function checkInOut() {
  var id; //set equal to id attached to button clicked
  if(checkInStatus) {
    $.ajax ({
      type: 'PUT',
      url: '/pets/checkout' + id,
      success: function(response) {
        console.log(response);
        checkInStatus = false;
      }//end success
    });//end PUT
  } else {
      $.ajax ({
        type: 'PUT',
        url: '/pets/checkin' + id,
        success: function(response) {
          console.log(response);
        }//end success
      });//PUT
    }//end if
}//end checkInOut
