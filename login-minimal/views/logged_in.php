<head>
<script src="../js/jquery-3.2.1.min.js"></script>
<script src="../js/ui.js"></script>
<script src="../js/login.js"></script>
<script src="../js/main.js"></script>
<script src="../js/stubhub.js"></script>
<script src="../js/teams.js"></script>
<script src="../js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="http://mpittman.com/NCT/css/ui.css" />
<link rel="stylesheet" type="text/css" href="http://mpittman.com/NCT/css/cerulean.bootstrap.min.css" />
</head>
<body onload="preparePage()">
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
		<div class="navbar-header">
		  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		  </button>
		  <a class="navbar-brand" href="#">Search Tickets</a>
		</div>

		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		  <ul class="nav navbar-nav">
			<li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
			<li><a href="#">Link</a></li>
			<li class="dropdown">
			  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
			  <ul class="dropdown-menu" role="menu">
				<li><a href="#">Action</a></li>
				<li><a href="#">Another action</a></li>
				<li><a href="#">Something else here</a></li>
				<li class="divider"></li>
				<li><a href="#">Separated link</a></li>
				<li class="divider"></li>
				<li><a href="#">One more separated link</a></li>
			  </ul>
			</li>
		  </ul>
		  <ul class="nav navbar-nav navbar-right">
			<li><a href="index.php?logout">Logout <?php echo $_SESSION['user_name']; ?></a></li>
		  </ul>
		</div>
	  </div>
	</nav>

	<br><br>
	<div class="container-fluid">
		<div id="stubhub_login" class="row-fluid">
			<div class="well bs-component col-lg-3">
				<input id="stubhub_pw" class="login_input" type="text" placeholder="Password" required />
				<button id="stubhub_login_button" class="btn btn-primary">Login to Stubhub</button>
			</div>
		</div>
		<div class="row-fluid" id="stubhub_event_search">
			<div id="event_search" class="well bs-component col-lg-2">
			  <legend>Search Team Events</legend>
			  <label for="team_select" class="control-label">Team:</label>
			  <select id="team_select"></select>
			  <button id="search_events_button" type="submit" class="btn btn-primary btn-sm">Submit</button>
			</div>
			<div class="col-lg-1">
			</div>
			<div id="event_results" class="well bs-component col-lg-8">
				<table class="table table-striped table-hover">
				  <thead>
					<tr>
					  <th>Date</th>
					  <th>Event</th>
					  <th></th>
					</tr>
				  </thead>
				  <tbody id="event_results_rows">
				  </tbody>
				</table>
				</div>
		</div>
		<div class="row-fluid" id="stubhub_ticket_search">
			<div id="ticket_search" class="well bs-component col-lg-2">
			  <legend>Filter Event Tickets</legend>
			  <div class="row-fluid">
				  <label class="control-label col-lg-4">Price:</label>
				  <input type="text" class="col-lg-4" id="price_min" placeholder="Min">
				  <input type="text" class="col-lg-4" id="price_max" placeholder="Max">
			  </div>
			  <div class="row-fluid">
				  <label class="control-label col-lg-4">Section(s):</label>
				  <input type="text" class="col-lg-8" id="section_select">
			  </div>
			  <div class="row-fluid">
				  <label class="control-label col-lg-4">Row(s):</label>
				  <input type="text" class="col-lg-8" id="row_select">
			  </div>
			  <div class="row-fluid">
				  <button id="search_tickets_button" type="submit" class="btn btn-primary btn-sm pull-right">Submit</button>
			  </div>
			</div>
			<div class="col-lg-1">
			</div>
			<div id="ticket_results" class="well bs-component col-lg-8">
				<table class="table table-striped table-hover">
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
</body>

<div id="buy_modal" class="modal">
  <div class="modal-dialog">
	<div class="modal-content">
	  <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h4 class="modal-title">Modal title</h4>
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