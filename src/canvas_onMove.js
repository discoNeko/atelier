function onMove(e){
	var rect = e.target.getBoundingClientRect();
	var x =  Math.round(e.clientX - rect.left);
	var y =  Math.round(e.clientY - rect.top);
	//console.log(x+" "+y);
	on_mouse_help = '';

	if(phase == 0){
		on_mouse_title = -1;
		if(400<x && x<680 && 400<y && y<490)on_mouse_title = 1;
	}
	if(phase == 2){
		if(270<x && x<450 && 70<y && y<110){
			if(key_item[0]!=-1 && key_item[1]!=-1 && key_item[2]!=-1){
				on_mouse_help = '成果物を提出して面接を乗り越えよう。';
			}else{
				on_mouse_help = 'マトモな成果物を生み出して、面接を乗り越えよう。';
			}
		}
		if(80<x && x<280 && 40<y && y<50)on_mouse_help = '幸福度メーター：絵奈鳥の精神状態を表している。幸福度が尽きると死ぬ。';
		if(25<x && x<135 && 540<y && y<590)on_mouse_help = '残り時間：面接までの残り時間。成果物を仕上げないと祈られて死ぬ。';

		if(pict==0){
			if(240<x && x<475 && 210<y && y<420){
				if(drag==0){
					drag = 1;
					charDefault = 2;
				}
				on_mouse_help = '不思議なエナドリ：飲むと気持ち良くなる不思議なエナドリ【総数：'+cnt_drink+'】';
			}else{
				if(drag==1){
					drag = 0;
					charDefault = 0;
				}
			}
		}

		on_mouse_main = -1;
		for(var i = 0; i < 3; i++){
			if(487<x && x<775 && 80+100*i<y && y<180+100*i){
				on_mouse_main = i;
				switch(i){
					case 0 : on_mouse_help = '素材を求めて採集へ出掛ける。'; break;
					case 1 : on_mouse_help = '所持アイテムを使って錬金を始める。'; break;
					case 2 : on_mouse_help = '街の人から依頼を受ける。'; break;
				}
			}
			if(236+85*i<x && x<310+85*i && 120<y && y<195){
				if(key_item[i+key_pos]!=0){
					on_mouse_help = '合成レシピ'+(i+1+key_pos);
				}else{
					on_mouse_help = ability[key_ability[i+key_pos]];
				}
			}
		}
		if(570<x && x<690 && 390<y && y<440){
			on_mouse_main = 3;
			on_mouse_help = heal_price+'GOLDを支払って、HPと幸福度を回復する。';
			if(ability_have[10]!=-1){
				if(key_item[ability_have[10]]!=-1){
					on_mouse_help = '無料でHPと幸福度を回復する。';
				}
			}
		}
	}
	if(phase == 3){
		on_mouse_exp = -1;
		if(240<x && x<480 && 160<y && y<380){
			on_mouse_exp = 1;
		}
		if(510<x && x<750 && 160<y && y<380){
			on_mouse_exp = 2;
		}
	}
	if(phase == 4){
		on_mouse_alc = -1;
		for(var i = 0; i < 5; i++){
			for(var j = 0; j < 5; j++){
				if(244+j*52<x && x<244+j*52+48 && 154+i*52<y && y<154+i*52+48)on_mouse_alc = i*5+j;
			}
		}
		if(245<x && x<500 && 155<y && y<410)on_mouse_help = 'クリックで選択。ダブルクリックで錬成素材に指定。';
		on_mouse_alc_menu = -1;
		if(535<x && x<755 && 145<y && y<228){
			on_mouse_alc_menu = 0;
			if(alc_item[3]==-1){
				on_mouse_help = '指定したアイテムで錬金を行う。';
			}else if(0<alc_item[3] && alc_item[3]<14){
				on_click_alc = -1;
				var str = ability[alc_item[3]];
				on_mouse_help = str.substring(0, str.indexOf("："))+'を錬成した！';
			}else{
				on_click_alc = -1;
				on_mouse_help = 'エナドリ錬成した！';
			}
		}else{
			alc_item[3] = -1;
		}
		if(260<x && x<480 && 435<y && y<515){
			on_mouse_alc_menu = 1;
			on_mouse_help = '選択したアイテムを使用する。';
		}
		if(500<x && x<720 && 435<y && y<515){
			on_mouse_alc_menu = 2;
			on_mouse_help = '選択したアイテムを売却してお金を得る。';
		}
		if((0<x && x<800 && 0<y && y<60) || (0<x && x<800 && 520<y && y<600)){
			on_mouse_help = 'メニュー画面に戻る。';
		}

	}
	if(phase == 5){
		if(cnt[5]==100){
			on_mouse_quest = -1;
			if(220<x && x<390 && 435<y && y<515){
				on_mouse_quest = 0;
				on_mouse_help = 'アイテムを渡して依頼を解決する。';
			}
			if(410<x && x<580 && 435<y && y<515){
				on_mouse_quest = 1;
				on_mouse_help = 'メニュー画面に戻る。';
			}
			if(305<x && x<495 && 345<y && y<425){
				on_mouse_quest = 2;
				if(ability_have[7]!=-1){
					if(key_item[ability_have[7]]!=-1){
						on_mouse_help = quest_item*100*quest_sum+'GOLD支払って依頼を解決する。';
					}
				}
			}
			if((0<x && x<800 && 0<y && y<60) || (0<x && x<800 && 520<y && y<600)){
				on_mouse_help = 'メニュー画面に戻る。';
			}
		}
	}
	if(phase==6){
		if(cnt[5]>0 && (0<x && x<800 && 0<y && y<60) || (0<x && x<800 && 520<y && y<600)){
			on_mouse_help = '採集を中断して、メニュー画面に戻る。';
		}
		if(click_wait || exp_str[0] == '疲れたから、もう帰る。'){
			on_mouse_help = '画面をクリック。';
		}
	}
}