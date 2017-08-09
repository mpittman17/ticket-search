<?php
session_start();

if (!(isset($_SESSION['user_login_status']) && $_SESSION['user_login_status'] == true)) {
	echo "Please log in first to see this page.";
    header('Location: /ticket-search/login-minimal/index.php');
}
?>
<head>
<script src="../../js/jquery-3.2.1.min.js"></script>
<script src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.15/js/dataTables.bootstrap4.min.js"></script>
<script src="../../js/bootstrap.min.js"></script>
<script src="../../js/ui.js"></script>
<script src="../../js/login.js"></script>
<script src="../../js/main.js"></script>
<script src="../../js/stubhub.js"></script>
<script src="../../js/teams.js"></script>
<script src="../../js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="http://mpittman.com/NCT/css/ui.css" />
<link rel="stylesheet" type="text/css" href="http://mpittman.com/NCT/css/cerulean.bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.15/css/dataTables.bootstrap4.min.css" />
<link rel="icon" type="image/png" href="http://mpittman.com/NCT/img/ticket.ico">
</head>
<body onload="preparePage('watching')">
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
			<li><a href="../index.php">Home</a></li>
			<li class="active"><a href="#">Watching <span class="sr-only">(current)</span></a></li>
			<li><a href="#">About</a></li>
		  </ul>
		  <ul class="nav navbar-nav navbar-right">
			<li><a href="../index.php?logout">Logout <?php echo $_SESSION['user_name']; ?></a></li>
		  </ul>
		</div>
	  </div>
	</nav>

	<br><br>
	<div id="main_container" class="container-fluid">
	  <div class="row-fluid">
	    <div id="watching_panel" class="bs-component col-lg-12">
			<div class="panel panel-primary">
				<div class="panel-heading">
				  <h3 class="panel-title" id="event_results_header">Events</h3>
				</div>
				<div class="panel-body">
					<table id="watching_table" class="table table-striped table-hover display">
					  <thead>
						<tr>
						  <th>Date</th>
						  <th>Event</th>
						  <th>Section(s)</th>
						  <th>Rows(s)</th>
						  <th>Max Price</th>
						  <th>Tickets</th>
						</tr>
					  </thead>
					  <tbody id="watching_rows">
					  </tbody>
					</table>
				</div>
			</div>
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