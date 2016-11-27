
$(document).ready(function(){

   //This is to remove the validation message if no poster image is present


	var  typedWord;
	var dataAPI = "https://jsonplaceholder.typicode.com/users";

	var data;
	var names = [];
	

	// Get data from API and store name property in an array

	$.getJSON(dataAPI, function(json){

		data = json;

		for (var i = 0; i < data.length; i++) {

			names[i] = data[i].name;	  
			
		}


	});


	// Autocomplete for suggestions

	$("#tags").autocomplete({

		source : names

	});

	//Store input call Tagging function

	$("#tags").keyup( function (button) {

		if (button.keyCode==13) {
		
		typedWord = $("#tags").val();
		console.log(typedWord);	

		 tagIt(typedWord);

		 removeFromArray(typedWord);

		$("#tags").val("");	
	}

	});



	function tagIt (word) {

		$("#tagList").append('<li><a class="tag">'+word+'</a></li>');

		// <span id="close">x</span>

	}

	function removeFromArray (usedName) {

		names = jQuery.grep(names, function(value) {
			return value !== usedName;
		});
	}


	// Remove tag on click 

	  $("#btn").click(function(){
        $(".tag").hide();
    });




});


	
