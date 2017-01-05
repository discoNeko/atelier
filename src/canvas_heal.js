function heal(){
	var c = true;
	heal_time++;
	if(ability_have[12]!=-1){
		if(key_item[ability_have[12]]!=-1)cnt[92]+=0.2;
	}
	if(ability_have[3]!=-1){
		if(key_item[ability_have[3]]!=-1){
			if(heal_time%2==0){
				cnt[92]++;
				heal_time = 0;
				modTime();
			}
			c = false;
		}
	}else if(ability_have[9]!=-1){
		if(key_item[ability_have[9]]!=-1 && hp<20){
			if(heal_time%5==0){
				cnt[92]++;
				heal_time = 0;
				modTime();
			}
			c = false;
		}
	}
	if(c){
		cnt[92] += heal_time;
		heal_time = 0;
		modTime();
	}
	if(hp<100)hp++;
	if(happy<200)happy++;
	if(happy<200)happy++;
	if(hp<100 || happy<200){requestAnimationFrame(heal);}else{heal_now=false;}
}