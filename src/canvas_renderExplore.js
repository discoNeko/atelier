function renderExplore(){
	if(on_drag && happy>720){
		ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
	}else{
		ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, 0, 0, w, h);//back
	}
	ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0-cnt[99], 0, 225, 600);//chara

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
		requestId = window.requestAnimationFrame(renderExplore); 
	}else{
		if(happy>300){
			if(exp_drag==-1)exp_drag = exp_area;
			exp_area = 51;
		}else{
			if(exp_drag!=-1){
				exp_area = exp_drag;
				exp_drag = -1;
			}		
		}
		while(true){
			//area:20-75(56)
			rnd1 = Math.floor(Math.random()*7)+exp_area-3+item_eff[6]*2;
			rnd2 = Math.floor(Math.random()*7)+exp_area-3+item_eff[6]*2;
			if(rnd1==rnd2)rnd1++;
			if(rnd1<0 || rnd2<0){rnd1+=4; rnd2+=4;}
			if(rnd1>55)rnd1-=56;
			if(rnd2>55)rnd2-=56;
			if(back!=rnd1 && back!=rnd2)break;
		}
		requestId = window.requestAnimationFrame(renderExplore2); 
	}
	appEffect();
}