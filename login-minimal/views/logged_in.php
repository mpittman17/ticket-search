<head>
<script src="../js/jquery-3.2.1.min.js"></script>
<script src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.15/js/dataTables.bootstrap4.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../js/ui.js"></script>
<script src="../js/login.js"></script>
<script src="../js/main.js"></script>
<script src="../js/stubhub.js"></script>
<script src="../js/teams.js"></script>
<script src="../js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="../css/ui.css" />
<link rel="stylesheet" type="text/css" href="../css/cerulean.bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.15/css/dataTables.bootstrap4.min.css" />
<link rel="icon" type="image/png" href="http://mpittman.com/NCT/img/ticket.ico">
</head>
<body onload="preparePage('home')">
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
		<div class="navbar-header">
		  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		  </button>
		  <a class="navbar-brand" href="http://mpittman.com/NCT">Ticket Search</a>
		</div>

		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		  <ul class="nav navbar-nav">
			<li class="active"><a href="#">Home <span class="sr-only">(current)</span></a></li>
			<li><a href="/ticket-search/login-minimal/views/watching.php">Watching</a></li>
			<li><a href="#">About</a></li>
		  </ul>
		  <ul class="nav navbar-nav navbar-right">
			<li><a href="index.php?logout">Logout <?php echo $_SESSION['user_name']; ?></a></li>
		  </ul>
		</div>
	  </div>
	</nav>

	<br><br>
	<div id="main_container" class="container-fluid">
		<div class="row-fluid">
			<ul id="nav_breadcrumbs" class="breadcrumb">
			  <li id="home_breadcrumb" class="active"><a id="home_breadcrumb_link" href="#">Home</a></li>
			</ul>
		</div>
		<div id="stubhub_login" class="row-fluid hidden">
			<div class="well bs-component col-lg-3">
				<input id="stubhub_pw" class="login_input" type="text" placeholder="Password" required />
				<button id="stubhub_login_button" class="btn btn-primary">Login to Stubhub</button>
			</div>
		</div>
		<div class="row-fluid clearfix" id="stubhub_event_search">
			<div id="event_search" class="bs-component col-lg-3">
			  <div class="panel panel-primary">
				<div class="panel-heading">
				  <h3 class="panel-title">Search Team Events</h3>
				</div>
				<div class="panel-body">
				  <label for="team_select" class="control-label">Team:</label>
				  <select id="team_select"></select>
				  <button id="search_events_button" type="submit" class="btn btn-primary btn-sm">Submit</button>
				</div>
			  </div>
			</div>
			<div id="event_results" class="bs-component col-lg-9">
				<div class="panel panel-primary">
				    <div class="panel-heading">
					  <h3 class="panel-title" id="event_results_header">Events</h3>
				    </div>
				    <div class="panel-body">
						<table id="event_results_table" class="table table-striped table-hover display">
						  <thead>
							<tr>
							  <th>Date</th>
							  <th>Event</th>
							  <th>Tickets</th>
							</tr>
						  </thead>
						  <tbody id="event_results_rows">
						  </tbody>
						</table>
				    </div>
				</div>
			</div>
		</div>
		<div id="stubhub_ticket_search" class="row-fluid hidden clearfix">
			<div id="ticket_search" class="col-lg-3">
				<div class="panel panel-primary">
				  <div class="panel-heading">
					<h3 class="panel-title">Filter Event Tickets</h3>
				  </div>
				  <div class="panel-body">
					  <div class="row-fluid">
						  <label class="control-label col-lg-4">Price:</label>
						  <input type="text" class="col-lg-4" id="price_min" placeholder="Min">
						  <input type="text" class="col-lg-4" id="price_max" placeholder="Max">
					  </div>
					  <div class="row-fluid">
						  <label class="control-label col-lg-4">Section(s):</label>
						  <select id="section_select" class="col-lg-8" multiple=""></select>
					  </div>
					  <div class="row-fluid">
						  <label class="control-label col-lg-4">Row(s):</label>
						  <select id="row_select" class="col-lg-8" multiple=""></select>
					  </div>
					  <div class="row-fluid clearfix">
						  <button id="search_tickets_button" type="submit" class="btn btn-primary btn-sm pull-right">Submit</button>
						  <button id="clear_tickets_filters_button" class="btn btn-default btn-sm pull-right">Clear</button>
					  </div>
				  </div>
				</div>
			    <div id="seating_chart_panel" class="row-fluid">
				  <div class="panel panel-primary">
				    <div class="panel-heading">
					  <h3 class="panel-title">Seating Chart</h3>
				    </div>
				    <div id="seating_chart_img" class="panel-body">
				    </div>
				  </div>
			    </div>
			</div>
			<div id="ticket_results" class="bs-component col-lg-9">
				<div class="panel panel-primary">
				  <div class="panel-heading">
					<h3 class="panel-title" id="ticket_results_header">Available Tickets
					  	<button id="watch_event_button" type="submit" class="btn btn-default btn-sm pull-right"><img id='watch_icon' src='../img/eye.png'></button>
					</h3>
				  </div>
				  <div class="panel-body">
				  	<table id="ticket_results_table" class="table table-striped table-hover display">
					  <thead>
						<tr>
						  <th>Section</th>
						  <th>Row</th>
						  <th>Price</th>
						  <th></th>
						</tr>
					  </thead>
					  <tbody id="ticket_results_rows">
					  </tbody>
					</table>
				  </div>
				</div>
			</div>
		</div>
	</div>
</body>

<div id="watch_modal" class="modal">
  <div class="modal-dialog">
	<div class="modal-content">
	  <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h4 class="modal-title">Watch Tickets</h4>
	  </div>
	  <div class="modal-body">
		<p>One fine body…</p>
	  </div>
	  <div class="modal-footer">
		<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		<button type="button" class="btn btn-primary">Save changes</button>
	  </div>
	</div>
  </div>
</div>

<div id="buy_modal" class="modal">
  <div class="modal-dialog">
	<div class="modal-content">
	  <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h4 class="modal-title">Buy Tickets</h4>
	  </div>
	  <div class="modal-body">
		<p>One fine body…</p>
	  </div>
	  <div class="modal-footer">
		<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		<button type="button" class="btn btn-primary">Save changes</button>
	  </div>
	</div>
  </div>
</div>