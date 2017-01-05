function modTime(){
	if(cnt[96]>0 || cnt[97]>0 || cnt[98]>0){
		cnt[98]--;
		if(cnt[98]<0){cnt[98]+=10;cnt[97]--;}
		if(cnt[97]<0){cnt[97]+= 6;cnt[96]--;}
		if(cnt[98]>9){cnt[98]-=10;cnt[97]++;}
		if(cnt[97]>5){cnt[97]-= 6;cnt[96]++;}
	}else{
		phase = 77777;
		ending_num = 3;
		window.cancelAnimationFrame(requestId);
		renderEnding();
	}
	if(ability_have[4]!=-1){
		if(key_item[ability_have[4]]!=-1 && cnt[98]%3==0){gold=Math.floor(gold*1.01);limitCheck();}
	}
	cnt[92]--;
	if(ability_have[3]!=-1){
		if(key_item[ability_have[3]]!=-1)cnt[92]--;
	}else if(ability_have[9]!=-1){
		if(key_item[ability_have[9]]!=-1 && hp<20)cnt[92]-=4;
	}
	if(happy>200)cnt[92]-=use_drink;
	if(cnt[92]<-1)cnt[92]=0;
	if(cnt[92]>0){requestAnimationFrame(modTime);} 
}