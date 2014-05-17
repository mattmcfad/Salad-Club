// console.log('\'Allo \'Allo!');
'use strict';

$(function (){
	var myDataRef = new Firebase('https://boiling-fire-202.firebaseio.com/');
	var auth = new FirebaseSimpleLogin(myDataRef, function(error, user) {
		if (error) {
			// error occurred while attempting login
			alert(error);
		} else if (user) {
			//user authenticated with Firebase
			alert('User ID: ' + user.id + ', Provider:' + user.provider);
		} else {
			//user is logged out
		}
	});

	auth.login('twitter');


	//pull in data
	myDataRef.on('child_added', function(snapshot) {
		var newItem = snapshot.val();
		$('ul').append('<li>' +'<span class=\"name\">'+ newItem.person+ '</span> : ' + newItem.item + '</li>');
	});


	//on form submit
	$('form button').on('click', function(e) {
		e.preventDefault();
		//if both inputs not empty
		if($('input.name').val() !== '' && $('input.item').val() !== '') {
			//get value of input
			console.log('test');
			
			//get input values
			var name = $('input.name').val();
			var item = $('input.item').val();
			console.log('name: '+ name + ' item: ' + item);
			//push to db
			myDataRef.push({person: name, item: item});
			//clear input field
			$('input').val('');
		}
	});

	
});
