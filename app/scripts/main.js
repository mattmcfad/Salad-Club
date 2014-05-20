// console.log('\'Allo \'Allo!');
'use strict';

$(function (){

	//client side array of inputted data
	var arr = [];

	//Get DB from Firebase
	var myDataRef = new Firebase('https://boiling-fire-202.firebaseio.com/');
	
	//for popup reminding user to login-
	var loggedIn = false;

	//authentication through github login
	var auth = new FirebaseSimpleLogin(myDataRef, function(error, user) {
		if (error) {
			// error occurred while attempting login
			console.log(error);
		//	alert('Error while attempting to login');
		} else if (user) {
			//user authenticated with Firebase
		//	alert('Login Successful!\n' + 'Welcome: ' + user.displayName );
			loggedIn = true;
		} else {
			//user is logged out
		}
	});

	//initiate login through github
	auth.login('github', {
  		rememberMe: true,
  		scope: 'user,gist'
	});	

	//pull in data
	myDataRef.on('child_added', function(snapshot) {
		var newItem = snapshot.val();
		//input entry in client side array
		arr.push({
			name: newItem.person,
			item: newItem.item
		});
		//append each item to the list
		$('ul').append('<li>' +'<span class=\"name\">'+ newItem.person+ '</span> : ' + newItem.item + '</li>');
	});



	//Clicking "Add!" button to add Name and Item
	$('form button').on('click', function(e) {
		
		//ensure user is logged in
		if(loggedIn === false){
			alert('Error: not logged in \n Please login through the Github popup');
		}
		else {
			e.preventDefault();
			//if both inputs not empty
			if($('input.name').val() !== '' && $('input.item').val() !== '') {
				
				//get input values
				var name = $('input.name').val();
				var item = $('input.item').val();
				var alreadyBrought = false;
				//iterate through array of brought items
				for(var i = 0; i < arr.length; i++) {
					//test if item already is being brought
					if(arr[i].item.toLowerCase() === item.toLowerCase()){
						alert(arr[i].name + ' is already bringing ' + arr[i].item  +  ' why don\'t you bring something else?');
						alreadyBrought = true;
					} 
				}

				if (alreadyBrought !== true){
					//push to db
					myDataRef.push({person: name, item: item});
					//push to local array
					arr.push({
						name: name,
						item: item
					});
					//clear input field
					$('input').val('');
				}
				else {
					$('input.item').val('');
				}
			}//if name and input fields not empty
		}//else logged in
	});//form submit
	
	//ERROR NOT LOGGED IN!
	$("#dialog-box-error").dialog({
	    modal: true,
	    draggable: false,
	    resizable: false,
	    position: ['center', 'top'],
	    width: 400,
	    dialogClass: 'ui-dialog-osx',
	    buttons: {
	        "I've read and understand this": function() {
	            $(this).dialog("close");
	        }
	    }
	});//dialog

});//document ready
