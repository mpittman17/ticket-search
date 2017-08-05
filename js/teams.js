var unc_basketball = {
	name: "UNC Basketball",
	id: "9824",
	icon_path: "http://mpittman.com/NCT/img/unc-icon.png"
};

var unc_football = {
	name: "UNC Football",
	id: "15108",
	icon_path: "http://mpittman.com/NCT/img/unc-icon.png"
};
		   
var charlotte_hornets = {
	name: "Charlotte Hornets",
	id: "26089",
	icon_path: "http://mpittman.com/NCT/img/hornets.png"
};
						 
var carolina_panthers = {
	name: "Carolina Panthers",
	id: "6046",
	icon_path: "http://mpittman.com/NCT/img/panthers.png"
};

var carolina_hurricanes = {
	name: "Carolina Hurricanes",
	id: "3085",
	icon_path: ""
};
		   
var teams = [unc_basketball, unc_football, charlotte_hornets, carolina_panthers, carolina_hurricanes];

function getTeamIconPath(team_id){
	var return_path;
	$.each(teams, function(){
		if(this.id == team_id){
			return_path = this.icon_path;
			return;
		}
	});
	return return_path;
}

function sortByName(a, b){
  var aName = a.name.toLowerCase();
  var bName = b.name.toLowerCase(); 
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}