
$(document).ready(function(){

   //This is to remove the validation message if no poster image is present


	var  typedWord;
	var dataAPI = "https://jsonplaceholder.typicode.com/users";

	var data;
	var names = [];
	var words = new trie();
	

	// Get data from API and store name property in an array

	$.getJSON(dataAPI, function(json){

		data = json;

		for (var i = 0; i < data.length; i++) {


			 names.push(data[i].name);
			 
			 words.trieInsert(data[i].name, 0);

			
		}

	});

	$("#tags").keyup ( function (button){

		if (button.keyCode!=13 && button.keyCode!=38 && button.keyCode!=40){
			typedWord = $("#tags").val();

			$("#dataList").empty();

			var list = [];
			list = words.trieSearch(typedWord,0);

			for(var i=0; i<list.length; i++) {

			 $("#dataList").append("<option value=\'" + typedWord+list[i] + "\'>");
		
			}

		}
	});



	//Store input call Tagging function

	$("#tags").keyup( function (button) {

		if (button.keyCode==13) {
		
		 typedWord = $("#tags").val();

		 tagIt(typedWord);
		 $("#dataList").empty();
		 var indx = names.indexOf(typedWord);
		 if (indx > -1){
		 	names.splice(indx,1);
		 }
		 words = new trie();
		 for(var j=0; j<names.length; j++) {
		 	words.trieInsert(names[j],0);
		 }

		$("#tags").val("");	
	}

	});



	function tagIt (word) {

		$("#tagList").append('<li><a class="tag">'+word+'<span id="close" class="glyphicon glyphicon-remove"></span></a></li>');

	}

	


	// Remove tag on click

	$(document).on("click",".tag", function()   { 

		var val = this.textContent;
		words.trieInsert(val,0);
		names.push(val);
		words = new trie();
		for(var j=0; j<names.length; j++) {
		 	words.trieInsert(names[j],0);
		}

		$(this).hide();

	});

	//Hide all on clear

	$("#btn").click(function(){
        $(".tag").hide();

    });






});


	
