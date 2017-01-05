function renderEnding(){
	appFrame();
	appGage();
	appStatus();
	dragEffect();
	if(ending_num==5){
		if(music_next!=12)audioChange(12);
		if(cnt[20]==0 && !status.match(/イカサマ/))status = "真実の錬金術士";
		if(ending_num==5 && exp_area==55 && !status.match(/イカサマ/))status = "地方上級錬金術士";
	}
	if(!click_wait && !click_wait2)cnt[6]++;
	ctx.globalAlpha = 0.01*cnt[6];
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,w,h);
	ctx.globalAlpha = 1.0;
	if(cnt[6]<100){
		requestId = window.requestAnimationFrame(renderEnding); 
	}else{
		window.cancelAnimationFrame(requestId);
		requestId = window.requestAnimationFrame(renderEnding2); 
	}
}