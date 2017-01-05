function itemPoly(){
	var check = false;
	if(alc_item[0]!=-1)check = true;
	if(alc_item[1]!=-1)check = true;
	if(alc_item[2]!=-1)check = true;
	if(check){
		if(happy>200)happy*=0.9;
		onClickSE(6);
		cnt[30]=10;
		for(var i = 0; i<20; i++)poly_eff.push(80);
		var time = 10;
		if(ability_have[12]!=-1){
			if(key_item[ability_have[12]]!=-1)time = 12;
		}
		cnt[92] += time;
		modTime();

		//成果物
		var c = true;
		var other = true;
		if(alc_item[0]==alc_item[1])c = false;
		if(alc_item[0]==alc_item[2])c = false;
		if(alc_item[1]==alc_item[2])c = false;
		if(c){
			for(var i in key_item){
				if(key_item[i]==-1){
					var sum = 0;
					for(var j = 0; j<3; j++){
						if(alc_item[0]==key_item_recipe[i][j])sum++;
						if(alc_item[1]==key_item_recipe[i][j])sum++;
						if(alc_item[2]==key_item_recipe[i][j])sum++;
					}
					if(sum==3){
						other = false;
						key_item[i] = 0;
						alc_item[3] = key_ability[i];
						key_achieve++;
						if(key_achieve==3 && !status.match(/錬成/))status = "そこそこ錬金術士";
						if(key_achieve==7 && !status.match(/錬成/))status = "普通に錬金術士";
						break;
					}
				}
			}
		}
		if(other){
			alc_item[3] = 99;
			if(alc_item[0]!=-1){cnt_drink++;have_drink++;}
			if(alc_item[1]!=-1){cnt_drink++;have_drink++;}
			if(alc_item[2]!=-1){cnt_drink++;have_drink++;}
		}

		//所持アイテム処理
		if(alc_item[0]!=-1 && item_stack[alc_item[0]]>0){item_stack[alc_item[0]]--; score+=alc_item[0]+10;}
		if(alc_item[1]!=-1 && item_stack[alc_item[1]]>0){item_stack[alc_item[1]]--; score+=alc_item[1]+10;}
		if(alc_item[2]!=-1 && item_stack[alc_item[2]]>0){item_stack[alc_item[2]]--; score+=alc_item[2]+10;}
		for(var i in alc_item)if(item_stack[alc_item[i]]<1)alc_item[i] = -1;
		if(alc_item[0] == alc_item[1] && item_stack[alc_item[0]]<2)alc_item[1] = -1;
		if(alc_item[0] == alc_item[2] && item_stack[alc_item[0]]<2)alc_item[2] = -1;
		if(alc_item[1] == alc_item[2] && item_stack[alc_item[1]]<2)alc_item[2] = -1;
		if(alc_item[0] == alc_item[1] && alc_item[1] == alc_item[2]){
			if(item_stack[alc_item[0]]==1){alc_item[1]=-1;alc_item[2]=-1;}
			if(item_stack[alc_item[0]]==2){alc_item[2]=-1;}
		}
	}else{
		onClickSE(4);
	}
}