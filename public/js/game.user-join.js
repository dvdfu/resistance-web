
var $userList = document.getElementById('list-users');
var $nameField = document.getElementById('input-name');
var $startButton = document.getElementById('btn-start');

$nameField.onkeypress = function(e) {
	if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
    	submitName($nameField.value);
    }

    function submitName(name) {
		var nameTaken = false;
		users.forEach(function (user) {
			if (name == user.name) nameTaken = true;
		});

		if (name.length > 1 && !nameTaken){
			me.name = name;
			socket.emit('add user', name);
			$nameField.disabled = true;
		}
	}
}

$startButton.onclick = function() {
	socket.emit('request role');
	$startButton.disabled = true;
};

socket.on('users joined', function (_users) {
	_users.forEach(function (user) {
		users.push(user);

		var $li = document.createElement('li');
		$li.className = 'list-group-item user';
		$li.innerHTML = user.name;
		$li.click(function() {

		});
		$userList.appendChild($li);
	});
	$startButton.disabled = users.length < 5;
});