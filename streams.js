chatStream = new Meteor.Stream('chat');

if (Meteor.isClient) {
	display = function(message, who)
	{
		_t = document.getElementById('timeline');
		_t.innerHTML += '<dt><big>' + (who ? who : 'them') + ': <strong>' + message + '</strong></big></dt><dd><em><small>' + (new Date()).toLocaleDateString('en-gb', {weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"}) + '</small></em></dd>';
		document.body.scrollTop = document.body.scrollHeight;
	};
	sendChat = function(event) {
		message = event.target.value;
		event.target.value = '';
		chatStream.emit('message', message);
		display(message, 'me');
	};
	chatStream.on('message', display);
}
