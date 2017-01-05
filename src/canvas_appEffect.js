function appEffect(){
	if(on_drag){
		partyEffect();
		dragEffect();
	}
	if(use_drink==100){
		phase = 77777;
		ending_num = 2;
		window.cancelAnimationFrame(requestId);
		renderEnding();
	}
}