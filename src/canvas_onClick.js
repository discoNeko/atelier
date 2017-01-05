function onClick(e){
	if(!click_mute){
		click_wait = false;
		click_wait2 = false;

		var rect = e.target.getBoundingClientRect();
		var x =  Math.round(e.clientX - rect.left);
		var y =  Math.round(e.clientY - rect.top);
		//console.log("click "+x+" "+y);

		if(phase!=77777){
		if(40<x && x<200 && 100<y && y<500){
			charDefault = 0;
		}
		if(70<x && x<180 && 90<y && y<150){
			onClickSE(3);
			charDefault = 7;
			pon++;
			if(pon>20){
			key_achieve=7;
			for(var i in key_item)key_item[i]=0;
			status = "イカサマ錬金術士";
			}
		}
		if(90<x && x<180 && 300<y && y<370){
			onClickSE(22);
			charDefault = 6;
			if(!status.match(/イカサマ/))status = "セクハラ錬金術士";
		}
		if(phase==0){
			if(50<x && x<200 && 555<y && y<600){
				onClickSE(22);
				charDefault = 4;
				cnt[99]=12;
				status = "セクハラ錬金術士";
			}
		}
		}	
		var music_click = false;
		if(phase!=0 && phase!=1){
			if(750<x && x<782 && 550<y && y<582){
				music_click = true;
				if(music_mute){
					music_mute=false;
					audio_drag.muted = false;
					audio_def.muted = false;
				}else{
					music_mute=true;
					audio_drag.muted = true;
					audio_def.muted = true;
				}
			}
		}
		if(phase==0){
			if(400<x && x<680 && 400<y && y<490){
				phase = 1;
				cnt[0] = 0;
				achieve = Math.floor(Math.random()*3);
				var sum = 0;
				while(true){
					var check = true;
					key_item_recipe[sum][0] = Math.floor(Math.random()*25);
					key_item_recipe[sum][1] = Math.floor(Math.random()*25);
					key_item_recipe[sum][2] = Math.floor(Math.random()*25);
					if(key_item_recipe[sum][0]==key_item_recipe[sum][1])check = false;
					if(key_item_recipe[sum][0]==key_item_recipe[sum][2])check = false;
					if(key_item_recipe[sum][1]==key_item_recipe[sum][2])check = false;
					if(key_item_recipe[sum][0]+key_item_recipe[sum][1]+key_item_recipe[sum][2]>40)check = false;
					if(check)sum++;
					if(sum==7)break;
				}
				var num = 0;
				while(true){
					var c = true;
					var n = Math.floor(Math.random()*5);
					key_ability[num] = n;
					for(var i = 0; i<num; i++){
						if(key_ability[i]==key_ability[num])c = false;
					}
					if(c){ability_have[n]=num; num++;}
					if(num==3)break;
				}
				key_ability[3] = 5;//異界探索
				num++;
				while(true){
					var c = true;
					var n = Math.floor(Math.random()*9+5);
					key_ability[num] = n;
					for(var i = 3; i<num; i++){
						if(key_ability[i]==key_ability[num])c = false;
					}
					for(var i = 0; i<3; i++){
						if(key_ability[i]==(key_ability[num]-6))c = false;
					}
					
					if(c){ability_have[n]=num; num++;}
					if(num==7)break;
				}
				onClickSE(5);
				audio_def.volume = 0.3;
				window.cancelAnimationFrame(requestId);
				renderStory();
			}
		}else if(phase==1){
			phase = 2;
			cnt[2] = 0;
			cnt[96] = 72;
			cnt[97] = 0;
			cnt[98] = 0;
			window.cancelAnimationFrame(requestId);
			renderMain();
		}else if(phase==2 && !music_click){
			itemCheck();
			if(pict==0){

			//成果物コミット
			if(268<x && x<448 && 70<y && y<110 && key_achieve>2){
				phase = 77777;
				if(key_achieve==7){ending_num=5;}else{ending_num=4;}
				onClickSE(19);
				window.cancelAnimationFrame(requestId);
				renderEnding();
			}
			//key_pos移動
			if(240<x && x<260 && 70<y && y<110){
				if(key_pos!=0)key_pos--;
			}
			if(457<x && x<477 && 70<y && y<110){
				if(key_pos!=4)key_pos++;
			}
			//エナドリ使用
			if(240<x && x<475 && 210<y && y<420){
				if(have_drink>0){
					if(!status.match(/イカサマ/))status = "エナドリ錬金術士";
					on_drag = true;

					var time = Math.floor(20*(1-0.01*use_drink));
					if(ability_have[12]!=-1){
						if(key_item[ability_have[12]]!=-1)time*=1.2;
					}
					cnt[92]+=time;
					modTime();
					have_drink--;
					use_drink++;
					if(ability_have[13]!=-1){
						if(key_item[ability_have[13]]!=-1){use_drink-=3;if(use_drink<0)use_drink=0;}
					}
					happy+=100;
					var rnd = Math.floor(Math.random()*8);
					charDefault = rnd;
					
					if(music_play==0){
						music_play++;
						audio_drag.pause();
						//audio_drag.loop = true;
						audio_drag.src = "bgm/d.mp3";
						audio_drag.currentTime = 72.5;
						audio_drag.play();
					}
				}
			}
			//休憩
			if(570<x && x<690 && 390<y && y<440){
				if(ability_have[10]!=-1){
					if(key_item[ability_have[10]]!=-1){
						heal_now = true;
						onClickSE(17);
						heal();
					}else{
						if(gold>=heal_price){
							gold -= heal_price;
							heal_price *= 2;
							heal_now = true;
							onClickSE(1);
							heal();
						}else{
							onClickSE(4);
						}
					}
				}else{
					if(gold>=heal_price){
						gold -= heal_price;
						heal_price *= 2;
						heal_now = true;
						onClickSE(17);
						heal();
					}else{
						onClickSE(4);
					}
				}
			}
			//bt1,2,3の実行
			if(!heal_now){
			if(485<x && x<775 && 80<y && y<175){
				phase = 3;
				onClickSE(1);
				window.cancelAnimationFrame(requestId);
				renderExplore();
			}
			if(485<x && x<775 && 175<y && y<285){
				phase = 4;
				poly_eff.length = 0;
				onClickSE(1);
				window.cancelAnimationFrame(requestId);
				renderAlchemy();
			}
			if(485<x && x<775 && 285<y && y<380){
				phase = 5;
				if(quest_num%2==0){
					quest_num++;
					quest_item = Math.floor(Math.random()*(2.5*quest_num))%25;
					quest_sum = Math.floor((Math.random()*(1+quest_num))/2)+1;
					if(ability_have[1]!=-1){
						if(key_item[ability_have[1]]!=-1 && hp==0){
							quest_sum = Math.floor(quest_sum/2) +1;
						}
					}
				}
				onClickSE(1);
				window.cancelAnimationFrame(requestId);
				renderQuest();
			}
			}
			if(0<x && x<80 && 0<y && y<60){
				pict = 1;
			}
			}else{
				pict = 0;
			}

		}else if(phase==3 && !music_click){
		//renderExplore
			if(cnt[2]<120){
				phase = 2;
				cnt[2] = 0;
				onClickSE(2);
				window.cancelAnimationFrame(requestId);
				renderMain();
			}
			if(cnt[6]==10 && (on_mouse_exp == 1 || on_mouse_exp == 2)){
				phase = 6;
				cnt[2] = 0;
				cnt[6] = 0;
				if(cnt[20]==0){
				var area;
				if(on_mouse_exp == 1){
					area = rnd1;
				}else{
					area = rnd2;
				}
				if(area<7){
					if(music_next!=2 && music_next!=3)audioChange(2);
				}else if(6<area && area<16){
					if(music_next!=3 && music_next!=4)audioChange(3);
				}else if(area==16){
					if(music_next!=4 && music_next!=5)audioChange(4);
				}else if(16<area && area<24){
					if(music_next!=5 && music_next!=6)audioChange(5);
				}else if(23<area && area<30){
					if(music_next!=6 && music_next!=7)audioChange(6);
				}else if(29<area && area<34){
					if(music_next!=7 && music_next!=8)audioChange(7);
				}else if(area==34){
					if(music_next!=8 && music_next!=9)audioChange(8);
				}else if(34<area && area<47){
					if(music_next!=9 && music_next!=10)audioChange(9);
				}else if(46<area && area<55){
					if(music_next!=10 && music_next!=11)audioChange(10);
				}else if(area==55){
					if(music_next!=11)audioChange(11);
					if(cnt[20]==0 && !status.match(/イカサマ/))status = "真実の錬金術士";
				}
				}
				onClickSE(5);
				window.cancelAnimationFrame(requestId);
				renderExplore3();
			}
			
		}else if(phase==4 && !music_click){
		//renderAlc
			if(cnt[2]<120){
				phase = 2;
				cnt[2] = 0;
				cnt[6] = 0;
				onClickSE(2);
				window.cancelAnimationFrame(requestId);
				renderMain();
			}

			var on_void = true;
	if(535<x && x<755 && 150<y && y<230){
				on_mouse_alc = -1;
				on_click_alc = -1;
				itemPoly();
				on_void = false;
			}
			if(260<x && x<480 && 435<y && y<515){
				itemUse();
				var i_cnt = 0;
				for(var i = 0; i<3; i++){
					if(alc_item[i] == on_click_alc)i_cnt++;
				}
				var tar = item_stack[on_click_alc];
				if(tar == 2 && i_cnt == 3){
					alc_item[2] = -1;
				}
				if(tar == 1 && i_cnt == 2){
					if(alc_item[2] == on_click_alc){alc_item[2] = -1;
					}else if(alc_item[1] == on_click_alc){alc_item[1] = -1;
					}
				}
				if(tar == 0){
					if(alc_item[2] == on_click_alc)alc_item[2] = -1;
					if(alc_item[1] == on_click_alc)alc_item[1] = -1;
					if(alc_item[0] == on_click_alc)alc_item[0] = -1;
				}
				on_void = false;
			}
			if(500<x && x<720 && 435<y && y<515){
				sell();
				var i_cnt = 0;
				for(var i = 0; i<3; i++){
					if(alc_item[i] == on_click_alc)i_cnt++;
				}
				var tar = item_stack[on_click_alc];
				if(tar == 2 && i_cnt == 3){
					alc_item[2] = -1;
				}
				if(tar == 1 && i_cnt == 2){
					if(alc_item[2] == on_click_alc){alc_item[2] = -1;
					}else if(alc_item[1] == on_click_alc){alc_item[1] = -1;
					}
				}
				if(tar == 0){
					if(alc_item[2] == on_click_alc)alc_item[2] = -1;
					if(alc_item[1] == on_click_alc)alc_item[1] = -1;
					if(alc_item[0] == on_click_alc)alc_item[0] = -1;
				}
				on_void = false;
			}

			var sub = on_click_alc;
			if(on_void)on_click_alc = -1;
			for(var i = 0; i < 5; i++){
				for(var j = 0; j < 5; j++){
					if(244+j*52<x && x<244+j*52+48 && 154+i*52<y && y<154+i*52+48){
						on_click_alc = i*5+j;
						if(item_stack[i*5+j]>0 && sub == on_click_alc){
						for(var k = 0; k<3; k++){
							if(alc_item[k] == -1){
								var check = true;
								if(alc_item[0] == sub && item_stack[sub]<2)check = false;
								if(alc_item[1] == sub && item_stack[sub]<2)check = false;
								if(alc_item[2] == sub && item_stack[sub]<2)check = false;
								if(alc_item[0] == sub && alc_item[1] == sub && item_stack[sub]<3)check = false;
								if(alc_item[0] == sub && alc_item[2] == sub && item_stack[sub]<3)check = false;
								if(alc_item[1] == sub && alc_item[2] == sub && item_stack[sub]<3)check = false;
								if(check)alc_item[k]=i*5+j; break;
							}
						}
						}
					}
				}
			}
			for(var i = 0; i<3; i++){
				if(240+100*i<x && x<305+100*i && 70<y && y<135)alc_item[i]=-1;
			}

			if((0<x && x<800 && 0<y && y<60) || (0<x && x<800 && 520<y && y<600)){
				phase = 2;
				cnt[2] = 0;
				cnt[6] = 0;
				for(var i = 0; i<3; i++){
					if(alc_item[i]!=-1) alc_item[i]=-1;
				}
				onClickSE(2);
				window.cancelAnimationFrame(requestId);
				renderMain();
			}
			
		}else if(phase==5 && !music_click){
		//renderQuest
			if(cnt[2]<120){
				phase = 2;
				cnt[2] = 0;
				onClickSE(2);
				window.cancelAnimationFrame(requestId);
				renderMain();
			}
			if(quest_conversation==1){quest_conversation = 0;cnt[6] = 0;}
			if((0<x && x<800 && 0<y && y<60) || (0<x && x<800 && 520<y && y<600)){
				phase = 2;
				quest_conversation = 0;
				cnt[2] = 0;
				cnt[5] = 0;
				cnt[6] = 0;
				cnt[7] = 0;
				onClickSE(2);
				window.cancelAnimationFrame(requestId);
				renderMain();
			}
			if(cnt[5]==100){
			if(quest_conversation<2 && 220<x && x<390 && 435<y && y<515){
				cnt[6] = 0;
				if(key_achieve<2 && quest_num>18){
					onClickSE(4);
				}else{
					if(item_stack[quest_item]>quest_sum-1){
						onClickSE(3);
						quest_conversation=2;
						item_stack[quest_item] -= quest_sum;
						quest_num++;
					}else{
						onClickSE(4);
						quest_conversation=1;
					}
				}
			}
			if(quest_conversation<2 && 305<x && x<495 && 345<y && y<425){
				if(ability_have[7]!=-1){
					if(key_item[ability_have[7]]!=-1){
						cnt[6] = 0;
						if(gold>quest_item*100*quest_sum-1){
							onClickSE(3);
							quest_conversation=2;
							gold -= quest_item*100*quest_sum;
							quest_num++;
						}else{
							onClickSE(4);
							quest_conversation=1;
						}
					}
				}
			}
			if(410<x && x<580 && 435<y && y<515){
				phase = 2;
				quest_conversation = 0;
				cnt[2] = 0;
				cnt[5] = 0;
				cnt[6] = 0;
				cnt[7] = 0;
				onClickSE(2);
				window.cancelAnimationFrame(requestId);
				renderMain();
			}
			}
		}else if(phase==6 && !music_click){
			if(cnt[4]>0){
				if(hp!=0 && (exp_str[0] == '疲れたから、もう帰る。' || (0<x && x<800 && 0<y && y<60) || (0<x && x<800 && 520<y && y<600))){
					if((0<x && x<800 && 0<y && y<60) || (0<x && x<800 && 520<y && y<600)){
						run++;
						if(run>0 && !status.match(/イカサマ/))status = "Ｂ級バックラー";
						if(run>5 && !status.match(/イカサマ/))status = "Ａ級バックラー";
						if(run>9 && !status.match(/イカサマ/))status = "Ｓ級バックラー";
						if(run>20 && !status.match(/イカサマ/))status = "バックレ錬金術士";
					}
					if(item_eff[6]==1)item_eff[6] = 0;
					if(item_eff[16]==1)item_eff[16] = 0;
					if(item_eff[22]==1 && (exp_area==31 || (34<exp_area && exp_area<47)))item_eff[22]=0;
					phase = 2;
					cnt[2] = 0;
					cnt[4] = 0;
					cnt[5] = 0;
					onClickSE(13);
					window.cancelAnimationFrame(requestId);
					renderMain();
				}
			}
		}
		music_click = false;
	}
}