function preparePage(view){
	if(view == 'home'){
	  readyHomeUI();
	}
	if(view == 'watching'){
	  readyWatchingUI();
	}
	buildUser();
}