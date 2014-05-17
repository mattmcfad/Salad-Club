// console.log('\'Allo \'Allo!');
'use strict';

$(function (){
	var myDataRef = new Firebase('https://boiling-fire-202.firebaseio.com/');
	
	//pull in data
	myDataRef.on('child_added', function(snapshot) {
		var newItem = snapshot.val();
		$('ul').append('<li>' +'<span class=\"name\">'+ newItem.person+ '</span> : ' + newItem.item + '</li>');
	});


	//on hitting enter
	$('form button').on('click', function(e) {
		e.preventDefault();
		//if input not empty
		if($('input.item').val() !== '') {
			//get value of input
			console.log('test');
			
			var name = $('input.name').val();
			var item = $('input.item').val();
			console.log('name: '+ name + ' item: ' + item)
			//push to db
			myDataRef.push({person: name, item: item});
			//clear input field
			$('input').val('');
		}
	});

	
});
