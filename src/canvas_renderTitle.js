function renderTitle(){
	if(cnt[40]==0){
		audio_def.pause();
		audio_def.loop = true;
		audio_def.src = "bgm/1.mp3";
		audio_def.currentTime = 0;
		audio_def.play();
	}
	audio_def.volume = 0.01*cnt[40];
	if(cnt[40]<30)cnt[40]++;
	ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, 0, 0, w, h);//back
	ctx.drawImage(logo, 220, -50,580,480);//logo
	ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0-cnt[99], 0, 225, 600);//chara
	ctx.drawImage(deco1, 0, 0,w/2,h/2);
	ctx.drawImage(deco2, w/2, h/2,w/2,h/2);
	if(on_mouse_title==1){
		ctx.drawImage(frames, 0, 720, 400, 180, 400, 400, 280, 90);
	}else{
		ctx.drawImage(frames, 0, 180, 400, 180, 400, 400, 280, 90);
	}

	ctx.font= 'bold 25px メイリオ';
	ctx.font= 'bold 25px HG明朝E';
	ctx.strokeStyle = '#333';
	ctx.lineWidth = 6; 
	ctx.lineJoin = 'round';
	ctx.fillStyle = '#fff';
	ctx.strokeText('P L A Y',491,455,510);
	ctx.fillText('P L A Y',491,455);

	ctx.globalAlpha = 1.0-0.01*cnt[0];
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,w,h);
	ctx.globalAlpha = 1.0;
	if(cnt[0]<100)cnt[0] += 1;
	if(cnt[99]>0)cnt[99] -= 1;
	if(cnt[99]==2)charDefault = 6;
	requestId = window.requestAnimationFrame(renderTitle); 
}