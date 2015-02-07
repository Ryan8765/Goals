$(document).ready(function() {
	//local storage variables
	var daily;
	var monthly;
	var yearly;
	//variable for storage function. checks if user has been alerted
	var alerted = "no";
	//when trashcan clicked send 'this' to this variable to use on "yes" click of .popupBackground below
	var $thisTrash;

	//function for saving content to localStorage
	var storage = function () {
		//check for storage support in browser, if none alert user once.
		if(typeof(Storage) !== "undefined") {
    		// Code for localStorage/sessionStorage.
    		daily = $('#dailyContent ul').html();
    		monthly = $('#monthlyContent ul').html();
    		yearly = $('#yearlyContent ul').html();
    		localStorage.setItem("daily", daily);
    		localStorage.setItem("monthly", monthly);
    		localStorage.setItem("yearly", yearly);
		} else {
			//only alert user once
			if(alerted == "no") {
    			alert("Your browser doesn't support local storage.  All informatoin will be lost on page refresh.");
    			alerted = "yes";
    		}//end if
		}//end if
	};//end storage function

	//function for loading content on page load from local storage
	var loadLocalStorage = function() {
		var dailyHTML = localStorage.daily;
    	var monthlyHTML = localStorage.monthly;
    	var yearlyHTML = localStorage.yearly;
    	$('#dailyContent ul').html(dailyHTML);
    	$('#monthlyContent ul').html(monthlyHTML);
		$('#yearlyContent ul').html(yearlyHTML);
	};//end loadLocalStorage function

	



	$('nav div').on('click', function() {
		//link clicked on id
		var id = "#";
		var navId = $(this);
		id += $(this).attr("id");
		//add "content" to locate div in question to show...ex - "monthlyContent"
		id += "Content";
		//jquery selector for id
		var contentNode = $(id);
		//if you click a link that is not shown continue otherwise do nothing
		if (contentNode.css('display') == 'none') {
			//hide content
			$('#dailyContent, #monthlyContent, #yearlyContent').hide();
			contentNode.fadeIn('500');
			//change z-index so tab comes to front
			$('#daily, #monthly, #yearly').css('z-index', '0');
			navId.css('z-index', '100');
		}//end if
	});//end onclick

	//function to add list items to each time frame
	var addListItemsImage = function($this) {
		var htmlToAdd;
		var inputValue;
		inputValue = $this.prev().val();
		console.log(inputValue);
		htmlToAdd = "<li>";
		htmlToAdd += inputValue;
		htmlToAdd +="<img class='xout' src='images/xout.gif'></li>";
		htmlToAdd = $(htmlToAdd);
		$this.parent().next().find('ul').append(htmlToAdd);
		$this.prev().val('');
	};

	var addLiItemsKey = function($this) {
			var htmlToAdd;
			var inputValue;
			inputValue = $this.val();
			console.log(inputValue);
			htmlToAdd = "<li>";
			htmlToAdd += inputValue;
			htmlToAdd +="<img class='xout' src='images/xout.gif'></li>";
			htmlToAdd = $(htmlToAdd);
			$this.parent().next().find('ul').append(htmlToAdd);
			$this.val("");
	};

	//add list items to each time frame
	$('.enter').on('click', function() {
		var $this = $(this);
		if($this.prev().val() == "" || $this.prev().val().trim().length == 0) {
			alert("Please enter a value");
		} else {
			addListItemsImage($this);
			//run storage function for local storage
			storage();
		}//end if
	});
	
	//function to add list items enter
	$('input').on('keypress', function(e){
		var $this = $(this);
		//if key is the enter button then add list item
		if (e.keyCode == 13) {
			if($this.val() == "" || $this.val().trim().length == 0) {
				alert("Please enter a value");
			} else {
				addLiItemsKey($this);
				//local storage function
				storage();
			}//end if
		}//end if
	});

	//remove li on click
	$('body').on('click', '.xout', function() {
		$(this).parent().remove();
		//local storage function
		storage();
	});

	//append li to bottom of list on click and change class and vice versa
	$('body').on('click','li', function() {
		var $this = $(this);
		var text = $this.text();
		var node = "<li>";
		node += text;
		node += "<img class='xout' src='images/xout.gif'></li>";
		var $node = $(node);
		if ($this.hasClass('checkedItem')) {
			$this.parent().prepend($node);
			$this.remove();
		} else {
			console.log($node);
			$node.addClass('checkedItem');
			$this.parent().append($node);
			$this.remove();
		}
		//run local storage object
		storage();
	});

	//show popup when trash can is clicked
	$(".trash").on('click',function(){
		var popupNode = $('<div class="popupBackground" id="popup1"><div class="container"><p>Are you sure you want to delete all data for this time frame?</p><div class="outerContainer"><button id="yes">Yes</button><button id="no">No</button></div></div></div>');
		$('body').append(popupNode);
		$thisTrash = $(this);
	});

	//hide popup if no button is clicked
	$('body').on('click','#no', function() {
		$('.popupBackground').remove();
	});
});