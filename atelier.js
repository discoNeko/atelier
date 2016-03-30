(function() {
	var w = 800, h = 600;
	var cnt = [];
	var phase = 0;
	var achieve = 0;
	var charDefault;
	var happy = 200;
	var hp = 100;
	var gold = 100;
	var score = 0;
	var status = "見習い錬金術士";
	var alc_item = [-1,-1,-1,-1];
	var drag = 0;
	var pict = 0;
	var earn_exp;
	var key_item = [-1,-1,-1,-1,-1,-1,-1];
	var key_ability = [];
	var key_item_recipe = [];
	var key_item_know = [];
	var key_item_help = [];
	for(var i in key_item){
		key_ability[i] = -1;
		key_item_recipe[i] = [-1,-1,-1];
		key_item_know[i] = [-1,-1,-1];
		key_item_help[i] = '';
	}
	var key_pos = 0;
	var key_achieve = 0;
	var quest_item = -1;
	var quest_sum;
	var quest_num = 0;
	var exp_area = 0;
	var exp_drag = -1;
	var exp_str = [];
	var exp_act;
	var exp_act_num;
	var exp_status = -1;
	var exp_mon_hp;
	var exp_mon_atk;
	var exp_mon_def;
	var click_mute = false;
	var click_wait = false;
	var click_wait2 = false;
	var click_wait3 = false;
	var quest_conv = 0;
	var quest_chance = 0;
	var cnt_taima = 0;
	var have_taima = 0;
	var use_taima = 0;
	var heal_now = false;
	var heal_price = 100;
	var ending_num;
	var music_next;
	var music_play = 0;
	var music_mute = false;
	var on_drag = false;
	var drag_num = 500;
	var drag_x = [];
	var drag_y = [];
	var drag_vx = [];
	var drag_vy = [];
	var drag_radius = [];
	var drag_r = [];
	var drag_g = [];
	var drag_b = [];
	for(var i = 0; i<drag_num; i++){
		drag_vx[i] = Math.random()*8-4;
		drag_vy[i] = Math.random()*8-4;
		drag_x[i] = 400+Math.random()*50-25;
		drag_y[i] = 300+Math.random()*50-25;
		drag_radius[i] = Math.random()*8+1;
		drag_r[i] = Math.floor(Math.random() * 64);
		drag_g[i] = Math.floor(Math.random() * 64);
		drag_b[i] = Math.floor(Math.random() * 64);
	}
	var poly_eff = [];
	var poly_x = [];
	var poly_y = [];
	var poly_vx = [];
	var poly_vy = [];
	var poly_radius = [];
	var poly_r = [];
	var poly_g = [];
	var poly_b = [];
	var run = 0;
	var end_pict = [];
	var end_y = [];
	var pon = 0;
	var heal_time = 0;
	var unknown;
	var back = 55;

	var audio_drag = new Audio();
	var audio_def = new Audio();
	var audio_se = new Audio();
		//  1 : nc80345
		//  2 : nc19441
		//  3 : nc120477
		//  4 : nc120575
		//  5 : nc72095
		//  6 : nc49298
		//  7 : nc74823
		//  8 : nc81984
		//  9 : nc21139
		// 10 : nc32
		// 11 : nc74

	var on_click_beast = -1;
	var on_click_alc = -1;
	var on_mouse_help = '';
	var on_mouse_title = -1;
	var on_mouse_main = -1;
	var on_mouse_exp = -1;
	var on_mouse_alc = -1;
	var on_mouse_alc_menu = -1;
	var on_mouse_quest = -1;

	var rnd1;
	var rnd2;

	var requestId;

	var ability = [
		'戦闘民族の血：採集中の戦闘に１/２の確率で勝利する。',
		'交渉術：依頼で要求されるアイテムの個数が減る。',
		'古い甲冑：採集中に受けるダメージが減る。',
		'砂時計：あらゆる行動にかかる時間が半分になる。',
		'成金袋：３分毎に所持金の１％のお金を得る。',
		
		'異界探訪：異界でも活動できるようになる。',
		
		'戦闘民族の血：採集中の戦闘に２/３の確率で勝利する。',
		'賄賂：依頼を金で解決できるようになる。',
		'不死の法：ＨＰが０になると全回復する。',
		'ピンチで時短：ＨＰが２０未満のとき、行動にかかる時間が１/５になる。',
		'高級テント：休憩が無料になる。',
		
		'効率ピッケル：採集中の行動回数が増える。',
		'トロフィー：行動にかかる時間が２０％、最終スコアが５０％増える。',
		'薬物耐性：エナジードリンク、キメ放題！',
	];
	var ability_have = [];
	for (var i in ability)ability_have[i] = -1;

	for(var i = 0; i<15; i++)exp_str[i] = '';

	var item = [
		'水',		'塩',		'薬草',		'毒草',	'青果実',
		'赤果実',	'きのこ',	'煙草',		'葉巻',	'薬物',
		'錠剤',		'黒砂糖',		'液体',		'螺旋',	'菌',
		'爆発物',	'猫の手',	'心臓',		'髑髏',	'偶像',
		'箱',		'カード',	'マスク',	'弾頭',	'リボン'
	];
	var item_help = [
		['普通の水',		'・ＨＰ＋１',		''],
		['初恋の味',		'・幸福度＋１',		''],
		['薬草',		'・稀にＨＰ回復',	'・稀にＨＰ減少'],
		['毒草',		'・稀に幸福度回復',	'・稀に幸福度減少'],
		['青果実',		'・ＨＰ＋３０',		''],
		['赤果実',		'・幸福度＋３０',	''],
		['加速するきのこ',	'・スピードアップ',	'・転落しやすさ＋１'],
		['味がしないらしい',	'・特に無し',		''],
		['葉巻',		'・特に無し',		''],
		['運気が上がるサプリ',	'・運気アップ',		'※個人差があります'],
		['身長が伸びるサプリ',	'・背が伸びる',		'※個人差があります'],
		['幸せの白い粉の元',	'・パンが美味くなる',	''],
		['液体',		'・特に無し',		''],
		['螺旋',		'・特に無し',		''],
		['菌',			'・特に無し',		''],
		['ひゃっはー',		'・敵を爆殺',		''],
		['借りたい',		'・採集回数＋１',	''],
		['心臓',		'・一度だけ蘇生',	''],
		['髑髏',		'・ＨＰ－５０',		''],
		['祈りなさい',		'・残り時間＋１',	''],
		['夢が詰まっている',	'・素材獲得',		''],
		['金が詰まっている',	'・ＧＯＬＤ獲得',	''],
		['マスク',		'・過酷な場所でも',	'　一度だけ活動可能'],
		['度胸試し',		'・リセットボタン',	''],
		['希少品',		'・特に無し',		'']
	];
	var item_stack = [];
	var item_stack_once = [];
	var item_eff = [];
	for (var i in item) {
		item_stack[i] = 0;
		item_stack_once[i] = 0;
		item_eff[i] = 0;
	}

	var canvas = document.getElementById('canvas');
	canvas.addEventListener("click", onClick, false);
	canvas.addEventListener('mousemove', onMove, false);
	var ctx = canvas.getContext('2d');
		
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,w,h);
	var chars = new Image();
	chars.src = 'img/char.png';

	var fields = new Image();
	fields.src = 'img/field.jpg';

	var ends = new Image();
	ends.src = 'img/end.png';

	var frames = new Image();
	frames.src = 'img/frame.png';

	var icons = new Image();
	icons.src = 'img/icon.png';

	var pop = new Image();
	pop.src = 'img/pop.png';
	
	var hand = new Image();
	hand.src = 'img/hand.png';

	var deco1 = new Image();
	deco1.src = 'img/deco1.png';

	var deco2 = new Image();
	deco2.src = 'img/deco2.png';

	var logo = new Image();
	logo.src = 'img/logo.png';

	var field_name = [
		'　鳥　居',	'　石　段',	'　石　段',	'　参　道',	'　湖　畔',
		'　鳥　居',	'　樹　林',	'　森　林',	'　樹　道',	'　紅　葉',
		'　疎　林',	'　庭　園',	'　上　流',	'　下　流',	'　河　川',
		'　湖　島',	'　花　園',	'　浜　辺',	'　浜　辺',	'　海　辺',
		'　湖　林',	'　草　原',	'　草　原',	'　高　原',	'　草　原',
		'　草　原',	'　稲　穂',	'　枯　地',	'　山　岳',	'　花　原',
		'　聖　都',	'　雪　原',	'　街　路',	'　廃　線',	'　都　市',
		'　異　界',	'　異　界',	'　異　界',	'　異　界',	'　異　界',
		'　異　界',	'　異　界',	'　異　界',	'　接　触',	'　異　界',
		'　異　界',	'　溶　解',	'　構　造',	'　構　造',	'　構　造',
		'　閃　光',	'　調　律',	'　調　和',	'　解　放',	'　本　質',
		'　真　実'
	];

	for(var i = 0; i < 100; i++)cnt[i] = 0;
	init();
	renderTitle();

	function init(){
		heal_time = 0;
		quest_item = -1;
		pon = 0;
		phase = 0;
		achieve = 0;
		happy = 200;
		hp = 100;
		gold = 100;
		score = 0;
		alc_item = [-1,-1,-1,-1];
		pict = 0;
		key_item = [-1,-1,-1,-1,-1,-1,-1];
		for(var i in key_item){
			key_ability[i] = -1;
			key_item_recipe[i] = [-1,-1,-1];
			key_item_know[i] = [-1,-1,-1];
			key_item_help[i] = '';
		}
		key_pos = 0;
		key_achieve = 0;
		quest_num = 0;
		exp_area = 0;
		exp_drag = -1;
		exp_status = -1;
		quest_conv = 0;
		quest_chance = 0;
		cnt_taima = 0;
		have_taima = 0;
		use_taima = 0;
		heal_price = 100;
		music_play = 0;
		music_next = 0;
		on_drag = false;
		for(var i = 0; i<drag_num; i++){
			drag_vx[i] = Math.random()*8-4;
			drag_vy[i] = Math.random()*8-4;
			drag_x[i] = 400+Math.random()*50-25;
			drag_y[i] = 300+Math.random()*50-25;
			drag_radius[i] = Math.random()*8+1;
			drag_r[i] = Math.floor(Math.random() * 64);
			drag_g[i] = Math.floor(Math.random() * 64);
			drag_b[i] = Math.floor(Math.random() * 64);
		}
		run = 0;

		on_click_beast = -1;
		on_click_alc = -1;
		on_mouse_help = '';
		on_mouse_title = -1;
		on_mouse_main = -1;
		on_mouse_exp = -1;
		on_mouse_alc = -1;
		on_mouse_alc_menu = -1;
		on_mouse_quest = -1;

		for (var i in ability)ability_have[i] = -1;
		for(var i = 0; i<15; i++)exp_str[i] = '';
		for (var i in item) {
			item_stack[i] = 0;
			//item_stack[i] = 90;
			item_stack_once[i] = 0;
			item_eff[i] = 0;
		}
		item_stack[20]+=3;
		//charDefault = images[2];
		charDefault = 0;
		for(var i = 0; i < 100; i++)cnt[i] = 0;
	}

	function renderTitle(){
		if(cnt[40]==0){
			audio_def.pause();
			audio_def.loop = true;
			audio_def.src = "bgm/1.mp3";
			audio_def.currentTime = 0;
			audio_def.play();
		}
		audio_def.volume = 0.01*cnt[40];
		if(cnt[40]<30)cnt[40]++;
		ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, 0, 0, w, h);//back
		ctx.drawImage(logo, 220, -50,580,480);//logo
		ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0-cnt[99], 0, 225, 600);//chara
		ctx.drawImage(deco1, 0, 0,w/2,h/2);
		ctx.drawImage(deco2, w/2, h/2,w/2,h/2);
		if(on_mouse_title==1){
			ctx.drawImage(frames, 0, 720, 400, 180, 400, 400, 280, 90);
		}else{
			ctx.drawImage(frames, 0, 180, 400, 180, 400, 400, 280, 90);
		}

		ctx.font= 'bold 25px メイリオ';
		ctx.font= 'bold 25px HG明朝E';
		ctx.strokeStyle = '#333';
		ctx.lineWidth = 6; 
		ctx.lineJoin = 'round';
		ctx.fillStyle = '#fff';
		ctx.strokeText('P L A Y',491,455,510);
		ctx.fillText('P L A Y',491,455);

		ctx.globalAlpha = 1.0-0.01*cnt[0];
		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,w,h);
		ctx.globalAlpha = 1.0;
		if(cnt[0]<100)cnt[0] += 1;
		if(cnt[99]>0)cnt[99] -= 1;
		if(cnt[99]==2)charDefault = 6;
		requestId = window.requestAnimationFrame(renderTitle); 
	}
	function renderStory(){
		ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, 0, 0, w, h);//back
		ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0, 0, 225, 600);//chara
		ctx.drawImage(deco1, 0, 0,w/2,h/2);
		ctx.drawImage(deco2, w/2, h/2,w/2,h/2);

		ctx.globalAlpha = 1.0-0.01*cnt[1];
		ctx.drawImage(logo, 220, -50,580,480);//logo
		ctx.drawImage(frames, 0, 0, 400, 180, 400, 400, 280, 90);
		ctx.globalAlpha = 1.0;

		ctx.fillStyle = 'rgb(0,0,0)';
		ctx.fillRect(0,0,w,cnt[1]*0.6);
		ctx.fillRect(0,h-cnt[1]*0.7,w,h);

		ctx.globalAlpha = 0.01*cnt[2];
		ctx.font= 'bold 30px メイリオ';
		ctx.font= 'bold 35px HG明朝E';
		ctx.strokeStyle = '#333';
		ctx.fillStyle = '#fff';
		var posy = 120;

		var pro = [
			'私の名前は絵奈鳥。',
			'エナドリに啓蒙されて',
			'錬金術士を目指すも',
			'このままでは大卒無職！',
			'三日後の面接までに',
			'成果物をでっち上げよう！'
		];
		if(achieve==0 || achieve==1 || achieve==2){
			for(var i = 0; i < 6; i++){
				ctx.strokeText(pro[i],220+(550-35*pro[i].length)/2,posy+i*70,510);
				ctx.fillText(pro[i],220+(550-35*pro[i].length)/2,posy+i*70);
			}
		}

		ctx.globalAlpha = 1.0;

		if(cnt[1]<100)cnt[1]+=4;
		if(cnt[1]==100 && cnt[2]<100)cnt[2]+=4;
		requestId = window.requestAnimationFrame(renderStory); 
	}

	function questEvent(){
		if(happy>200-use_taima)happy-=use_taima;
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
		if(quest_chance>0 && num<8+quest_chance*2){
			quest_chance = 0;
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
			quest_chance++;
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
			quest_chance++;
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
			quest_chance++;
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
			quest_chance++;
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
			quest_chance++;
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
			quest_chance++;
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
		case 15 : quest_chance++;
			if(happy<201){
				exp_str[0] = '何も無かった。';
			}else{
				onClickSE(17);
				charDefault = 7;
				exp_str[0] = 'ほのかな幸せを感じた。';
			}
			break;
		case 16 :quest_chance++;
			if(happy<201){
				exp_str[0] = '何も無かった。';
			}else{
				onClickSE(17);
				charDefault = 7;
				exp_str[0] = 'ほのかな幸せを感じた。';
			}
			break;
		case 17 : quest_chance++;
			if(happy<201){
				exp_str[0] = '何も無かった。';
			}else{
				onClickSE(17);
				charDefault = 7;
				exp_str[0] = 'ほのかな幸せを感じた。';
			}
			break;
		case 18 : quest_chance++;
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
				quest_chance++;
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
	function itemCheck(){
		for(var i in item){
			if(item_stack[i]>0)item_stack_once[i] = 1;
		}
	}
	function poly(){
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
				if(alc_item[0]!=-1){cnt_taima++;have_taima++;}
				if(alc_item[1]!=-1){cnt_taima++;have_taima++;}
				if(alc_item[2]!=-1){cnt_taima++;have_taima++;}
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
	function use(){
		if(on_click_alc!=-1){
			if(item_stack[on_click_alc]>0){
				onClickSE(7);
				item_stack[on_click_alc]--;
				switch(on_click_alc){
				case  0 : 
					hp+=1;
					break;
				case  1 : 
					if(happy<200)happy+=1;
					break;
				case  2 : 
					var p = Math.floor(Math.random()*10);
					if(p>6){hp-=30;if(hp<0)hp=0;}
					if(p==0)hp+=30;
					break;
				case  3 : 
					var p = Math.floor(Math.random()*10);
					if(p>6){happy-=30;if(happy<0)happy=0;}
					if(p==0 && happy<200){happy+=30;if(happy>200)happy=200;}
					break;
				case  4 : 
					hp+=30;
					break;
				case  5 : 
					if(happy<200){happy+=30;if(happy>200)happy=200;}
					break;
				case  6 : 
					item_eff[6] = 1;
					break;
				case  7 : break;
				case  8 : break;
				case  9 : break;
				case 10 : break;
				case 11 : 
					item_eff[11] = 1;
					break;
				case 12 : break;
				case 13 : break;
				case 14 : break;
				case 15 : 
					item_eff[15] = 1;
					break;
				case 16 : 
					item_eff[16] = 1;
					break;
				case 17 : 
					item_eff[17] = 1;
					break;
				case 18 : 
					hp-=50;
					if(hp<0)hp=0;
					break;
				case 19 : 
					cnt[96]++;
					if(cnt[96]>99)cnt[96]=99;
					break;
				case 20 : 
					var n = Math.floor(Math.random()*25);
					var s = Math.floor(Math.random()*10);
					if(s<4){s=2;}else if(s<7){s=3;}else if(s<9){s=4;}else{s=5;}
					item_stack[n]+=s;
					itemCheck();
					break;
				case 21 : 
					var g = Math.floor(Math.random()*500+500);
					gold+=g;
					break;
				case 22 : 
					item_eff[22] = 1;
					break;
				case 23 : 
					var c = Math.floor(Math.random()*3);
					if(c==0){
						phase = 77777;
						ending_num = 0;
						window.cancelAnimationFrame(requestId);
						renderEnding();
					}else if(c==1){
						hp=100;
						happy=200;
						gold=100;
						cnt[96]=72;
						cnt[97]=0;
						cnt[98]=0;
						heal_price = 100;
					}else{
						alc_item[0]=-1;
						alc_item[1]=-1;
						alc_item[2]=-1;
						for (var i in item){
							item_stack[i] = 0;
							item_stack_once[i] = 0;
						}
					}
					break;
				case 24 : break;
				}
				limitCheck();
				if(hp==0 || happy==0){
				
				}
			}else{
				onClickSE(4);
			}
		}else{
			onClickSE(4);
		}
	}
	function sell(){
		if(on_click_alc!=-1){
			if(item_stack[on_click_alc]>0){
				onClickSE(8);
				item_stack[on_click_alc]--;
				gold += on_click_alc*3;
				if(gold>99999)gold = 99999;
			}else{
				onClickSE(4);
			}
		}else{
			onClickSE(4);
		}
	}
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
	function limitCheck(){
		if(hp<0)hp=0;
		if(hp>9999)hp=9999;
		if(gold>99999)gold=99999;
		for(var i = 0; i<25; i++){
			if(item_stack[i]>99)item_stack[i]=99;
		}
		if(happy<0)happy=0;
	}
	function appItemEff(){
		var pos_cnt = 0;
		for(var i in item_eff){
			if(item_eff[i]==1){
				ctx.drawImage(frames, 400, 472, 200, 200, 10+(pos_cnt%5)*38, 490-Math.floor(pos_cnt/5)*38, 32, 32);
				ctx.drawImage(icons, (i%6)*64, Math.floor(i/6)*64, 64, 64, 10+(pos_cnt%5)*38, 490-Math.floor(pos_cnt/5)*38, 32, 32);
				pos_cnt++;
			}
		}
	}
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
		if(happy>200)cnt[92]-=use_taima;
		if(cnt[92]<-1)cnt[92]=0;
		if(cnt[92]>0){requestAnimationFrame(modTime);} 
	}
	function appTime(){
		//console.log(audio_def.currentTime);
		ctx.font= 'bold 35px HG明朝E';
		var grad  = ctx.createLinearGradient(0,560,0,590);
		/* グラデーション終点のオフセットと色をセット */
		grad.addColorStop(0,'#000');
		grad.addColorStop(0.6,'#ddd');

		grad.addColorStop(1,'#000');
		
		/* グラデーションをfillStyleプロパティにセット */
		ctx.fillStyle = grad;
		ctx.lineWidth = 3;
		ctx.lineJoin = 'round';
		ctx.strokeStyle = '#fff';
		cnt[95]++;//点滅
		if(cnt[95]==50){
			cnt[93]++;//分タイマー
			if(cnt[93]==30){
				cnt[93]=0;
				cnt[92]++;//タイマー変数
				modTime();//時刻修正
			}
			cnt[95]=0;
			if(cnt[94]==0){cnt[94]++;}else{cnt[94]--;}
		}
		if(cnt[94]==0){
			if(cnt[96]<10){
				ctx.strokeText(cnt[96]+':',48,588,510);
				ctx.fillText(cnt[96]+':',48,588);
			}else{
				ctx.strokeText(cnt[96]+':',30,588,510);
				ctx.fillText(cnt[96]+':',30,588);
			}
		}else{
			if(cnt[96]<10){
				ctx.strokeText(cnt[96]+' ',48,588,510);
				ctx.fillText(cnt[96]+' ',48,588);
			}else{
				ctx.strokeText(cnt[96]+' ',30,588,510);
				ctx.fillText(cnt[96]+' ',30,588);
			}	
		}
		ctx.strokeText(''+cnt[97]+cnt[98],87,588,510);
		ctx.fillText(''+cnt[97]+cnt[98],87,588);

		ctx.font= 'bold 15px HG明朝E';
		ctx.strokeText('残り時間',45,553,510);
		ctx.fillText('残り時間',45,553);

		ctx.font= '15px メイリオ';
		ctx.fillStyle = '#fff';
		if(on_mouse_help.match(/合成レシピ/)){
			var num = on_mouse_help.charAt(5) -1;
			for(var i = 0; i<3; i++){
				ctx.drawImage(frames, 400, 472, 200, 200, 360+i*58, 550, 32, 32);
				if(key_item_know[num][i]!=-1){
					var inum = key_item_recipe[num][i];
					ctx.drawImage(icons, (inum%6)*64, Math.floor(inum/6)*64, 64, 64, 360+i*58, 550, 32, 32);
				}else{
					ctx.drawImage(icons, 192, 384, 64, 64, 360+i*58, 550, 32, 32);
				}
			}
			var pos = 50;
			ctx.fillText('錬成レシピのヒント：　　　＋　　　＋　　　　　　',150+pos,570);
		}else{
			var pos = (880 - 15*on_mouse_help.length)/2;
			ctx.fillText(on_mouse_help,pos,570);
		}

		if(!music_mute){
			ctx.drawImage(icons, 256, 384, 64, 64, 750, 550, 32, 32);
		}else{
			ctx.drawImage(icons, 320, 384, 64, 64, 750, 550, 32, 32);//mute
		}
	}
	function appFrame(){
		if(on_drag && happy>720){
			ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
		}else{
			ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, 0, 0, w, h);//back
		}
		ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0, 0, 225, 600);//chara
		ctx.drawImage(deco1, 0, 0,w/2,h/2);
		ctx.drawImage(deco2, w/2, h/2,w/2,h/2);

		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,w,60);
		ctx.fillRect(0,530,w,h);
	}
	function appGage(){
		ctx.fillStyle = '#fff';
		ctx.fillRect(78,38,204,14);
		ctx.fillStyle = 'rgb(200,200,200)';
		ctx.fillRect(80,40,200,10);
		ctx.fillStyle = '#555';
		ctx.fillRect(80,40,200,1);
		ctx.fillStyle = '#7e7';
		if(happy<720){
			ctx.fillRect(80,40,happy,10);
		}else{
			ctx.fillRect(80,40,720,10);
		}
		var grad  = ctx.createLinearGradient(0,40,0,50);
		/* グラデーション終点のオフセットと色をセット */
		grad.addColorStop(0,'#2f2');
		grad.addColorStop(0.6,'#cfc');

		grad.addColorStop(1,'#484');
		
		/* グラデーションをfillStyleプロパティにセット */
		ctx.fillStyle = grad;
		ctx.fillRect(80,40,happy,10);
	}
	function appStatus(){
		ctx.drawImage(frames, 400, 672, 64, 64, 15, 5, 50, 50);//clown
		ctx.font= '18px メイリオ';
		ctx.strokeStyle = '#999';
		ctx.lineWidth = 2;
		ctx.lineJoin = 'round';
		ctx.fillStyle = '#fff';
		ctx.strokeText('絵奈鳥',80,25,510);
		ctx.fillText('絵奈鳥',80,25);
		ctx.strokeText(status,150,25,510);
		ctx.fillText(status,150,25);

		ctx.font= 'bold 18px メイリオ';
		var hp1 = Math.floor(hp);
		ctx.strokeText('HP '+hp1,315,25,510);
		ctx.fillText('HP '+hp1,315,25);
		ctx.strokeText('GOLD '+gold,400,25,510);
		ctx.fillText('GOLD '+gold,400,25);
		ctx.strokeText('SCORE '+score,525,25,510);
		ctx.fillText('SCORE '+score,525,25);

		appTime();
		appItemEff();
		if(cnt[90]>0){
			ctx.strokeStyle = '#fff';
			ctx.fillStyle = '#5f5';
			if(cnt[90]<50)ctx.globalAlpha = 0.02*cnt[90];
			if(cnt[91]>80)ctx.globalAlpha = 1.0-0.05*cnt[91];
			ctx.strokeText('+'+earn_exp,585,45-0.1*cnt[90],510);
			ctx.fillText('+'+earn_exp,585,45-0.1*cnt[90]);
			ctx.globalAlpha = 1.0;
		}
	}
	function appExp(pts){
		if(cnt[90]==0)earn_exp = pts;
		if(cnt[90]<100)cnt[90]+=4;
		if(cnt[90]==100 && cnt[91]<100)cnt[91]+=4;
		
		if(cnt[91]==100){
			cnt[90] = 0;
			cnt[91] = 0; 
		}else{
			requestId = window.requestAnimationFrame(appExp);
		}
	}
	function polyEffect(){
		var c = false;
		for(var i in poly_eff){
			if(poly_eff[i]>0)c = true;
		}
		if(c){
			ctx.globalCompositeOperation = "lighter";
			for(var i in poly_eff){
				if(poly_eff[i]>0){
					if(poly_eff[i]==80){
						poly_vx[i] = Math.random()*12-6;
						poly_vy[i] = Math.random()*(-8)-8;
						poly_x[i] = 645+Math.random()*50-25;
						poly_y[i] = 410+Math.random()*50-25;
						poly_radius[i] = Math.random()*18+1;
						poly_r[i] = Math.floor(Math.random() * 40)+40;
						poly_g[i] = Math.floor(Math.random() * 60)+20;
						poly_b[i] = Math.floor(Math.random() * 80);
					}else{
						poly_vy[i] +=0.01*poly_eff[i];
						poly_x[i] += poly_vx[i];
						poly_y[i] += poly_vy[i];
						if(poly_vx[i]+poly_vy[i]>4)poly_radius[i] *= 1.01;

		   				ctx.beginPath();
		   				ctx.fillStyle = 'rgb(' + poly_r[i] + ',' + poly_g[i] + ',' + poly_b[i] + ')';
	   				ctx.arc(poly_x[i], poly_y[i], poly_radius[i], 0, Math.PI*2.0, true);
	   				ctx.fill();
					}
					poly_eff[i]--;
				}
			}
			ctx.globalCompositeOperation = "source-over";
		}else{
			poly_eff.length = 0;
		}
	}
	function appEffect(){
		if(on_drag){
			partyEffect();
			dragEffect();
		}
		if(use_taima==100){
			phase = 77777;
			ending_num = 2;
			window.cancelAnimationFrame(requestId);
			renderEnding();
		}
	}
	function partyEffect(){
		audio_drag.volume = 0.007*cnt[20];
		if(cnt[20]<30){audio_def.volume = 0.3-0.01*cnt[20];}else{audio_def.volume = 0;}
		ctx.globalAlpha = 0.01*cnt[20];
		ctx.drawImage(hand, 0, 350-cnt[21]+cnt[22]-use_taima*3);//hand
		
		if(cnt[21]<100){
			cnt[21]+=20;
		}else{
			cnt[22]+=12;
			if(cnt[22]>100){cnt[21]=0;cnt[22]=0;}
		}

	}
	function dragEffect(){
		if(happy>200){
			if(cnt[20]<100)cnt[20]++;
		}else{
			if(cnt[20]>0)cnt[20]--;
		}
		ctx.globalAlpha = 0.01*cnt[20];
		
		if(use_taima<90){
			ctx.globalAlpha = (0.1+0.01*use_taima)*0.01*cnt[20];
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

	function renderMain(){
		if(on_drag && happy>720){
			ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
		}else{
			ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, 0, 0, w, h);//back
		}
		ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0-cnt[99], 0, 225, 600);//chara

		ctx.globalAlpha = 0.01*cnt[1];
		for(var i = 0; i<3; i++){
			if(on_mouse_main == i){
				ctx.drawImage(frames, 0, 360, 400, 180, 480, 80+i*100, 300, 100);
			}else{
				ctx.drawImage(frames, 0, 540, 400, 180, 480, 80+i*100, 300, 100);
			}
		}

		ctx.drawImage(deco1, 0, 0,w/2,h/2);
		ctx.drawImage(deco2, w/2, h/2,w/2,h/2);

		ctx.font= 'bold 35px HG明朝E';
		ctx.strokeStyle = '#333';
		ctx.fillStyle = '#edf';
		ctx.lineWidth = 6;
		if(on_mouse_main==0){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
		ctx.strokeText('採　集',576,145,510);
		ctx.fillText('採　集',576,145);
		if(on_mouse_main==1){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
		ctx.strokeText('錬　金',576,245,510);
		ctx.fillText('錬　金',576,245);
		if(on_mouse_main==2){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
		ctx.strokeText('依　頼',576,345,510);
		ctx.fillText('依　頼',576,345);

		ctx.drawImage(frames, 400, 472, 200, 200,570,390,120,50);
		ctx.font= 'bold 25px HG明朝E';
		ctx.strokeStyle = '#333';
		ctx.fillStyle = '#edf';
		ctx.lineWidth = 4;
		if(on_mouse_main==3){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
		ctx.strokeText('休憩',605,425,510);
		ctx.fillText('休憩',605,425);

		ctx.fillStyle = 'rgb(0,0,0)';
		ctx.fillRect(0,0,w,cnt[1]*0.6);
		ctx.fillRect(0,h-cnt[1]*0.7,w,h);

		ctx.fillStyle = '#fff';
		ctx.fillRect(78,38,204,cnt[1]*0.14);
		ctx.fillStyle = 'rgb(200,200,200)';
		ctx.fillRect(80,40,200,cnt[1]*0.1);
		ctx.fillStyle = '#555';
		ctx.fillRect(80,40,200,cnt[1]*0.01);
		ctx.fillStyle = '#7e7';
		ctx.fillRect(80,40,happy,cnt[1]*0.1);

		var grad  = ctx.createLinearGradient(0,40,0,50);
		/* グラデーション終点のオフセットと色をセット */
		grad.addColorStop(0,'#2f2');
		grad.addColorStop(0.6,'#cfc');

		grad.addColorStop(1,'#282');
		
		/* グラデーションをfillStyleプロパティにセット */
		ctx.fillStyle = grad;
		ctx.fillRect(80,40,happy,cnt[1]*0.1);

		appStatus();

		//成果物プレート
		ctx.drawImage(frames, 400, 472, 200, 200,270,70,178,40);
		//拡張
		if(key_achieve>2){
			ctx.font= 'bold 25px HG明朝E';
			ctx.fillStyle = '#fff';
			if(key_pos!=0){
				ctx.drawImage(frames, 400, 472, 200, 200,240,70,20,40);
				ctx.fillText('《',230,99);
			}
			if(key_pos!=4){
				ctx.drawImage(frames, 400, 472, 200, 200,457,70,20,40);
				ctx.fillText('》',461,99);
			}
		}
		
		//成果物枠
		ctx.drawImage(frames, 400, 272, 200, 200,240-  4,120,74,75);
		ctx.drawImage(frames, 400, 272, 200, 200,240+ 81,120,74,75);
		ctx.drawImage(frames, 400, 272, 200, 200,240+166,120,74,75);
		ctx.drawImage(frames, 400, 472, 200, 200,240,210,235,210);
		ctx.fillStyle = '#ec9';
		ctx.fillRect(240,124,65,65);
		ctx.fillRect(240+ 85,124,65,65);
		ctx.fillRect(240+170,124,65,65);
		ctx.fillStyle = '#864';
		ctx.fillRect(240,124,65,1);
		ctx.fillRect(240,124,1,65);
		ctx.fillRect(240+ 85,124,65,1);
		ctx.fillRect(240+ 85,124,1,65);
		ctx.fillRect(240+170,124,65,1);
		ctx.fillRect(240+170,124,1,65);
		var inum1 = 25+key_ability[key_pos];
		var inum2 = 25+key_ability[key_pos+1];
		var inum3 = 25+key_ability[key_pos+2];

		if(key_item[0+key_pos]==0)
			ctx.drawImage(icons, (inum1%6)*64, Math.floor(inum1/6)*64, 64, 64,241,125,64,64);
		if(key_item[1+key_pos]==0)
			ctx.drawImage(icons, (inum2%6)*64, Math.floor(inum2/6)*64, 64, 64,241+ 85,125,64,64);
		if(key_item[2+key_pos]==0)
			ctx.drawImage(icons, (inum3%6)*64, Math.floor(inum3/6)*64, 64, 64,241+170,125,64,64);

		ctx.font= 'bold 20px HG明朝E';
		ctx.lineWidth = 4;
		ctx.strokeStyle = '#333';
		ctx.fillStyle = '#fff';
		var t;
		if(key_achieve < 3){
			t = '現在の成果物';
		}else{
			t = '成果物を提出';
		}
		ctx.strokeText(t,260+(200-t.length*21)/2,97,510);
		ctx.fillText(t,260+(200-t.length*21)/2,97);

		if(drag==1){
			ctx.strokeStyle = '#666';
			ctx.drawImage(icons, 128, 448, 128, 128,278,223,164,164);//drink
			ctx.drawImage(icons, 256, 448, 128, 128,275,220,164,164);//drink
		}else{
			ctx.strokeStyle = '#333';
			ctx.drawImage(icons, 128, 448, 128, 128,278,223,164,164);//drink
			ctx.drawImage(icons,   0, 448, 128, 128,275,220,164,164);//drink
		}
		ctx.font= 'bold 20px HG明朝E';
		t = 'エナドリの所持数：'+have_taima;
		ctx.strokeText(t,270-(t.length-8)*4,405,510);
		ctx.fillText(t,270-(t.length-8)*4,405);

		ctx.globalAlpha = 1.0;

		if(cnt[1]<100 && pict==0)cnt[1]+=4;
		if(cnt[1]>0 && pict==1)cnt[1]-=4;
		cnt[3]++;
		if(cnt[3]==999){
			cnt[3]=0;
			autoMove();
		}

		appEffect();
		requestId = window.requestAnimationFrame(renderMain); 
	}
	function renderExplore(){
		if(on_drag && happy>720){
			ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
		}else{
			ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, 0, 0, w, h);//back
		}
		ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0-cnt[99], 0, 225, 600);//chara

		if(20<cnt[2]){ctx.globalAlpha = 1.2-cnt[2]*0.01;}else{ctx.globalAlpha = 1.0;}
		ctx.drawImage(frames, (cnt[2]-20)*4, 0, 400-(cnt[2]-20)*4, 180, 480+(cnt[2]-20)*3,  80, 300-(cnt[2]-20)*3, 100);
		if(cnt[2]<110)ctx.drawImage(frames, (cnt[2]-10)*4, 0, 400-(cnt[2]-10)*4, 180, 480+(cnt[2]-10)*3, 180, 300-(cnt[2]-10)*3, 100);
		if(cnt[2]<100)ctx.drawImage(frames, (cnt[2]- 0)*4, 0, 400-(cnt[2]- 0)*4, 180, 480+(cnt[2]- 0)*3, 280, 300-(cnt[2]- 0)*3, 100);
		ctx.globalAlpha = 1.0;

		ctx.drawImage(deco1, 0, 0,w/2,h/2);
		ctx.drawImage(deco2, w/2, h/2,w/2,h/2);

		ctx.fillStyle = 'rgb(0,0,0)';
		ctx.fillRect(0,0,w,cnt[1]*0.6);
		ctx.fillRect(0,h-cnt[1]*0.7,w,h);

		appGage();
		appStatus();

		if(cnt[2]<60)cnt[2]+=1;
		if(cnt[2]<80)cnt[2]+=1;
		if(cnt[2]<100)cnt[2]+=1;
		if(cnt[2]<110)cnt[2]+=1;
		if(cnt[2]<120)cnt[2]+=1;

		if(cnt[2]<120){
			requestId = window.requestAnimationFrame(renderExplore); 
		}else{
			if(happy>300){
				if(exp_drag==-1)exp_drag = exp_area;
				exp_area = 51;
			}else{
				if(exp_drag!=-1){
					exp_area = exp_drag;
					exp_drag = -1;
				}		
			}
			while(true){
				//area:20-75(56)
				rnd1 = Math.floor(Math.random()*7)+exp_area-3+item_eff[6]*2;
				rnd2 = Math.floor(Math.random()*7)+exp_area-3+item_eff[6]*2;
				if(rnd1==rnd2)rnd1++;
				if(rnd1<0 || rnd2<0){rnd1+=4; rnd2+=4;}
				if(rnd1>55)rnd1-=56;
				if(rnd2>55)rnd2-=56;
				if(back!=rnd1 && back!=rnd2)break;
			}
			requestId = window.requestAnimationFrame(renderExplore2); 
		}
		appEffect();
	}

	function renderExplore2(){
		appFrame();
		appGage();
		appStatus();
		
		if(cnt[6]<10)cnt[6]++;
		ctx.globalAlpha = 0.1*cnt[6];

		ctx.font= 'bold 35px HG明朝E';
		ctx.strokeStyle = '#333';
		ctx.fillStyle = '#fff';
		ctx.lineWidth = 6;
		ctx.strokeText('どちらへ進む？',365,125+10-cnt[6],510);
		ctx.fillText('どちらへ進む？',365,125+10-cnt[6]);

		var on = 0;
		ctx.font= 'bold 25px HG明朝E';
		var select1 = field_name[rnd1];
		var select2 = field_name[rnd2];
		if(on_mouse_exp == 1){on = 2;}else{on = 0;}
		ctx.strokeText(select1,290-on,360-on+10-cnt[6],510);
		ctx.fillText(select1,290-on,360-on+10-cnt[6]);
		if(on_mouse_exp == 2){on = 2;}else{on = 0;}
		ctx.strokeText(select2,570-on,360-on+10-cnt[6],510);
		ctx.fillText(select2,570-on,360-on+10-cnt[6]);

		ctx.fillStyle = '#fff';
		if(on_mouse_exp == 1){on = 2;}else{on = 0;}
		ctx.fillRect(240-on,160-on+10-cnt[6],240,170);
		if(on_mouse_exp == 2){on = 2;}else{on = 0;}
		ctx.fillRect(510-on,160-on+10-cnt[6],240,170);

		ctx.fillStyle = '#000';
		if(on_mouse_exp == 1){on = 2;}else{on = 0;}
		ctx.drawImage(fields, (rnd1%10)*800, Math.floor(rnd1/10)*600,800,600, 245-on,165-on+10-cnt[6],230,160);
		if(on_mouse_exp == 2){on = 2;}else{on = 0;}
		ctx.drawImage(fields, (rnd2%10)*800, Math.floor(rnd2/10)*600,800,600, 515-on,165-on+10-cnt[6],230,160);

		ctx.globalAlpha = 1.0;

		appEffect();
		requestId = window.requestAnimationFrame(renderExplore2);
	}
	function renderExplore3(){
		click_mute = true;
		appFrame();
		appGage();
		appStatus();

		ctx.globalAlpha = 1.0-0.01*cnt[4];
		ctx.font= 'bold 35px HG明朝E';
		ctx.strokeStyle = '#333';
		ctx.fillStyle = '#fff';
		ctx.lineWidth = 6;
		ctx.strokeText('どちらへ進む？',365,125,510);
		ctx.fillText('どちらへ進む？',365,125);

		var on = 0;
		ctx.font= 'bold 25px HG明朝E';
		var select1 = field_name[rnd1];
		var select2 = field_name[rnd2];
		if(on_mouse_exp == 1){on = 2;}else{on = 0;}
		ctx.strokeText(select1,290-on,360-on,510);
		ctx.fillText(select1,290-on,360-on);
		if(on_mouse_exp == 2){on = 2;}else{on = 0;}
		ctx.strokeText(select2,570-on,360-on,510);
		ctx.fillText(select2,570-on,360-on);

		ctx.fillStyle = '#fff';
		ctx.fillRect(240-on,160-on,240,170);
		ctx.fillRect(510-on,160-on,240,170);
		ctx.drawImage(fields, (rnd1%10)*800, Math.floor(rnd1/10)*600,800,600, 245-on,165-on,230,160);
		ctx.drawImage(fields, (rnd2%10)*800, Math.floor(rnd2/10)*600,800,600, 515-on,165-on,230,160);
		ctx.globalAlpha = 1.0;

		ctx.globalAlpha = 0.01*cnt[4];
		if(on_mouse_exp == 1){
			ctx.drawImage(fields, (rnd1%10)*800, Math.floor(rnd1/10)*600, 800, 600, 0, 0, w, h);//back
		}else{
			ctx.drawImage(fields, (rnd2%10)*800, Math.floor(rnd2/10)*600, 800, 600, 0, 0, w, h);//back
		}
		ctx.globalAlpha = 1.0;

		ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0, 0, 225, 600);//chara
		ctx.drawImage(deco1, 0, 0,w/2,h/2);
		ctx.drawImage(deco2, w/2, h/2,w/2,h/2);
		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,w,60);
		ctx.fillRect(0,530,w,h);
		appGage();
		appStatus();

		if(cnt[4]<100)cnt[4]+=2;
		if(cnt[4]==100){
			click_mute = false;
			click_wait = true;
			for(var i = 0; i<15; i++)exp_str[i] = '';
			var dis = 0;
			if(on_mouse_exp == 1){
				back = rnd1;
				dis = Math.abs(exp_area - rnd1);
				exp_area = rnd1;
			}else{
				back = rnd2;
				dis = Math.abs(exp_area - rnd2);
				exp_area = rnd2;
			}
			cnt[4]=0;
			cnt[5]=0;
			score += (rnd1 + rnd2);
			appExp(rnd1 + rnd2);
			var time = dis*10+20;
			if(ability_have[12]!=-1){
				if(key_item[ability_have[12]]!=-1)time*=1.2;
			}
			cnt[92]+=time;
			modTime();
			exp_act = 1;
			exp_act_num = 25 + item_eff[16];
			if(ability_have[11]!=-1){
				if(key_item[ability_have[11]]!=-1)exp_act_num = 30 + item_eff[16];
			}
			requestId = window.requestAnimationFrame(renderExplore4);
		}else{
			requestId = window.requestAnimationFrame(renderExplore3); 
		}
		appEffect();
	}
	function renderExplore4(){
		appFrame();
		appGage();
		appStatus();

		if(!click_wait){
		ctx.globalAlpha = 0.01*cnt[4];
		ctx.drawImage(frames, 400, 322, 200, 100, 280,60,420,470);
		ctx.drawImage(fields, 7200, 3000, 800, 600,295,60,388,470);//paper
		ctx.fillStyle = '#864';
		ctx.fillRect(295,60,1,470);
		ctx.fillRect(682,60,1,470);
		ctx.globalAlpha = 1.0;

		if(!click_wait2 && !click_wait3){
			if(cnt[5]==0){
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				var str = field_name[exp_area].replace(/\s+/g, '' );
				exp_str[0] = str+'にやってきた。';
			}
			if(exp_act==exp_act_num){
				exp_act++;
				exp_status=-1;
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '疲れたから、もう帰る。';
			}else if(exp_act<exp_act_num){
				if(cnt[5]==40*exp_act){
					exp_act++;
					questEvent();
				}
			}
		}
		if(cnt[5]<40*exp_act)cnt[5]++;

		ctx.globalAlpha = 0.01*cnt[4];
		ctx.font= 'bold 18px メイリオ';
		ctx.strokeStyle = '#333';
		ctx.fillStyle = '#fff';
		ctx.lineWidth = 4;
		var line = 0;
		for(var i in exp_str){
			ctx.globalAlpha = 0.3;
			ctx.strokeText(exp_str[14-i],318,98+line*30,510);
			ctx.globalAlpha = 1.0;

			if(exp_str[14-i].match(/手に入れた/)){
				//アイテムを手に入れた
				var len = exp_str[14-i].search(/を/);
				var res1 = exp_str[14-i].substring(0,len);
				var res2 = exp_str[14-i].substring(len);
				ctx.strokeStyle = '#242';
				ctx.fillStyle = '#cfc';
				ctx.strokeText(res1,315,95+line*30,510);
				ctx.fillText(res1,315,95+line*30);
				ctx.strokeStyle = '#333';
				ctx.fillStyle = '#fff';
				ctx.strokeText(res2,315+18*(len),95+line*30,510);
				ctx.fillText(res2,315+18*(len),95+line*30);
			}else if(exp_str[14-i].match(/ゴールド獲得/) || exp_str[14-i].match(/過ごした/)){
				//お金を拾った
				ctx.strokeStyle = '#331';
				ctx.fillStyle = '#fda';
				ctx.strokeText(exp_str[14-i],315,95+line*30,510);
				ctx.fillText(exp_str[14-i],315,95+line*30);
				ctx.strokeStyle = '#333';
				ctx.fillStyle = '#fff';
			}else if(exp_str[14-i].match(/攻撃/) || exp_str[14-i].match(/ダメージ/)){
				//攻撃・ダメージ
				ctx.strokeStyle = '#422';
				ctx.fillStyle = '#faa';
				ctx.strokeText(exp_str[14-i],315,95+line*30,510);
				ctx.fillText(exp_str[14-i],315,95+line*30);
				ctx.strokeStyle = '#333';
				ctx.fillStyle = '#fff';
			}else if(exp_str[14-i].match(/爆殺/)){
				//爆殺
				ctx.strokeStyle = '#422';
				ctx.fillStyle = '#faa';
				ctx.strokeText(exp_str[14-i],315,95+line*30,510);
				ctx.fillText(exp_str[14-i],315,95+line*30);
				ctx.strokeStyle = '#333';
				ctx.fillStyle = '#fff';
			}else if(exp_str[14-i].match(/崖/)){
				//転落
				ctx.strokeStyle = '#422';
				ctx.fillStyle = '#faa';
				ctx.strokeText(exp_str[14-i],315,95+line*30,510);
				ctx.fillText(exp_str[14-i],315,95+line*30);
				ctx.strokeStyle = '#333';
				ctx.fillStyle = '#fff';
			}else if(exp_str[14-i].match(/しまった/)){
				//死亡
				ctx.strokeStyle = '#422';
				ctx.fillStyle = '#faa';
				ctx.strokeText(exp_str[14-i],315,95+line*30,510);
				ctx.fillText(exp_str[14-i],315,95+line*30);
				ctx.strokeStyle = '#333';
				ctx.fillStyle = '#fff';
			}else if(exp_str[14-i].match(/祈/)){
				//祈る
				ctx.strokeStyle = '#424';
				ctx.fillStyle = '#faf';
				ctx.strokeText(exp_str[14-i],315,95+line*30,510);
				ctx.fillText(exp_str[14-i],315,95+line*30);
				ctx.strokeStyle = '#333';
				ctx.fillStyle = '#fff';
			}else if(exp_str[14-i].match(/回復/) || exp_str[14-i].match(/蘇/)){
				//回復
				ctx.strokeStyle = '#242';
				ctx.fillStyle = '#cfc';
				ctx.strokeText(exp_str[14-i],315,95+line*30,510);
				ctx.fillText(exp_str[14-i],315,95+line*30);
				ctx.strokeStyle = '#333';
				ctx.fillStyle = '#fff';
			}else if(exp_str[14-i].match(/錬成/)){
				//錬成
				ctx.strokeStyle = '#224';
				ctx.fillStyle = '#ccf';
				ctx.strokeText(exp_str[14-i],315,95+line*30,510);
				ctx.fillText(exp_str[14-i],315,95+line*30);
				ctx.strokeStyle = '#333';
				ctx.fillStyle = '#fff';
			}else if(exp_str[14-i].match(/幸せ/)){
				//幸せ
				ctx.strokeStyle = '#413';
				ctx.fillStyle = '#fce';
				ctx.strokeText(exp_str[14-i],315,95+line*30,510);
				ctx.fillText(exp_str[14-i],315,95+line*30);
				ctx.strokeStyle = '#333';
				ctx.fillStyle = '#fff';
			}else{
				//その他
				ctx.strokeText(exp_str[14-i],315,95+line*30,510);
				ctx.fillText(exp_str[14-i],315,95+line*30);
			}
			if(exp_str[14-i])line++;
		}
		ctx.globalAlpha = 1.0;

		if(cnt[4]<100)cnt[4]+=10;
		}

		if((hp==0 || happy==0) && !click_wait2 && !click_wait3){
			click_wait2=true;
			click_wait3=true;
		}

		if((hp==0 || happy==0) && !click_wait2){
			click_wait3 = false;
			if(hp==0)ending_num=0;
			if(happy==0)ending_num=1;
			phase = 77777;
			window.cancelAnimationFrame(requestId);
			renderEnding();
		}else{
			requestId = window.requestAnimationFrame(renderExplore4); 
		}
		appEffect();
	}

	function renderAlchemy(){

		ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, 0, 0, w, h);//back
		if(on_drag && happy>720)ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
		ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0, 0, 225, 600);//chara

		if(20<cnt[2]){ctx.globalAlpha = 1.2-cnt[2]*0.01;}else{ctx.globalAlpha = 1.0;}
		ctx.drawImage(frames, (cnt[2]-20)*4, 0, 400-(cnt[2]-20)*4, 180, 480+(cnt[2]-20)*3,  80, 300-(cnt[2]-20)*3, 100);
		if(cnt[2]<110)ctx.drawImage(frames, (cnt[2]-10)*4, 0, 400-(cnt[2]-10)*4, 180, 480+(cnt[2]-10)*3, 180, 300-(cnt[2]-10)*3, 100);
		if(cnt[2]<100)ctx.drawImage(frames, (cnt[2]- 0)*4, 0, 400-(cnt[2]- 0)*4, 180, 480+(cnt[2]- 0)*3, 280, 300-(cnt[2]- 0)*3, 100);
		ctx.globalAlpha = 1.0;

		ctx.drawImage(deco1, 0, 0,w/2,h/2);
		ctx.drawImage(deco2, w/2, h/2,w/2,h/2);

		ctx.fillStyle = 'rgb(0,0,0)';
		ctx.fillRect(0,0,w,cnt[1]*0.6);
		ctx.fillRect(0,h-cnt[1]*0.7,w,h);

		appGage();
		appStatus();

		if(cnt[2]<60)cnt[2]+=1;
		if(cnt[2]<80)cnt[2]+=1;
		if(cnt[2]<100)cnt[2]+=1;
		if(cnt[2]<110)cnt[2]+=1;
		if(cnt[2]<120)cnt[2]+=1;

		if(cnt[2]<120){
			requestId = window.requestAnimationFrame(renderAlchemy); 
		}else{
			requestId = window.requestAnimationFrame(renderAlchemy2); 
		}
		appEffect();
	}
	function renderAlchemy2(){
		appFrame();
		appGage();
		appStatus();

		if(cnt[6]<10)cnt[6]++;
		if(cnt[6]<5)ctx.globalAlpha = 0.2*cnt[6];
		var m = 10-cnt[6];

		ctx.drawImage(frames, 400, 272, 200, 200,236,147+m,275,276);

		ctx.drawImage(frames, 400, 272, 200, 200,236,66+m,74,75);
		ctx.drawImage(frames, 400, 272, 200, 200,236+100,66+m,74,75);
		ctx.drawImage(frames, 400, 272, 200, 200,236+200,66+m,74,75);

		ctx.drawImage(frames, 400, 272, 200, 200,554,249+m,183,169);

		ctx.fillStyle = '#ec9';
		ctx.fillRect(240,70+m,65,65);
		ctx.fillRect(240+100,70+m,65,65);
		ctx.fillRect(240+200,70+m,65,65);
		ctx.fillRect(560,255+m,170,155);
		ctx.fillStyle = '#864';
		ctx.fillRect(240,70+m,65,1);
		ctx.fillRect(240,70+m,1,65);
		ctx.fillRect(240+100,70+m,65,1);
		ctx.fillRect(240+100,70+m,1,65);
		ctx.fillRect(240+200,70+m,65,1);
		ctx.fillRect(240+200,70+m,1,65);
		ctx.fillRect(560,255+m,1,155);
		ctx.fillRect(560,255+m,170,1);

		if(on_mouse_alc_menu == 0){
			ctx.drawImage(frames, 400, 136, 300, 136, 535, 150+m, 220, 80);
		}else{
			ctx.drawImage(frames, 400, 0, 300, 136, 535, 150+m, 220, 80);
		}
		if(on_mouse_alc_menu == 1){
			ctx.drawImage(frames, 400, 136, 300, 136, 260, 435+m, 220, 80);
		}else{
			ctx.drawImage(frames, 400, 0, 300, 136, 260, 435+m, 220, 80);
		}
		if(on_mouse_alc_menu == 2){
			ctx.drawImage(frames, 400, 136, 300, 136, 500, 435+m, 220, 80);
		}else{
			ctx.drawImage(frames, 400, 0, 300, 136, 500, 435+m, 220, 80);
		}

		ctx.font= 'bold 28px HG明朝E';
		ctx.fillStyle = '#edf';
		ctx.lineWidth = 6;
		if(on_mouse_alc_menu==0){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
		ctx.strokeText('錬　金',601,200+m,510);
		ctx.fillText('錬　金',601,200+m);
		if(on_mouse_alc_menu==1){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
		ctx.strokeText('使　用',325,485+m,510);
		ctx.fillText('使　用',325,485+m);
		if(on_mouse_alc_menu==2){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
		ctx.strokeText('売　却',565,485+m,510);
		ctx.fillText('売　却',565,485+m);
		
		for(var i = 0; i<3; i++){
			var num = alc_item[i];
			if(num!=-1){
				ctx.drawImage(icons, (num%6)*64, Math.floor(num/6)*64, 64, 64, 244+i*100,74+m,57,57);
				ctx.font= 'bold 25px HG明朝E';
				ctx.strokeStyle = '#333';
				ctx.fillStyle = '#fff';
				ctx.lineWidth = 4;
				if(item_stack[num]<10){
					ctx.strokeText(item_stack[num],293+i*100,135+m,510);
					ctx.fillText(item_stack[num],293+i*100,135+m);
				}else{
					ctx.strokeText(item_stack[num],279+i*100,135+m,510);
					ctx.fillText(item_stack[num],279+i*100,135+m);
				}
			}
		}



		if(on_mouse_alc != -1 || on_click_alc!=-1){
			ctx.strokeStyle = '#333';
			ctx.fillStyle = '#fff';
			ctx.lineWidth = 4;
			var name;
			var tar;
			if(on_mouse_alc != -1){
				tar = on_mouse_alc;
			}else if(on_click_alc!=-1){
				tar = on_click_alc;
			}
			if(item_stack_once[tar] != 0){
				name = item[tar];
				ctx.drawImage(icons, (tar%6)*64, Math.floor(tar/6)*64, 64, 64, 565,260+m,64,64);
		
				ctx.font= 'bold 15px HG明朝E';
				ctx.strokeText('売値:'+tar*3+'G',648,325+m,510);
				ctx.fillText('売値:'+tar*3+'G',648,325+m);

				ctx.strokeText(item_help[tar][0],572,355+m,510);
				ctx.fillText(item_help[tar][0],572,355+m);
				ctx.strokeText(item_help[tar][1],565,380+m,510);
				ctx.fillText(item_help[tar][1],565,380+m);
				ctx.strokeText(item_help[tar][2],565,400+m,510);
				ctx.fillText(item_help[tar][2],565,400+m);	

			}else{
				name = '未確認';
				ctx.drawImage(icons, 192,　384, 64, 64, 565,260+m,64,64);
			}
			ctx.font= 'bold 22px HG明朝E';
			ctx.strokeText(name,630+(100-22*name.length)/2,300+m,510);
			ctx.fillText(name,630+(100-22*name.length)/2,300+m);

		}


		if(-1<alc_item[3] && alc_item[3]<14){
			if(cnt[30]>0)ctx.globalAlpha = 1-0.1*cnt[30];
			var inum = 25+alc_item[3];
			ctx.drawImage(icons, (inum%6)*64, Math.floor(inum/6)*64, 64, 64, 595,265+m+cnt[30],100,100);
			ctx.font= 'bold 22px HG明朝E';
			ctx.strokeStyle = '#333';
			ctx.fillStyle = '#fff';
			ctx.lineWidth = 4;
			ctx.strokeText('成果物を錬成！',570,400+m,510);
			ctx.fillText('成果物を錬成！',570,400+m);
			ctx.globalAlpha = 1.0;
		}else if(alc_item[3] == 99){
			if(cnt[30]>0)ctx.globalAlpha = 1-0.1*cnt[30];
			ctx.drawImage(icons, 128, 448, 128, 128, 597,267+m+cnt[30],100,100);
			ctx.drawImage(icons,   0, 448, 128, 128, 595,265+m+cnt[30],100,100);
			ctx.font= 'bold 22px HG明朝E';
			ctx.strokeStyle = '#333';
			ctx.fillStyle = '#fff';
			ctx.lineWidth = 4;
			ctx.strokeText('エナドリ錬成！',570,400+m+cnt[30]/2,510);
			ctx.fillText('エナドリ錬成！',570,400+m+cnt[30]/2);
			ctx.globalAlpha = 1.0;
		}
		if(cnt[30]>0)cnt[30]--;

		ctx.fillStyle = '#000';
		for(var i = 0; i < 5; i++){
			for(var j = 0; j < 5; j++){
				var on = 0;
				if(on_mouse_alc == i*5+j)on = 1;
				ctx.fillRect(244+j*52-on,154+i*52-on+m,48,48);
				if(item_stack_once[i*5+j]!=0){
					ctx.drawImage(frames, 400, 472, 200, 200, 244+j*52-on, 154+i*52-on+m, 48, 48);
					var inum = i*5+j;
					ctx.drawImage(icons, (inum%6)*64, Math.floor(inum/6)*64, 64, 64, 244+j*52-on, 154+i*52-on+m, 48, 48);
				}else{
					ctx.drawImage(frames, 400, 472, 200, 200, 244+j*52-on, 154+i*52-on+m, 48, 48);
					ctx.drawImage(icons, 192, 384, 64, 64, 244+j*52-on, 154+i*52-on+m, 48, 48);
				}
				if(on_click_alc == i*5+j){
					
					ctx.fillStyle = '#f00';
					ctx.fillRect(244+j*52-on,154+i*52-on+m,48,3);
					ctx.fillRect(244+j*52-on,154+i*52+45-on+m,48,3);
					ctx.fillRect(244+j*52-on,154+i*52-on+m,3,48);
					ctx.fillRect(244+j*52+45-on,154+i*52-on+m,3,48);
				}
				if(item_stack[i*5+j]==0){
					ctx.fillStyle = '#000';
					ctx.globalAlpha = 0.5;
					ctx.fillRect(244+j*52-on,154+i*52-on+m,48,48);
					ctx.globalAlpha = 1.0;
				}else{
					ctx.font= 'bold 20px HG明朝E';
					ctx.strokeStyle = '#333';
					ctx.fillStyle = '#fff';
					ctx.lineWidth = 4;
					if(item_stack[i*5+j]<10){
					ctx.strokeText(item_stack[i*5+j],244+j*52+38-on,154+i*52+48-on+m,510);
					ctx.fillText(item_stack[i*5+j],244+j*52+38-on,154+i*52+48-on+m);
					}else{
					ctx.strokeText(item_stack[i*5+j],244+j*52+28-on,154+i*52+48-on+m,510);
					ctx.fillText(item_stack[i*5+j],244+j*52+28-on,154+i*52+48-on+m);
					}
				}
			}
		}

		ctx.globalAlpha = 1.0;
		requestId = window.requestAnimationFrame(renderAlchemy2); 
		appEffect();
		polyEffect();
	}

	function renderQuest(){
		ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, 0, 0, w, h);//back
		if(on_drag && happy>720)ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
		ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0, 0, 225, 600);//chara

		if(20<cnt[2]){ctx.globalAlpha = 1.2-cnt[2]*0.01;}else{ctx.globalAlpha = 1.0;}
		ctx.drawImage(frames, (cnt[2]-20)*4, 0, 400-(cnt[2]-20)*4, 180, 480+(cnt[2]-20)*3,  80, 300-(cnt[2]-20)*3, 100);
		if(cnt[2]<110)ctx.drawImage(frames, (cnt[2]-10)*4, 0, 400-(cnt[2]-10)*4, 180, 480+(cnt[2]-10)*3, 180, 300-(cnt[2]-10)*3, 100);
		if(cnt[2]<100)ctx.drawImage(frames, (cnt[2]- 0)*4, 0, 400-(cnt[2]- 0)*4, 180, 480+(cnt[2]- 0)*3, 280, 300-(cnt[2]- 0)*3, 100);
		ctx.globalAlpha = 1.0;

		ctx.drawImage(deco1, 0, 0,w/2,h/2);
		ctx.drawImage(deco2, w/2, h/2,w/2,h/2);

		ctx.fillStyle = 'rgb(0,0,0)';
		ctx.fillRect(0,0,w,cnt[1]*0.6);
		ctx.fillRect(0,h-cnt[1]*0.7,w,h);

		appGage();
		appStatus();

		if(cnt[2]<60)cnt[2]+=1;
		if(cnt[2]<80)cnt[2]+=1;
		if(cnt[2]<100)cnt[2]+=1;
		if(cnt[2]<110)cnt[2]+=1;
		if(cnt[2]<120)cnt[2]+=1;

		if(cnt[2]<120){
			requestId = window.requestAnimationFrame(renderQuest); 
		}else{
			requestId = window.requestAnimationFrame(renderQuest2); 
		}
		appEffect();
	}
	function renderQuest2(){
		ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, 0, 0, w, h);//back
		if(on_drag && happy>720)ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
		ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0, 0, 225, 600);//chara
		ctx.drawImage(deco1, 0, 0,w/2,h/2);
		ctx.drawImage(deco2, w/2, h/2,w/2,h/2);
		ctx.drawImage(chars, 2025, 0, 265, 600,800-3*cnt[5],100,265,600);
		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,w,60);
		ctx.fillRect(0,530,w,h);
		appGage();
		appStatus();
		
		if(cnt[5]==100){
			if(cnt[7]<10){
				cnt[7]++;
				ctx.globalAlpha = 0.1*cnt[7];
				ctx.drawImage(pop,550-3*cnt[5],100+10-cnt[7],300,220);
				ctx.globalAlpha = 1.0;
			}else{
				if(cnt[7]<20)cnt[7]++;
				ctx.drawImage(pop,550-3*cnt[5],100,300,220);
			}
		if(cnt[7]==20){
			ctx.font= 'bold 30px HG明朝E';
			ctx.fillStyle = '#000';
			if(quest_conv==0){
				if(cnt[6]<10){
					cnt[6]++;
					ctx.globalAlpha = 0.1*cnt[6];
					if(key_achieve<2 && quest_num>18){
						ctx.fillText('依頼は無いよ',610-3*cnt[5],205+10-cnt[6]);
					}else{
						ctx.drawImage(icons, (quest_item%6)*64, Math.floor(quest_item/6)*64, 64, 64,580-3*cnt[5],130+10-cnt[6],64,64);
						ctx.fillText('を '+quest_sum+' 個',670-3*cnt[5],180+10-cnt[6]);
						ctx.fillText('持ってきて下さい',580-3*cnt[5],230+10-cnt[6]);
					}
					ctx.globalAlpha = 1.0;
				}else{
					if(key_achieve<2 && quest_num>18){
						ctx.fillText('依頼は無いよ',610-3*cnt[5],205);
					}else{
						ctx.drawImage(icons, (quest_item%6)*64, Math.floor(quest_item/6)*64, 64, 64,580-3*cnt[5],130,64,64);
						ctx.fillText('を '+quest_sum+' 個',670-3*cnt[5],180);
						ctx.fillText('持ってきて下さい',580-3*cnt[5],230);
					}
				}
			}else if(quest_conv==1){
				if(cnt[6]<10){
					cnt[6]++;
					ctx.globalAlpha = 0.1*cnt[6];
					ctx.fillText('足りないよ！',610-3*cnt[5],180+10-cnt[6]);
					ctx.globalAlpha = 1.0;
				}else{
					ctx.fillText('足りないよ！',610-3*cnt[5],180);
				}

			}else if(quest_conv==2){
				if(cnt[6]<50){
					cnt[6]++;
					if(cnt[6]<10){
						ctx.globalAlpha = 0.1*cnt[6];
						ctx.fillText('ありがとう！',610-3*cnt[5],180+10-cnt[6]);
						ctx.globalAlpha = 1.0;
					}else{
						ctx.fillText('ありがとう！',610-3*cnt[5],180);
					}
				}else{
					var num = (quest_num/2 -1)%21 +1;
					var num1 = Math.floor((num-1)/3);
					var num2 = (num-1)%3;
					if(cnt[6]==50){
						unknown = true;
						if(key_item_know[num1][num2]==0){
							unknown = false;
							if(quest_num>18){
								item_stack[20]+=9;
							}else{
								item_stack[20]+=num1*3+num2+1;
							}
						}else{
							key_item_know[num1][num2] = 0;
						}
					}
					if(cnt[6]<60)cnt[6]++;
					if(cnt[6]<60){
						ctx.globalAlpha = 0.1*(cnt[6]-50);
						if(quest_num<44 && unknown){
							ctx.fillText('key'+num+'は',610-3*cnt[5],180+60-cnt[6]);
							var inum = key_item_recipe[num1][num2];
							ctx.drawImage(icons, (inum%6)*64, Math.floor(inum/6)*64, 64, 64,720-3*cnt[5],130+60-cnt[6],64,64);
						}else{
							ctx.fillText('お礼は',610-3*cnt[5],180+60-cnt[6]);
							ctx.drawImage(icons, 128, 192, 64, 64,720-3*cnt[5],130+60-cnt[6],64,64);//box
						}
						ctx.globalAlpha = 1.0;
					}else{
						if(quest_num<44 && unknown){
							ctx.fillText('key'+num+'は',610-3*cnt[5],180);
							var inum = key_item_recipe[num1][num2];
							ctx.drawImage(icons, (inum%6)*64, Math.floor(inum/6)*64, 64, 64,720-3*cnt[5],130,64,64);
						}else{
							ctx.fillText('お礼は',610-3*cnt[5],180+60-cnt[6]);
							ctx.drawImage(icons, 128, 192, 64, 64,720-3*cnt[5],130+60-cnt[6],64,64);//box
						}
					}
				}
			}
		}
		}

		if(cnt[5]==100){
			if(on_mouse_quest == 0){
				ctx.drawImage(frames, 400, 136, 300, 136, 220, 435, 170, 80);
			}else{
				ctx.drawImage(frames, 400, 0, 300, 136, 220, 435, 170, 80);
			}
			if(on_mouse_quest == 1){
				ctx.drawImage(frames, 400, 136, 300, 136, 410, 435, 170, 80);
			}else{
				ctx.drawImage(frames, 400, 0, 300, 136, 410, 435, 170, 80);
			}
			ctx.font= 'bold 28px HG明朝E';
			ctx.fillStyle = '#edf';
			ctx.lineWidth = 6;
			if(on_mouse_quest==0){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
			ctx.strokeText('渡す',279, 484, 510);
			ctx.fillText('渡す',279, 484);
			if(on_mouse_quest==1){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
			ctx.strokeText('戻る',466, 484, 510);
			ctx.fillText('戻る',466, 484);
			if(ability_have[7]!=-1){
				if(key_item[ability_have[7]]!=-1){
					if(on_mouse_quest == 2){
						ctx.drawImage(frames,400, 136, 300, 136, 305, 345, 190, 80);
					}else{
						ctx.drawImage(frames,400, 0, 300, 136, 305, 345, 190, 80);
					}
					if(on_mouse_quest==2){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
					ctx.strokeText('金で解決',342, 394, 510);
					ctx.fillText('金で解決',342, 394);
				}
			}
		}
		if(cnt[5]<80)cnt[5]++;
		if(cnt[5]<90)cnt[5]++;
		if(cnt[5]<100)cnt[5]++;
		requestId = window.requestAnimationFrame(renderQuest2); 
		appEffect();
	}

	function renderEnding(){
		appFrame();
		appGage();
		appStatus();
		dragEffect();
		if(ending_num==5){
			if(music_next!=12)audioChange(12);
			if(cnt[20]==0 && !status.match(/イカサマ/))status = "真実の錬金術士";
			if(ending_num==5 && exp_area==55 && !status.match(/イカサマ/))status = "地方上級錬金術士";
		}
		if(!click_wait && !click_wait2)cnt[6]++;
		ctx.globalAlpha = 0.01*cnt[6];
		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,w,h);
		ctx.globalAlpha = 1.0;
		if(cnt[6]<100){
			requestId = window.requestAnimationFrame(renderEnding); 
		}else{
			window.cancelAnimationFrame(requestId);
			requestId = window.requestAnimationFrame(renderEnding2); 
		}
	}
	function renderEnding2(){
		ctx.globalAlpha = 1.0;
		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,w,h);

		if(cnt[9]<10)ctx.globalAlpha = 0.1*cnt[9];
		if(0<cnt[10] && cnt[10]<100)ctx.globalAlpha = 1-0.01*cnt[10];
		ctx.font= 'bold 28px HG明朝E';
		ctx.fillStyle = '#000';
		ctx.lineWidth = 6;
		ctx.strokeStyle = '#fff';
		var str = [];
		if(ending_num==0){
			//ＨＰ死亡
			str.push('ＧＡＭＥ　ＯＶＥＲ');
			str.push('絵奈鳥の体力が尽きた。');
			str.push('');
			str.push('');
			str.push('');
			str.push('score '+score+' To be continued.');
		}else if(ending_num==1){
			//幸福度死亡
			str.push('ＧＡＭＥ　ＯＶＥＲ');
			str.push('絵奈鳥の心が折れた。');
			str.push('');
			str.push('');
			str.push('');
			str.push('score '+score+' To be continued.');
		}else if(ending_num==2){
			//薬中
			str.push('ＧＡＭＥ　ＯＶＥＲ');
			str.push('人の道を捨て');
			str.push('エナドリに全てを捧げた絵奈鳥は');
			str.push('それはそれで');
			str.push('幸せだったのかも知れない。');
			str.push('score '+score+' To be continued.');
		}else if(ending_num==3){
			//時間切れ
			str.push('ＧＡＭＥ　ＯＶＥＲ');
			str.push('締切に間に合わなかった。');
			str.push('');
			str.push('');
			str.push('');
			str.push('score '+score+' To be continued.');
		}else if(ending_num==4){
			//提出3
			str.push('なんとか成果物が仕上がった。');
			str.push('しかし、これで');
			str.push('全てが終わったわけではない。');
			str.push('第二第三の面接が、');
			str.push('絵奈鳥を待ち受けているだろう……。');
			str.push('score '+score+' To be continued.');
		}else if(ending_num==5){
			//提出7
			str.push('完璧な成果物ができた。');
			str.push('こうして絵奈鳥にも、今後永きに渡る');
			str.push('輝かしい労働が約束された……。');
			str.push('');
			str.push('ＣＯＮＧＲＡＴＵＬＡＴＩＯＮＳ．');
			str.push('score '+score);
		}else{
			//エラー
			str.push('不明なエラーです');
		}
		for(var i in str){
			if(i==5){
				ctx.strokeText(str[i],(800-14*str[i].length)/2, 130+i*80, 510);
				ctx.fillText(str[i],(800-14*str[i].length)/2, 130+i*80);
			}else{
				ctx.strokeText(str[i],(800-28*str[i].length)/2, 130+i*80, 510);
				ctx.fillText(str[i],(800-28*str[i].length)/2, 130+i*80);
			}
		}
		audio_drag.volume = 0.007*cnt[20];
		if(!click_wait && cnt[9]<100)cnt[9]++;
		if(cnt[9]==99)click_wait=true;
		if(cnt[9]==100)cnt[10]++;	
		if(cnt[10]<100){
			if(cnt[10]>0){cnt[20]-=1;if(cnt[20]<0)cnt[20]=0;}
			requestId = window.requestAnimationFrame(renderEnding2); 
		}else{
			audio_drag.pause();
			window.cancelAnimationFrame(requestId);
			if(ending_num==5){
				for(var i = 0; i<5; i++){	
					end_pict[i] = i;
					end_y[i] = 600+i*160;
				}
				if(status.match(/イカサマ/))status = "周回の錬金術士";
				requestId = window.requestAnimationFrame(renderEnding3); 
			}else{
				if(ending_num!=4 && ending_num!=5)status = "周回の錬金術士";
				init();
				requestId = window.requestAnimationFrame(renderTitle); 
			}
		}
	}
	function renderEnding3(){
		ctx.globalAlpha = 1.0;
		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,w,h);
		
		if(cnt[61]>9500){
			var g = 1 - 0.01*(cnt[61]-9500);
			if(g<0)g=0;
			ctx.globalAlpha = g;
		}
		if(cnt[60]<500)ctx.globalAlpha = 0.002*cnt[60];
		for(var i = 0; i<5; i++){
			if(end_y[i]==-160){
				end_pict[i]+=5;
				end_y[i]=-160+160*5;
			}else{
				if(end_pict[i]<56){
					ctx.drawImage(fields, (end_pict[i]%10)*800, Math.floor(end_pict[i]/10)*600, 800, 600,80,end_y[i],260,150);
					end_y[i]--;
				}
			}
		}
		ctx.drawImage(logo,380,-10,390,320);
		ctx.fillStyle = '#fff';
		var str = [];
		str.push(' 企画制作  discoNeko');
		for(var i in str){
			ctx.fillText(str[i],350+Math.floor((450-14*str[i].length-60)/2),325+45*i);
		}

		//console.log(cnt[61]%1000);
		var c = cnt[61]%1000;
		if(250<c && c<1000 && Math.floor(cnt[61]/1000)<9){
			if(c<350)cnt[62]++;
			if(c>900)cnt[62]--;
			ctx.globalAlpha = 0.01*cnt[62];

			ctx.drawImage(ends,((Math.floor(cnt[61]/1000))%5)*400,0,400,300,410,350,330,230);
		}
		
		if(cnt[61]>9600 && cnt[61]<9701){
			ctx.globalAlpha = 0.01*(cnt[61]-9600);
			ctx.fillText('FIN',(800-14*3)/2,300);
		}
		
		if(cnt[60]<500)cnt[60]++;
		if(cnt[61]<9700){cnt[61]++;click_wait=true;}
		if(cnt[61]==9700 && !click_wait)cnt[61]++;
		if(cnt[61]<9701){
			requestId = window.requestAnimationFrame(renderEnding3); 
		}else{
			window.cancelAnimationFrame(requestId);
			init();
			requestId = window.requestAnimationFrame(renderTitle); 
		}
	}
	function autoMove(){
		var rnd = Math.floor(Math.random()*9);
		charDefault = rnd;
	}
	function onClickSE(n){
		if(!music_mute && music_play==0){
			if(n==1 || n==2 || n==4 || n==10 || n==13 || n==17 || n==18 || n==20 || n==21 || n==22){audio_se.volume = 0.5;}else{audio_se.volume = 1.0;}
			audio_se.src = "se/se"+n+".mp3";
			audio_se.play();
		}
	}
	function audioChange(n){
		music_next = n;
		audioChange2();
	}
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
				if(have_taima>0){
					if(!status.match(/イカサマ/))status = "エナドリ錬金術士";
					on_drag = true;

					var time = Math.floor(20*(1-0.01*use_taima));
					if(ability_have[12]!=-1){
						if(key_item[ability_have[12]]!=-1)time*=1.2;
					}
					cnt[92]+=time;
					modTime();
					have_taima--;
					use_taima++;
					if(ability_have[13]!=-1){
						if(key_item[ability_have[13]]!=-1){use_taima-=3;if(use_taima<0)use_taima=0;}
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
				poly();
				on_void = false;
			}
			if(260<x && x<480 && 435<y && y<515){
				use();
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
			if(quest_conv==1){quest_conv = 0;cnt[6] = 0;}
			if((0<x && x<800 && 0<y && y<60) || (0<x && x<800 && 520<y && y<600)){
				phase = 2;
				quest_conv = 0;
				cnt[2] = 0;
				cnt[5] = 0;
				cnt[6] = 0;
				cnt[7] = 0;
				onClickSE(2);
				window.cancelAnimationFrame(requestId);
				renderMain();
			}
			if(cnt[5]==100){
			if(quest_conv<2 && 220<x && x<390 && 435<y && y<515){
				cnt[6] = 0;
				if(key_achieve<2 && quest_num>18){
					onClickSE(4);
				}else{
					if(item_stack[quest_item]>quest_sum-1){
						onClickSE(3);
						quest_conv=2;
						item_stack[quest_item] -= quest_sum;
						quest_num++;
					}else{
						onClickSE(4);
						quest_conv=1;
					}
				}
			}
			if(quest_conv<2 && 305<x && x<495 && 345<y && y<425){
				if(ability_have[7]!=-1){
					if(key_item[ability_have[7]]!=-1){
						cnt[6] = 0;
						if(gold>quest_item*100*quest_sum-1){
							onClickSE(3);
							quest_conv=2;
							gold -= quest_item*100*quest_sum;
							quest_num++;
						}else{
							onClickSE(4);
							quest_conv=1;
						}
					}
				}
			}
			if(410<x && x<580 && 435<y && y<515){
				phase = 2;
				quest_conv = 0;
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

	function onMove(e){
		var rect = e.target.getBoundingClientRect();
		var x =  Math.round(e.clientX - rect.left);
		var y =  Math.round(e.clientY - rect.top);
		//console.log(x+" "+y);
		on_mouse_help =　'';

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
					on_mouse_help = '不思議なエナドリ：飲むと気持ち良くなる不思議なエナドリ【総数：'+cnt_taima+'】';
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

})();
