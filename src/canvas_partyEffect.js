function partyEffect(){
	audio_drag.volume = 0.007*cnt[20];
	if(cnt[20]<30){audio_def.volume = 0.3-0.01*cnt[20];}else{audio_def.volume = 0;}
	ctx.globalAlpha = 0.01*cnt[20];
	ctx.drawImage(hand, 0, 350-cnt[21]+cnt[22]-use_drink*3);//hand
	
	if(cnt[21]<100){
		cnt[21]+=20;
	}else{
		cnt[22]+=12;
		if(cnt[22]>100){cnt[21]=0;cnt[22]=0;}
	}
}