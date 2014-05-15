// console.log('\'Allo \'Allo!');
'use strict';

$(function (){
	var myDataRef = new Firebase('https://boiling-fire-202.firebaseio.com/');
	
	//pull in data
	myDataRef.on('child_added', function(snapshot) {
		var newItem = snapshot.val();
		$('ul').append('<li>' + newItem.item + '</li>');
	});


	//on hitting enter
	$('form').on('submit', function(e) {
		e.preventDefault();
		//if input not empty
		if($('input').val() !== '') {
			//get value of input
			var bringingItem = $('input').val();
			//push to db
			myDataRef.push({item: bringingItem});
			//clear input field
			$('input').val('');
		}
	});

	
});
