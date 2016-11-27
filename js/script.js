
$(document).ready(function(){

   //This is to remove the validation message if no poster image is present


	var  typedWord;
	var dataAPI = "https://jsonplaceholder.typicode.com/users";

	var data;
	var names = [];
	var k =0;

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

		$("#tagList").append('<li><a class="tag">'+word+'<span id="close">x</span></a></li>');

		k++;

	}

	function removeFromArray (usedName) {

		names = jQuery.grep(names, function(value) {
			return value !== usedName;
		});
	}


	// Remove tag on click 

	  $(".tag").click(function(){
        $(this).hide();
    });




});


	
