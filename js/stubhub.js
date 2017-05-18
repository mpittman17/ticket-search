var application_token = "2e772026-04d1-3cbf-89d2-e70b386c77ab";
var current_ticket_results;
var current_event_results;

// INPUT: A performer (team/artist/etc)
// OUTPUT: List of event objects for that performer
function getEvents(performer_id){
	$.ajax({
		url : 'https://api.stubhub.com/search/catalog/events/v3',
		type : 'GET',
		data : {'performerId':performer_id, 'rows':200},
		beforeSend: function (xhr) {
			/* Authorization header */
			xhr.setRequestHeader("Authorization", "Bearer " + application_token);
			xhr.setRequestHeader("Accept", "application/json");
		},
		success : function (result, status, xhr) {
		   current_event_results = result;
		   displayEventResults(result);
		},
		error : function (xhr, textStatus, error) {
			console.log(xhr.statusText);
      		console.log(textStatus);
      		console.log(error);
		}
	})
}

function displayEventResults(result){
	$.each(result.events, function() {
		var event = this;
		event_results_table.row.add([event.eventDateLocal.substring(0, 10), event.name, "<button id='ticket_" + event.id + "' class='btn btn-primary btn-sm'>Check Tickets</button>"]);
		event_results_table.draw();
		$("#ticket_" + event.id).click(function() {
		  current_event = {
			  id:event.id, 
			  name:event.name, 
			  date: event.eventDateLocal.substring(0, 10), 
			  venue_id: event.venue.id,
			  venue_name: event.venue.name
		  };
		  changeView('ticket');
		});
	});
}

// INPUT: An event
// OUTPUT: List of ticket objects for that event
function getTickets(event_id){
	$.ajax({
		url : 'https://api.stubhub.com/search/inventory/v2',
		type : 'GET',
		data : {'eventId':event_id, 'rows':200},
		beforeSend: function (xhr) {
			/* Authorization header */
			xhr.setRequestHeader("Authorization", "Bearer " + application_token);
			xhr.setRequestHeader("Accept", "application/json");
		},
		success : function (result, status, xhr) {
		   current_ticket_results = result;
		   displayTicketResults(result.listing);
		},
		error : function (xhr, textStatus, error) {
			console.log(xhr.statusText);
      		console.log(textStatus);
      		console.log(error);
		}
	})	
}

function displayTicketResults(result){
	var rows = [];
	var sections = [];
	$.each(result, function() {
	  var ticket_id = this.listingId;
	  var row = this.row;
	  var section = this.sectionName;
	  
	  if(rows.indexOf(row) == -1){
		rows.push(row);  
	  }
	  if(sections.indexOf(section) == -1){
		sections.push(section);  
	  }
	  
	  var results_html = "<tr>";
	  results_html += "<td>" + section + "</td>";
	  results_html += "<td>" + row + "</td>";
	  results_html += "<td>$" + this.listingPrice.amount + "</td>";
	  results_html += "<td><button id='buy_" + ticket_id + "' class='btn btn-primary btn-sm'>Buy Tickets</button></td>";
	  results_html += "</tr>";
	  
	  $("#ticket_results_rows").append(results_html);
	  $("#buy_" + ticket_id).click(function() {
		  changeView('buy');
	  });
	});
	populateSelectOptions('row', rows);
	populateSelectOptions('section', sections);
}

function filterTickets(filters){
	var filteredTicketResults = JSON.parse(JSON.stringify(current_ticket_results.listing));
	if(filters.price_min != ''){
		filteredTicketResults = filteredTicketResults.filter(function (el) {
			return el.listingPrice.amount >= filters.price_min;
		});
	}
	if(filters.price_max != ''){
		filteredTicketResults = filteredTicketResults.filter(function (el) {
			return el.listingPrice.amount <= filters.price_max;
		});
	}
	if(filters.section != ''){
		$.each(filters.section, function() {
			var section = filters.section;
			filteredTicketResults = filteredTicketResults.filter(function (el) {
				return el.sectionName == section;
			});
		});
	}
	if(filters.row != ''){
		$.each(filters.row, function() {
			var row = filters.row;
			filteredTicketResults = filteredTicketResults.filter(function (el) {
				return el.row == row;
			});
		});
	}
	displayTicketResults(filteredTicketResults);
}

function populateSelectOptions(select_type, select_options){
	$("#" + select_type + "_select").empty();
	$.each(select_options, function() {
		$("#" + select_type + "_select").append("<option>" + this + "</option>");
	});
}