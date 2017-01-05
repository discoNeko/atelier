function renderExplore2(){
	appFrame();
	appGage();
	appStatus();
	
	if(cnt[6]<10)cnt[6]++;
	ctx.globalAlpha = 0.1*cnt[6];

	ctx.font= 'bold 35px HG明朝E';
	ctx.strokeStyle = '#333';
	ctx.fillStyle = '#fff';
	ctx.lineWidth = 6;
	ctx.strokeText('どちらへ進む？',365,125+10-cnt[6],510);
	ctx.fillText('どちらへ進む？',365,125+10-cnt[6]);

	var on = 0;
	ctx.font= 'bold 25px HG明朝E';
	var select1 = field_name[rnd1];
	var select2 = field_name[rnd2];
	if(on_mouse_exp == 1){on = 2;}else{on = 0;}
	ctx.strokeText(select1,290-on,360-on+10-cnt[6],510);
	ctx.fillText(select1,290-on,360-on+10-cnt[6]);
	if(on_mouse_exp == 2){on = 2;}else{on = 0;}
	ctx.strokeText(select2,570-on,360-on+10-cnt[6],510);
	ctx.fillText(select2,570-on,360-on+10-cnt[6]);

	ctx.fillStyle = '#fff';
	if(on_mouse_exp == 1){on = 2;}else{on = 0;}
	ctx.fillRect(240-on,160-on+10-cnt[6],240,170);
	if(on_mouse_exp == 2){on = 2;}else{on = 0;}
	ctx.fillRect(510-on,160-on+10-cnt[6],240,170);

	ctx.fillStyle = '#000';
	if(on_mouse_exp == 1){on = 2;}else{on = 0;}
	ctx.drawImage(fields, (rnd1%10)*800, Math.floor(rnd1/10)*600,800,600, 245-on,165-on+10-cnt[6],230,160);
	if(on_mouse_exp == 2){on = 2;}else{on = 0;}
	ctx.drawImage(fields, (rnd2%10)*800, Math.floor(rnd2/10)*600,800,600, 515-on,165-on+10-cnt[6],230,160);

	ctx.globalAlpha = 1.0;

	appEffect();
	requestId = window.requestAnimationFrame(renderExplore2);
}