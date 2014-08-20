var sports = null;
var events = null;
var schools = null;
var count_players = 1;

// Loads JSON data
function start(){
  $.getJSON("json/sports.json",function(in_sports) {
    $.getJSON("json/events.json",function(in_events) {
    	$.getJSON("json/schools.json",function(in_schools) {
    		sports = in_sports;
    		events = in_events;
    		schools = in_schools;
  		})
  		.success(function() { 
    		console.log("Loading... sports");
    		update_sports_menu();
    		$(".dropdown-menu").trigger( "click" );
    		console.log("Sports Loaded");
  		}) 
  		.error(function(jqXHR, textStatus, errorThrown) {
    		console.log("error " + textStatus);
    		console.log(errorThrown);
  		});
  	});
  });
}

/* Kicks everything off */
start();

/* This function builds the sports menu dropdown */
function update_sports_menu() {
	//console.log("Updating menu");
	var count = 0;
	$.each(sports['sports'], function() {
		if(sports['sports'][count]['in_season'] == true && sports['sports'][count]['is_visible'] == true) {
			$("#sports-menu").append('<li id=\"' + sports['sports'][count]['id'] + '\" sport-id=\"' + sports['sports'][count]['name'] + '\"><a href=\"#\"><span class=\"sport\">' + sports['sports'][count]['menu_label'] + '</span></a></li>');
		}
		count++; 
	});
} 

/* Event listener for the sports dropdown */
$(".dropdown-menu").on("click", function(event){
    var links = $('li').click(function() {
    	if(typeof $(this).attr('id') != 'undefined') {
    		getEventsBySportId($(this).attr('id'),$(this).attr('sport-id'));
    	}
    });
});

/* Event listener for adding a roster */
$(".list-group").on("click", function(event) {
	$("#events-list").css("display", "none");
	$(".add-player-btn").css("display", "block");
	$(".roster-row").css("display", "block");
});

/* Event listener for adding a player row */
$(".add-player").on("click", function(event) {
	console.log("Clicked on add");
	$("<div class=\"row roster-row\">" + 
		"<div class=\"col-lg-2\">" + 
	  		"<div id=\"home-player[" + count_players + "][number]\" class=\"input-group\"><input type=\"text\" class=\"form-control player-number\" placeholder=\"#\"></div>" + 
	  	"</div>" + 
	  	"<div class=\"col-lg-2\">" + 
	  		"<div id=\"home-player[" + count_players + "]name]\" class=\"input-group\"><input type=\"text\" class=\"form-control player-name\" placeholder=\"Player Name\"></div>" + 
	  	"</div>" +
	  "</div>").appendTo(".roster");
	  count_players++;
	  $(".roster-row").css("display", "block");
});

/* Show events for given sport id */
function getEventsBySportId(in_id,in_name) {
	var count = 0;
	var counted = 0;
	var school_count = 0;
	var event_date = null;
	var home_name = null;
	var home_id = 0;
	var home_mascot = null;
	var home_logo = null;
	var away_name = null;
	var away_id = 0;
	var away_mascot = null;
	var away_logo = null;
	
	$(".list-group").empty(); // Delete the contents every time before updating
	$(".list-group").append('<h4>' + in_name + '</h4>'); // Setup the title for the sport

	$.each(events['events'], function() {
		if(events['events'][count]['sport_id'] == in_id) {
			var file_event_date = events['events'][count]['event_date']['start_time'];
			var temp_date = file_event_date.split("T");
			var temp_time = temp_date[1].replace(":00Z", " ");
			home_id = events['events'][count]['schools'][0]['id'];
			away_id =  events['events'][count]['schools'][1]['id'];
			event_date = temp_date[0] + " " + temp_time;
			
			/* Get the school details */
			$.each(schools['schools'], function() {
				if(typeof schools['schools'][school_count] !== "undefined" && schools['schools'][school_count]['id'] == home_id ) {
					home_name = schools['schools'][school_count]['name'];
					home_mascot = schools['schools'][school_count]['mascot'];
					home_logo = schools['schools'][school_count]['images']['tiny'];
				}
				else if(typeof schools['schools'][school_count] !== "undefined" && schools['schools'][school_count]['id'] == away_id) {
					away_name = schools['schools'][school_count]['name'];
					away_mascot = schools['schools'][school_count]['mascot'];
					away_logo = schools['schools'][school_count]['images']['tiny'];
				}
				school_count++;
			});

	  		$(".list-group").append('<a href=\"#\" class=\"list-group-item\"><span class=\"event-title\">' 
	  			//+ events['events'][count]['title'] + '</span><br/>' 
	  			+ '<span class=\"team-name\"><img src=\"' + home_logo + '\">' + home_name + ' ' + home_mascot + ' vs ' 
	  			+ '<span class=\"team-name\"><img src=\"' + away_logo + '\">' + away_name + ' ' + away_mascot + '<br/>'
	  			+ '<span class=\"event-venue\">' + (events['events'][count]['venue']['name'] == null ? " " : events['events'][count]['venue']['name']) + '</span><br/>' 
	  			+ '<span class=\"event-date-time\">' + event_date + '</span></a>');
	  		counted++;
	  	}
		count++; 
    });
    
    if(counted == 0) {
    	$(".list-group").append('<p>No Events Scheduled</p>');
    }
    $('.list-group').css('display','block');
}