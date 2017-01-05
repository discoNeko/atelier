function renderQuest(){
	ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, 0, 0, w, h);//back
	if(on_drag && happy>720)ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
	ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0, 0, 225, 600);//chara

	if(20<cnt[2]){ctx.globalAlpha = 1.2-cnt[2]*0.01;}else{ctx.globalAlpha = 1.0;}
	ctx.drawImage(frames, (cnt[2]-20)*4, 0, 400-(cnt[2]-20)*4, 180, 480+(cnt[2]-20)*3,  80, 300-(cnt[2]-20)*3, 100);
	if(cnt[2]<110)ctx.drawImage(frames, (cnt[2]-10)*4, 0, 400-(cnt[2]-10)*4, 180, 480+(cnt[2]-10)*3, 180, 300-(cnt[2]-10)*3, 100);
	if(cnt[2]<100)ctx.drawImage(frames, (cnt[2]- 0)*4, 0, 400-(cnt[2]- 0)*4, 180, 480+(cnt[2]- 0)*3, 280, 300-(cnt[2]- 0)*3, 100);
	ctx.globalAlpha = 1.0;

	ctx.drawImage(deco1, 0, 0,w/2,h/2);
	ctx.drawImage(deco2, w/2, h/2,w/2,h/2);

	ctx.fillStyle = 'rgb(0,0,0)';
	ctx.fillRect(0,0,w,cnt[1]*0.6);
	ctx.fillRect(0,h-cnt[1]*0.7,w,h);

	appGage();
	appStatus();

	if(cnt[2]<60)cnt[2]+=1;
	if(cnt[2]<80)cnt[2]+=1;
	if(cnt[2]<100)cnt[2]+=1;
	if(cnt[2]<110)cnt[2]+=1;
	if(cnt[2]<120)cnt[2]+=1;

	if(cnt[2]<120){
		requestId = window.requestAnimationFrame(renderQuest); 
	}else{
		requestId = window.requestAnimationFrame(renderQuest2); 
	}
	appEffect();
}