function exploreEvent(){
	if(happy>200-use_drink)happy-=use_drink;
	var num = Math.floor(Math.random()*20);
	var time = num/2+3;
	if(ability_have[12]!=-1){
		if(key_item[ability_have[12]]!=-1)time*=1.2;
	}
	cnt[92]+=time;
	modTime();
	//雪原
	if(exp_area==31 && item_eff[22]==0){
		happy -= 150;
		if(happy<0)happy = 0;
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		exp_str[0] = '寒さで心が折れそうだ……！';
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		exp_str[0] = '絵奈鳥の心に１５０ダメージ！';
	}
	//異界
	if(34<exp_area && exp_area<46){
		if(key_item[3]==-1 && item_eff[22]==0){
			hp -= 150;
			if(hp<0)hp = 0;
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			exp_str[0] = '異界では息が出来ない……！';
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			exp_str[0] = '絵奈鳥に１５０ダメージ！';
		}
	}
	//溶解
	if(exp_area==46 && item_eff[22]==0){
		hp -= 150;
		if(hp<0)hp = 0;
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		exp_str[0] = '身体が焼かれている……！';
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		exp_str[0] = '絵奈鳥に１５０ダメージ！';
	}
	if(exp_status!=-1){
		if(exp_status==0){
			//転落
			exp_status = Math.floor(Math.random()*2)-1;
			var hit = Math.floor(Math.random()*3);
			if(hit==0){
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '足を挫いて動けない！';
				return;
			}
		}else if(exp_status==100 || exp_status==101 || exp_status==102){
			//戦闘
			exp_status++;
			var rnd = Math.floor(Math.random()*6);
			var vict = false;
			if(item_eff[15]==1){
				onClickSE(11);
				item_eff[15]=0;
				exp_status=-1;
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '絵奈鳥「ヒャッハーー！！」';
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = 'モンスターを爆殺した！';
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				var i = Math.floor(Math.random()*10+15);
				var n = Math.floor(Math.random()*3+1);
				item_stack[i]+=n;
				exp_str[0] = item[i]+'を'+n+'個手に入れた。';
				score += 750;
				return;
			}
			if(ability_have[0]!=-1){
				if(key_item[ability_have[0]]!=-1){
					if(rnd<3)vict = true;
				}
			}
			if(ability_have[6]!=-1){
				if(key_item[ability_have[6]]!=-1){
					if(rnd<4)vict = true;
				}
			}
			if(vict){
				onClickSE(14);
				exp_status=-1;
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '絵奈鳥「天誅ゥゥゥーーーッッ！！」';
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '絵奈鳥の攻撃！　モンスターは爆発四散！';
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = 'モンスターを倒した！';
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				var i = Math.floor(Math.random()*10+15);
				var n = Math.floor(Math.random()*5+1);
				item_stack[i]+=n;
				exp_str[0] = item[i]+'を'+n+'個手に入れた。';
				score += 200;
			}else{
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '絵奈鳥「ハイヤァァァＡＡＡＨＨＨＨ！！」';
				var dmg = Math.floor(score/200)-exp_mon_def;
				if(dmg<0)dmg=0;
				if(dmg>99)dmg=99;
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '絵奈鳥の攻撃！　モンスターに'+dmg+'ダメージ！';
				exp_mon_hp -= dmg;
				if(exp_mon_hp<1)vict=true;
				if(vict){
					onClickSE(15);
					exp_status=-1;
					for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
					exp_str[0] = 'モンスターを倒した！';
					for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
					var i = Math.floor(Math.random()*10+15);
					var n = Math.floor(Math.random()*3+1);
					item_stack[i]+=n;
					exp_str[0] = item[i]+'を'+n+'個手に入れた。';
					score += 200;
				}else{
					onClickSE(10);
					dmg = exp_mon_atk-Math.floor(score/500);
					if(dmg<0)dmg=0;
					if(dmg>99)dmg=99;
					if(ability_have[2]!=-1){
						if(key_item[ability_have[2]]!=-1)dmg=Math.floor(dmg*0.5);
					}
					hp -= dmg;
					if(hp<0)hp=0;
					for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
					exp_str[0] = 'モンスターの攻撃！　絵奈鳥に'+dmg+'ダメージ！';
					score += 100;
				}

			}
			limitCheck();
			if(item_eff[17]==1 && (hp==0 || happy==0)){
				onClickSE(17);
				if(hp==0)hp=30;
				if(happy==0)happy=60;
				item_eff[17]=0;
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '絵奈鳥「オンビートだ」'
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '絵奈鳥は蘇った。'
			}
			if(ability_have[8]!=-1){
				if(key_item[ability_have[8]]!=-1 && hp==0){
					onClickSE(12);
					hp=200;
					for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
					exp_str[0] = '不死の力で蘇った！'
				}
			}
			if(hp==0 || happy==0){
				charDefault = 6;
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '死んでしまった……！'
			}
			return;
		}else if(exp_status==103){
			//逃走
			onClickSE(13);
			exp_status=-1;
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			exp_str[0] = '絵奈鳥は逃げ出した！';
			return;
		}
	}
	if(item_eff[6]==1 && num==1){
		num=6;
	}
	if(gather_chance>0 && num<8+gather_chance*2){
		gather_chance = 0;
		num = 0;
	}
	for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
	switch (num){
	case  0 : 
		onClickSE(18);
		var i = Math.floor(Math.random()*20);
		if(exp_area>50)i+=5;
		if((exp_area==31 || exp_area==46) && i<10)i=20;
		item_stack[i]++;
		score += 10;
		exp_str[0] = item[i]+'を手に入れた。';
		break;
	case  1 : 
		onClickSE(16);
		var dmg = Math.floor(Math.random()*7+3);
		if(ability_have[2]!=-1){
			if(key_item[ability_have[2]]!=-1)dmg=Math.floor(dmg*0.3);
		}
		hp -= dmg;
		if(hp<1)hp=0;
		score += 10;
		happy -= dmg;
		if(happy<1)happy=0;
		charDefault = 6;
		exp_str[0] = '転んだ！　絵奈鳥に'+dmg+'ダメージ。';
		break;
	case  2 : 
		onClickSE(8);
		var g = Math.floor(Math.random()*70+30);
		gold += g;
		score += 10;
		if(happy<200){
			happy += g/10;
			if(happy>200)happy = 200;
		}
		charDefault = 2;
		exp_str[0] = 'お金を拾った。'+g+'ゴールド獲得。';
		break;
	case  3 : 
		onClickSE(21);
		var per = (100-Math.floor(Math.random()*41-20))/100;
		exp_mon_hp  = Math.floor(exp_area * per)+1;
		exp_mon_atk = Math.floor(exp_area * per)+1;
		exp_mon_def = Math.floor(exp_area/5 * per)+1;
		var sys = '';
		if(per>1.15)sys='強めの';
		if(per<0.86)sys='弱めの'
		exp_str[0] = sys+'モンスターが現れた！';
		exp_status = 100;
		break;
	case  4 : 
		gather_chance++;
		exp_str[0] = '素材の気配がする……。';
		break;
	case  5 : 
		onClickSE(17);
		if(happy<200){
			happy += Math.floor((200-happy)*0.3)+1;
			if(happy>200)happy = 200;
		}
		charDefault = 7;
		exp_str[0] = 'ほのかな幸せを感じた。';
		break;
	case  6 : 
		onClickSE(16);
		var hit = Math.floor(Math.random()*56);
		score += 10;
		if(happy<201)happy /= 10;
		if(happy<1)happy=0;
		charDefault = 6;
		if(hit<exp_area){
			var dmg = Math.floor(Math.random()*40+30);
			if(ability_have[2]!=-1){
				if(key_item[ability_have[2]]!=-1)dmg=Math.floor(dmg*0.8);
			}
			hp -= dmg;
			if(hp<1)hp=0;
			exp_str[0] = '崖から落ちた！　絵奈鳥に'+dmg+'ダメージ。';
		}else{
			exp_status = 0;
			exp_str[0] = '崖から落ちた！　足を挫いた！';
		}
		break;
	case  7 : 
		var n = Math.floor(Math.random()*21);
		if(key_achieve<2 && n>8){
			if(happy<201){
				exp_str[0] = '何も無かった。';
			}else{
				onClickSE(17);
				charDefault = 7;
				exp_str[0] = 'ほのかな幸せを感じた。';
			}
		}else{
			if(key_item_know[Math.floor(n/3)][n%3]==-1){
				onClickSE(9);
				key_item_know[Math.floor(n/3)][n%3] = 0;
				exp_str[0] = '錬成のヒントを得た！';
			}else{
				if(happy<201){
					exp_str[0] = '何も無かった。';
				}else{
					onClickSE(17);
					charDefault = 7;
					exp_str[0] = 'ほのかな幸せを感じた。';
				}
			}
		}
		break;
	case  8 : 
		exp_str[0] = '面接官が現れた！';
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		var v = Math.floor(Math.random()*(2+item_eff[15]));
		if(v==0){
			onClickSE(20);
			if(happy<100){hp = 0; happy = 0;}else if(happy<201){happy -= 100;}
			exp_str[0] = '祈　ら　れ　た　！　';
		}else{
			if(item_eff[15]==1){
				onClickSE(11);
				item_eff[15]=0;
				exp_str[0] = '絵奈鳥「ヒャッハーー！！」';
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '面接官を爆殺した！';
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				var i = Math.floor(Math.random()*5+20);
				var n = Math.floor(Math.random()*2+3);
				item_stack[i]+=n;
				exp_str[0] = item[i]+'を'+n+'個手に入れた。';
				score += 2000;
				
			}else{	
				onClickSE(19);
				score += 100;
				exp_str[0] = 'うまくやり過ごした！';
			}
		}
		break;
	case  9 : 
		exp_str[0] = '道端でパンを拾った。';
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		var dmg = Math.floor(Math.random()*20-10+item_eff[11]*20);
		hp += dmg;
		if(ability_have[2]!=-1){
			if(key_item[ability_have[2]]!=-1){
				if(dmg<0)dmg=Math.floor(dmg*0.5);
			}
		}
		if(dmg>0){
			onClickSE(17);
			if(item_eff[11]==1){
				if(happy<200){happy+=dmg;if(happy>200)happy=200;}
				item_eff[11] = 0;
				exp_str[0] = '幸せの味だ！　絵奈鳥のＨＰが'+dmg+'回復！';
			}else{
				exp_str[0] = 'おいしい！　絵奈鳥のＨＰが'+dmg+'回復！';
			}
		}else if(dmg==0){
			exp_str[0] = 'やっぱり捨てた。';
		}else{
			onClickSE(16);
			exp_str[0] = '腐っていた！　絵奈鳥に'+(-dmg)+'ダメージ。';
		}
		break;
	case 10 : 
		gather_chance++;
		if(exp_area==0 || exp_area==3 || exp_area==5){
			onClickSE(8);
			var g = Math.floor(Math.random()*70+30);
			gold += g;
			exp_str[0] = 'お賽銭を拾った。'+g+'ゴールド獲得。';
		}else{
			if(happy<201){
				exp_str[0] = '何も無かった。';
			}else{
				onClickSE(17);
				charDefault = 7;
				exp_str[0] = 'ほのかな幸せを感じた。';
			}
		}
		break;
	case 11 : 
		gather_chance++;
		if(11<exp_area && exp_area<17){
			onClickSE(18);
			exp_str[0] = '澄んだ湧水を見つけた。';
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			var n = Math.floor(Math.random()*3+1);
			item_stack[0]+=n;
			exp_str[0] = item[0]+'を'+n+'個手に入れた。';
		}else{
			if(happy<201){
				exp_str[0] = '何も無かった。';
			}else{
				onClickSE(17);
				charDefault = 7;
				exp_str[0] = 'ほのかな幸せを感じた。';
			}
		}
		break;
	case 12 : 
		gather_chance++;
		if(exp_area==17 || exp_area==18 || exp_area==19){
			onClickSE(18);
			exp_str[0] = '天然の塩を見つけた。';
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			var n = Math.floor(Math.random()*5+1);
			item_stack[1]+=n;
			exp_str[0] = item[1]+'を'+n+'個手に入れた。';
		}else{
			if(happy<201){
				exp_str[0] = '何も無かった。';
			}else{
				onClickSE(17);
				charDefault = 7;
				exp_str[0] = 'ほのかな幸せを感じた。';
			}
		}
		break;
	case 13 : 
		gather_chance++;
		if(exp_area==8){
			onClickSE(18);
			exp_str[0] = 'きのこが生えている。';
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			var n = Math.floor(Math.random()*5+1);
			item_stack[6]+=n;
			exp_str[0] = item[6]+'を'+n+'個手に入れた。';
		}else if(exp_area==30){
			exp_str[0] = '古びた像が落ちている。';
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			var n = Math.floor(Math.random()*4);
			item_stack[19]+=n;
			if(n==0){
				exp_str[0] = '偶像は崩れてしまった……。';
			}else{
				onClickSE(18);
				exp_str[0] = item[19]+'を'+n+'個手に入れた。';
			}
		}else{
			if(happy<201){
				exp_str[0] = '何も無かった。';
			}else{
				onClickSE(17);
				charDefault = 7;
				exp_str[0] = 'ほのかな幸せを感じた。';
			}
		}
		break;
	case 14 : 
		gather_chance++;
		if(exp_area==29){
			onClickSE(12);
			var n = Math.floor(Math.random()*45);
			cnt[92]+=n;
			modTime();
			n = Math.floor(Math.random()*2);
			cnt[96]+=n;
			exp_str[0] = '時空が歪んでいる。';
		}else{
			if(happy<201){
				exp_str[0] = '何も無かった。';
			}else{
				onClickSE(17);
				charDefault = 7;
				exp_str[0] = 'ほのかな幸せを感じた。';
			}
		}
		break;
	case 15 : gather_chance++;
		if(happy<201){
			exp_str[0] = '何も無かった。';
		}else{
			onClickSE(17);
			charDefault = 7;
			exp_str[0] = 'ほのかな幸せを感じた。';
		}
		break;
	case 16 :gather_chance++;
		if(happy<201){
			exp_str[0] = '何も無かった。';
		}else{
			onClickSE(17);
			charDefault = 7;
			exp_str[0] = 'ほのかな幸せを感じた。';
		}
		break;
	case 17 : gather_chance++;
		if(happy<201){
			exp_str[0] = '何も無かった。';
		}else{
			onClickSE(17);
			charDefault = 7;
			exp_str[0] = 'ほのかな幸せを感じた。';
		}
		break;
	case 18 : gather_chance++;
		if(happy<201){
			exp_str[0] = '何も無かった。';
		}else{
			onClickSE(17);
			charDefault = 7;
			exp_str[0] = 'ほのかな幸せを感じた。';
		}
		break;
	case 19 : 
		if((key_achieve<3 && quest_item!=-1 && quest_item<20) || (exp_area>51 && quest_item!=-1)){
			onClickSE(18);
			item_stack[quest_item]++;
			score += 10;
			exp_str[0] = item[quest_item]+'を手に入れた。';
		}else{
			gather_chance++;
			if(happy<201){
				exp_str[0] = '何も無かった。';
			}else{
				onClickSE(17);
				charDefault = 7;
				exp_str[0] = 'ほのかな幸せを感じた。';
			}
		}
		break;

	}
	limitCheck();
	if(item_eff[17]==1 && (hp==0 || happy==0)){
		onClickSE(17);
		if(hp==0)hp=30;
		if(happy==0)happy=60;
		item_eff[17]=0;
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		exp_str[0] = '絵奈鳥「オンビートだ」'
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		exp_str[0] = '絵奈鳥は蘇った。'
	}
	if(ability_have[8]!=-1){
		if(key_item[ability_have[8]]!=-1 && hp==0){
			onClickSE(12);
			hp=200;
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			exp_str[0] = '不死の力で蘇った！'
		}
	}
	if(hp==0 || happy==0){
		charDefault = 6;
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		if(hp==0){
			exp_str[0] = '死んでしまった……！'
		}else{
			exp_str[0] = '心が折れてしまった……！'
		}
	}
}