var event_results_table;
var current_event;

//Initial load/setup
function readyUI(){
	event_results_table = $('#event_results_table').DataTable({
	    "columns": [
		{ "width": "15%" },
		{ "width": "70%" },
		{ "width": "15%" }
	  ]
	});
	populateTeamSelect();
	$("#home_breadcrumb").click(function() {
		changeView('event');
	});
	$("#stubhub_login_button").click(function() {
		var password = $( "#stubhub_pw" ).val();
		getStubhubUserToken(stubhub_auth_token, user_email_address, password);
	});
	$("#search_events_button").click(function() {
		clearEventResults();
		var team_select_id = $("#team_select").children(":selected").attr("id");
		var team_id = team_select_id.substring(5, team_select_id.length);
		getEvents(team_id);
	});
	$("#search_tickets_button").click(function() {
		clearTicketResults();
		var filters = {};
		if($("#price_min").val() != undefined){
			filters.price_min = $("#price_min").val();
		}
		if($("#price_max").val() != undefined){
			filters.price_max = $("#price_max").val();
		}
		if($("#section_select").val() != undefined){
			filters.section = $("#section_select").val();
		}
		if($("#row_select").val() != undefined){
			filters.row = $("#row_select").val();
		}
		filterTickets(filters);
	});
	$("#clear_tickets_filters_button").click(function() {
		changeView('ticket');
	});
}

//Switch from one view to another
//Views: Login View, Event View, Ticket View
function changeView(view){
	if(view == 'login'){
		hideStubhubEventSearch();
		hideStubhubTicketSearch();
		showStubhubLogin();
	}
	if(view == 'event'){
		hideStubhubLogin();
		hideStubhubTicketSearch();
		showStubhubEventSearch();
		$("#home_breadcrumb").siblings().remove();
		clearSeatingChart();
	}
	if(view == 'ticket'){
		hideStubhubEventSearch();
		hideStubhubLogin();
		getTickets(current_event.id);
		showEventBreadcrumb();
		loadSeatingChart();
		showStubhubTicketSearch();
	}
	if(view == 'buy'){
		showBuyModal();
	}
}

function populateTeamSelect(){
	var teams_html = "";
	$.each(teams, function() {
	  teams_html += "<option id='team_" + this.id + "'>" + this.name + "</option>";
	});
	$("#team_select").append(teams_html);
}

//Visibility Functions
function hideStubhubLogin(){
	$("#stubhub_login").hide();
}

function showStubhubLogin(){
	$("#stubhub_login").show();
}

function hideStubhubEventSearch(){
	$("#stubhub_event_search").addClass('hidden');
}

function showStubhubEventSearch(){
	$("#stubhub_event_search").removeClass('hidden');
}

function clearEventResults(){
	event_results_table.clear();
	event_results_table.draw();
}

function hideStubhubTicketSearch(){
	$("#stubhub_ticket_search").addClass('hidden');;
}

function showStubhubTicketSearch(){
	$("#stubhub_ticket_search").removeClass('hidden');
}

function clearTicketResults(){
	$("#ticket_results_rows").empty();
}

function hideBuyModal(){
	$('#buy_modal').modal('hide');
}

function showBuyModal(){
	$('#buy_modal').modal('show');
}

function showEventBreadcrumb(){
	if(!$("#event_breadcrumb").hasClass('active')){
		$("#nav_breadcrumbs").append('<li id="event_breadcrumb" class="active"><a id="event_breadcrumb_link" href="#">' + current_event.name+ '</a></li>');
		$("#home_breadcrumb").removeClass('active');
		$("#event_breadcrumb").show();
	}
}

function loadSeatingChart(){
	$.get('../img/' + current_event.venue_id + '.png').done(function() { 
        $("#seating_chart_img").append("<img src='../img/" + current_event.venue_id + ".png'>"); 
    }).fail(function() { 
		$.get('../img/' + current_event.venue_id + '.gif').done(function() { 
			$("#seating_chart_img").append("<img class='img-responsive' src='../img/" + current_event.venue_id + ".gif'>"); 
		}).fail(function() { 
			$.get('../img/' + current_event.venue_id + '.jpg').done(function() { 
				$("#seating_chart_img").append("<img class='img-responsive' src='../img/" + current_event.venue_id + ".jpg'>"); 
			}).fail(function() { 
				//No seating chart img
			});
		});
    });
}

function clearSeatingChart(){
	$("#seating_chart_img").empty();
}