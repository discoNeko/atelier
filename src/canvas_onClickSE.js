function onClickSE(n){
	if(!music_mute && music_play==0){
		if(n==1 || n==2 || n==4 || n==10 || n==13 || n==17 || n==18 || n==20 || n==21 || n==22){audio_se.volume = 0.5;}else{audio_se.volume = 1.0;}
		audio_se.src = "se/se"+n+".mp3";
		audio_se.play();
	}
}