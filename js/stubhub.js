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
			xhr.setRequestHeader("Authorization", "Bearer " + stubhub_access_token);
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
	  var event_id = this.id;
	  var results_html = "<tr>";
	  results_html += "<td>" + this.eventDateLocal.substring(0, 10) + "</td>";
	  results_html += "<td>" + this.name + "</td>";
	  results_html += "<td><button id='ticket_" + event_id + "' class='btn btn-primary btn-sm'>Check Tickets</button></td>";
	  results_html += "</tr>";
	  $("#event_results_rows").append(results_html);
	  $("#ticket_" + event_id).click(function() {
		  changeView('ticket');
		  getTickets(event_id);
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
			xhr.setRequestHeader("Authorization", "Bearer " + stubhub_access_token);
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
	$.each(result, function() {
	  var ticket_id = this.listingId;
	  var results_html = "<tr>";
	  results_html += "<td>" + this.sectionName + "</td>";
	  results_html += "<td>" + this.row + "</td>";
	  results_html += "<td>$" + this.listingPrice.amount + "</td>";
	  results_html += "<td><button id='buy_" + ticket_id + "' class='btn btn-primary btn-sm'>Buy Tickets</button></td>";
	  results_html += "</tr>";
	  $("#ticket_results_rows").append(results_html);
	  $("#buy_" + ticket_id).click(function() {
		  changeView('buy');
	  });
	});
}

function filterTickets(filters){
	var filteredTicketResults = JSON.parse(JSON.stringify(current_ticket_results.listing));
	if(filters.price_min != ''){
		filteredTicketResults = filteredTicketResults.filter(function (el) {
			return el.listingPrice.amount >= filters.price_min;
		});
	}
	if(filters.price_max != ''){
		console.log(filteredTicketResults);
		filteredTicketResults = filteredTicketResults.filter(function (el) {
			return el.listingPrice.amount <= filters.price_max;
		});
	}
	if(filters.section != ''){
		
	}
	if(filters.row != ''){
		
	}
	displayTicketResults(filteredTicketResults);
}