function renderExplore3(){
	click_mute = true;
	appFrame();
	appGage();
	appStatus();

	ctx.globalAlpha = 1.0-0.01*cnt[4];
	ctx.font= 'bold 35px HG明朝E';
	ctx.strokeStyle = '#333';
	ctx.fillStyle = '#fff';
	ctx.lineWidth = 6;
	ctx.strokeText('どちらへ進む？',365,125,510);
	ctx.fillText('どちらへ進む？',365,125);

	var on = 0;
	ctx.font= 'bold 25px HG明朝E';
	var select1 = field_name[rnd1];
	var select2 = field_name[rnd2];
	if(on_mouse_exp == 1){on = 2;}else{on = 0;}
	ctx.strokeText(select1,290-on,360-on,510);
	ctx.fillText(select1,290-on,360-on);
	if(on_mouse_exp == 2){on = 2;}else{on = 0;}
	ctx.strokeText(select2,570-on,360-on,510);
	ctx.fillText(select2,570-on,360-on);

	ctx.fillStyle = '#fff';
	ctx.fillRect(240-on,160-on,240,170);
	ctx.fillRect(510-on,160-on,240,170);
	ctx.drawImage(fields, (rnd1%10)*800, Math.floor(rnd1/10)*600,800,600, 245-on,165-on,230,160);
	ctx.drawImage(fields, (rnd2%10)*800, Math.floor(rnd2/10)*600,800,600, 515-on,165-on,230,160);
	ctx.globalAlpha = 1.0;

	ctx.globalAlpha = 0.01*cnt[4];
	if(on_mouse_exp == 1){
		ctx.drawImage(fields, (rnd1%10)*800, Math.floor(rnd1/10)*600, 800, 600, 0, 0, w, h);//back
	}else{
		ctx.drawImage(fields, (rnd2%10)*800, Math.floor(rnd2/10)*600, 800, 600, 0, 0, w, h);//back
	}
	ctx.globalAlpha = 1.0;

	ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0, 0, 225, 600);//chara
	ctx.drawImage(deco1, 0, 0,w/2,h/2);
	ctx.drawImage(deco2, w/2, h/2,w/2,h/2);
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,w,60);
	ctx.fillRect(0,530,w,h);
	appGage();
	appStatus();

	if(cnt[4]<100)cnt[4]+=2;
	if(cnt[4]==100){
		click_mute = false;
		click_wait = true;
		for(var i = 0; i<15; i++)exp_str[i] = '';
		var dis = 0;
		if(on_mouse_exp == 1){
			back = rnd1;
			dis = Math.abs(exp_area - rnd1);
			exp_area = rnd1;
		}else{
			back = rnd2;
			dis = Math.abs(exp_area - rnd2);
			exp_area = rnd2;
		}
		cnt[4]=0;
		cnt[5]=0;
		score += (rnd1 + rnd2);
		appExp(rnd1 + rnd2);
		var time = dis*10+20;
		if(ability_have[12]!=-1){
			if(key_item[ability_have[12]]!=-1)time*=1.2;
		}
		cnt[92]+=time;
		modTime();
		exp_act = 1;
		exp_act_num = 25 + item_eff[16];
		if(ability_have[11]!=-1){
			if(key_item[ability_have[11]]!=-1)exp_act_num = 30 + item_eff[16];
		}
		requestId = window.requestAnimationFrame(renderExplore4);
	}else{
		requestId = window.requestAnimationFrame(renderExplore3); 
	}
	appEffect();
}