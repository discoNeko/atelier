function audioChange2(){
	if(cnt[41]==0){
		cnt[41]++;
		cnt[40]=0;
	}else{
		if(cnt[40]<60){
			cnt[40]++;
			audio_def.volume = 0.3-0.005*cnt[40];
		}else{
			cnt[41]++;
			audio_def.volume = 0.005*cnt[41];
		}
	}
	if(cnt[40]==60 && cnt[41]==1){
		cnt[41]++;
		audio_def.pause();
		audio_def.volume = 0;
		audio_def.src = "bgm/"+music_next+".mp3";
		audio_def.currentTime = 0;
		audio_def.play();
	}
	if(cnt[41]!=60){
		window.requestAnimationFrame(audioChange2);
	}else{
		cnt[40] = 0;
		cnt[41] = 0;
	}
}