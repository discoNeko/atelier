function dragEffect(){
	if(happy>200){
		if(cnt[20]<100)cnt[20]++;
	}else{
		if(cnt[20]>0)cnt[20]--;
	}
	ctx.globalAlpha = 0.01*cnt[20];
	
	if(use_drink<90){
		ctx.globalAlpha = (0.1+0.01*use_drink)*0.01*cnt[20];
	}	
	ctx.fillStyle = '#000'
	ctx.fillRect(0,0,800,600);
	ctx.globalAlpha = 0.01*cnt[20];
	ctx.globalCompositeOperation = "lighter";
	for(var i = 0; i < drag_num; i++){
		if(0>drag_x[i] || drag_x[i]>800 || 0>drag_y[i] || drag_y[i]>600){
			drag_vx[i] = Math.random()*8-4;
			drag_vy[i] = Math.random()*8-4;
			drag_x[i] = 400+Math.random()*50-25;
			drag_y[i] = 300+Math.random()*50-25;
			drag_radius[i] = Math.random()*18+1;
			drag_r[i] = Math.floor(Math.random() * 100);
			drag_g[i] = Math.floor(Math.random() * 100);
			drag_b[i] = Math.floor(Math.random() * 100);
		}else{
			drag_x[i] += drag_vx[i];
			drag_y[i] += drag_vy[i];
			if(drag_vx[i]+drag_vy[i]>4)drag_radius[i] *= 1.01;

	   		ctx.beginPath();
	   		ctx.fillStyle = 'rgb(' + drag_r[i] + ',' + drag_g[i] + ',' + drag_b[i] + ')';
   		ctx.arc(drag_x[i], drag_y[i], drag_radius[i], 0, Math.PI*2.0, true);
   		ctx.fill();
		}
	}
	if(Math.floor(audio_drag.currentTime)==202){
		audio_drag.currentTime=0;
		music_play=0;
		audio_drag.pause();
	}
	if(cnt[20]==0){
		on_drag=false;
		music_play=0;
		audio_drag.pause();
	}
	ctx.globalAlpha = 1.0;
	ctx.globalCompositeOperation = "source-over";
}