var socket = io();

function scrollToBottom() {
    var element = document.getElementById('messages');
    element.scrollTop = element.scrollHeight - element.clientHeight;
}

socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            jQuery('#room-name').text(params.room);
            console.log('Sb Thik hai');
        }
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from Server');
});

socket.on('updateUserList', function(users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        createdAt: formattedTime,
        from: message.from,
        url: message.url
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Not Supported');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Location Unavailable');
    });
});