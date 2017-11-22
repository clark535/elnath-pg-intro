console.log('client.js has been loaded');

$(document).ready(function(){
    console.log('jquery has been loaded');
    $('#addNewAirs').on('click', addNewAirJordans);
    $('#shoeList').on('click', '.deleteButton', removeShoe);
    $('#shoeList').on('click', '.saveButton', editShoe);

    getAllShoes();
});

function addNewAirJordans(){
    $.ajax({
        method: 'POST',
        url: '/shoes',
        data: {
            name: 'air jordan',
            cost: '110'
        },
        success: function(response) {
            console.log('response', response);
            getAllShoes();

        }
    })
};

function getAllShoes() {
    $.ajax({
        method: 'GET',
        url: '/shoes',
        success: function(response) {
            console.log('respnse', response);
            $('#shoeList').empty();
            for (var i = 0; i < response.length; i++) {
                var shoe = response[i];
                var $newShoeItem = $('<li>' + shoe.name + '</li>')

                //create  and append save button
                var $saveShoeButton = $('<button class="saveButton">Save</button>');
                $saveShoeButton.data('id', shoe.id);
                $newShoeItem.append($saveShoeButton);

                //create and append delete button
                var $deleteShoeButton = $('<button class="deleteButton">Delete</button>');
                $deleteShoeButton.data('id', shoe.id);
                $newShoeItem.append($deleteShoeButton);

                //append the new list item to the DOM
                $('#shoeList').append($newShoeItem);
            }
            
                
        }
        
    })
};

function removeShoe() {
    console.log($(this).data());
    var shoeIdToRemove = $(this).data().id;
    console.log('remove shoe was clicked. The shoe id was', shoeIdToRemove);

    $.ajax({
        method: 'DELETE',
        url: '/shoes/' + shoeIdToRemove,
        success: function() {
            getAllShoes();
        }
    });
}

function editShoe() {
    console.log($(this).data());//should log {id: '7'} or whatever the id is.
    var shoeIdToSave = $(this).data().id;
    var shoeNameToSave = $(this).data().name;
    console.log('save shoe was clicked. The shoe id was', shoeIdToSave, shoeNameToSave);

    $.ajax({
        method: 'PUT',
        url: '/shoes/' + shoeIdToSave + shoeNameToSave,
        data: {
            name: 'Moon Boots'
        },
        success: function(response) {
            getAllShoes();
        }
    })
    
}
