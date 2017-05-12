//Initial load/setup
function readyUI(){
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
		populateTeamSelect();
		showStubhubEventSearch();
	}
	if(view == 'ticket'){
		hideStubhubEventSearch();
		hideStubhubLogin();
		populateSectionSelect();
		populateRowSelect();
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

function populateSectionSelect(){
	
}

function populateRowSelect(){
	
}

//Visibility Functions
function hideStubhubLogin(){
	$("#stubhub_login").hide();
}

function showStubhubLogin(){
	$("#stubhub_login").show();
}

function hideStubhubEventSearch(){
	$("#stubhub_event_search").hide();
}

function showStubhubEventSearch(){
	$("#stubhub_event_search").show();
}

function clearEventResults(){
	$("#event_results_rows").empty();
}

function hideStubhubTicketSearch(){
	$("#stubhub_ticket_search").hide();
}

function showStubhubTicketSearch(){
	$("#stubhub_ticket_search").show();
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