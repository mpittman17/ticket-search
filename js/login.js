//User object vars
var stubhub_auth_token = "";
var user_email_address = "";
var stubhub_access_token = "";

function buildUser(){
	$.ajax({
		url : 'http://mpittman.com/NCT/login-minimal/getUser.php',
		type : 'POST',
		dataType : 'json',
		async: false,
		success : function (result) {
		   stubhub_auth_token = window.btoa(result['consumer_key'] + ":" + result['consumer_secret']);
		   user_email_address = result['email_address'];
		   changeView('event');
		},
		error : function () {
		   alert("error");
		}
	})
};

function getStubhubUserToken(auth_token, email_address, password){
	$.ajax({
		url : 'https://api.stubhub.com/login',
		type : 'POST',
		data : {grant_type: "password", username : email_address, password : password, scope: "PRODUCTION"},
		dataType : 'json',
		beforeSend: function (xhr) {
			/* Authorization header */
			xhr.setRequestHeader("Authorization", "Basic " + auth_token);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		},
		success : function (result, status, xhr) {
		   stubhub_access_token = result.access_token;
		   changeView('event');
		},
		error : function (xhr, textStatus, error) {
			console.log(xhr.statusText);
      		console.log(textStatus);
      		console.log(error);
		}
	})
}