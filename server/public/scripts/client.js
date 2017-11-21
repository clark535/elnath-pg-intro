console.log('client.js has been loaded');

$(document).ready(function(){
    console.log('jquery has been loaded');
    $.ajax({
        method: 'POST',
        url: '/shoes',
        data: {
            name: 'air jordan',
            cost: '110'
        },
        success: function(response) {
            console.log('response', response);

        }
    })



});