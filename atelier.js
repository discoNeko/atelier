(function() {
    var w = 800, h = 600;
    var cnt = [];
    var phase = 0;
    var achieve = 0;
    var charDefault = new Image();
    var happy = 200;
    var
 hp = 100;
    var gold = 100;
    var score = 0;
    var status = "���K���B���p�m";
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
    var quest_item;
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
	'�퓬�����̌��F�̏W���̐퓬�ɂP/�Q�̊m���ŏ�������B',
	'���p�F�˗��ŗv�������A�C�e���̌�������B',
	'�Â��b�h�F�̏W���Ɏ󂯂�_���[�W������B',
	'�����v�F������s���ɂ����鎞�Ԃ������ɂȂ�B',
	'�����܁F�R�����ɏ������̂P���̂����𓾂�B',
	
	'�يE�T�K�F�يE�ł������ł���悤�ɂȂ�B',
	
	'�퓬�����̌��F�̏W���̐퓬�ɂQ/�R�̊m���ŏ�������B',
	'�d�G�F�˗������ŉ����ł���悤�ɂȂ�B',
	'�s���̖@�F�g�o���O�ɂȂ�ƑS�񕜂���B',
	'�s���`�Ŏ��Z�F�g�o���Q�O�����̂Ƃ��A�s���ɂ����鎞�Ԃ��P/�T�ɂȂ�B',
	'�����e���g�F�x�e�������ɂȂ�B',
	
	'�����s�b�P���F�̏W���̍s���񐔂�������B',
	'�g���t�B�[�F�s���ɂ����鎞�Ԃ��Q�O���A�ŏI�X�R�A���T�O��������B',
	'�J�t�F�C���ϐ��F�G�i�W�[�h�����N�A�L������I',

    ];
    var ability_have = [];
    for (var i in ability)ability_have[i] = -1;

    for(var i = 0; i<15; i++)exp_str[i] = '';

    var item = [
	'��',		'��',		'��',		'�ő�',	'�ʎ�',
	'�ԉʎ�',	'���̂�',	'����',		'�t��',	'��',
	'����',		'������',		'�t��',		'����',	'��',
	'������',	'�L�̎�',	'�S��',		'��',	'����',
	'��',		'�J�[�h',	'�}�X�N',	'�e��',	'���{��'
    ];
    var item_help = [
	['���ʂ̐�',		'�E�g�o�{�P',		''],
	['�����̖�',		'�E�K���x�{�P',		''],
	['��',		'�E�H�ɂg�o��',	'�E�H�ɂg�o����'],
	['�ő�',		'�E�H�ɍK���x��',	'�E�H�ɍK���x����'],
	['�ʎ�',		'�E�g�o�{�R�O',		''],
	['�ԉʎ�',		'�E�K���x�{�R�O',	''],
	['�������邫�̂�',	'�E�X�s�[�h�A�b�v',	'�E�]�����₷���{�P'],
	['�������Ȃ��炵��',	'�E���ɖ���',		''],
	['�t��',		'�E���ɖ���',		''],
	['�^�C���オ��T�v��',	'�E�^�C�A�b�v',		'���l��������܂�'],
	['�g�����L�т�T�v��',	'�E�w���L�т�',		'���l��������܂�'],
	['�K���̔������̌�',	'�E�p�����������Ȃ�',	''],
	['�t��',		'�E���ɖ���',		''],
	['����',		'�E���ɖ���',		''],
	['��',			'�E���ɖ���',		''],
	['�Ђ���́[',		'�E�G�𔚎E',		''],
	['�؂肽��',		'�E�̏W�񐔁{�P',	''],
	['�S��',		'�E��x�����h��',	''],
	['��',		'�E�g�o�|�T�O',		''],
	['�F��Ȃ���',		'�E�c�莞�ԁ{�P',	''],
	['�����l�܂��Ă���',	'�E�f�ފl��',		''],
	['�����l�܂��Ă���',	'�E�f�n�k�c�l��',	''],
	['�}�X�N',		'�E�ߍ��ȏꏊ�ł�',	'�@��x���������\'],
	['�x������',		'�E���Z�b�g�{�^��',	''],
	['�󏭕i',		'�E���ɖ���',		'']
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

    var end_src = [];
    for(var i = 1; i<10; i++)end_src.push('end'+i+'.png');
    var ends = [];
    for (var i in end_src) {
        ends[i] = new Image();
        ends[i].src = end_src[i];
    }

    var srcs1 = [
	'back.png',
        'title1.png'
    ];
    for(var i = 1; i<19; i++)srcs1.push('char'+i+'.png');//2-20
    for(var i = 1; i<57; i++)srcs1.push('field'+i+'.png');//21-77
    var field_name = [
	'�@���@��',	'�@�΁@�i',	'�@�΁@�i',	'�@�Q�@��',	'�@�΁@��',
	'�@���@��',	'�@���@��',	'�@�X�@��',	'�@���@��',	'�@�g�@�t',
	'�@�a�@��',	'�@��@��',	'�@��@��',	'�@���@��',	'�@�́@��',
	'�@�΁@��',	'�@�ԁ@��',	'�@�l�@��',	'�@�l�@��',	'�@�C�@��',
	'�@�΁@��',	'�@���@��',	'�@���@��',	'�@���@��',	'�@���@��',
	'�@���@��',	'�@��@��',	'�@�́@�n',	'�@�R�@�x',	'�@�ԁ@��',
	'�@���@�s',	'�@��@��',	'�@�X�@�H',	'�@�p�@��',	'�@�s�@�s',
	'�@�ف@�E',	'�@�ف@�E',	'�@�ف@�E',	'�@�ف@�E',	'�@�ف@�E',
	'�@�ف@�E',	'�@�ف@�E',	'�@�ف@�E',	'�@�ځ@�G',	'�@�ف@�E',
	'�@�ف@�E',	'�@�n�@��',	'�@�\�@��',	'�@�\�@��',	'�@�\�@��',
	'�@�M�@��',	'�@���@��',	'�@���@�a',	'�@���@��',	'�@�{�@��',
	'�@�^�@��'
    ];
    srcs1.push('char19.png');
    var srcs2 = [];
    for(var i = 1; i<15; i++)srcs2.push('frame'+i+'.png');
    var srcs3 = [];
    for(var i = 0; i<46; i++)srcs3.push('icon'+i+'.png');

    var images = [];
    for (var i in srcs1) {
        images[i] = new Image();
        images[i].src = srcs1[i];
    }
    var frames = [];
    for (var i in srcs2) {
        frames[i] = new Image();
        frames[i].src = srcs2[i];
    }
    var icons = [];
    for (var i in srcs3) {
        icons[i] = new Image();
        icons[i].src = srcs3[i];
    }

    var loadedCount = 1;
    for (var i in images) {
        images[i].addEventListener('load', function() {
            if (loadedCount == images.length) {
                for (var j in images) {
			//if(j==0)ctx.drawImage(images[j], 0, 0, w, h);
                }
            }
            loadedCount++;
        }, false);
    }
    for (var i in frames) {
        frames[i].addEventListener('load', function() {
            if (loadedCount == frames.length) {
                for (var j in frames) {
			//if(j==0)ctx.drawImage(frames[j], 0, 0, w, h);
                }
            }
            loadedCount++;
        }, false);
    }
    for (var i in icons) {
        icons[i].addEventListener('load', function() {
            if (loadedCount == icons.length) {
                for (var j in icons) {
			//if(j==0)ctx.drawImage(icons[j], 0, 0, w, h);
                }
            }
            loadedCount++;
        }, false);
    }
    charDefault.src = 'char1.png';
    for(var i = 0; i < 100; i++)cnt[i] = 0;
    init();
    renderTitle();

function init(){
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
		//key_item_know[i] = [0,0,0];
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
	charDefault = images[2];
	for(var i = 0; i < 100; i++)cnt[i] = 0;
}

function renderTitle(){
	if(cnt[40]==0){
		audio_def.pause();
		audio_def.loop = true;
		audio_def.src = "1.mp3";
		audio_def.currentTime = 0;
		audio_def.play();
	}
	audio_def.volume = 0.01*cnt[40];
	if(cnt[40]<30)cnt[40]++;

	ctx.drawImage(images[0], 0, 0, w, h);
	ctx.drawImage(images[1], 220, -50,580,480);
	ctx.drawImage(charDefault, 0-cnt[99], 0);
	ctx.drawImage(frames[0], 0, 0,w/2,h/2);
	ctx.drawImage(frames[1], w/2, h/2,w/2,h/2);
	if(on_mouse_title==1){
	ctx.drawImage(frames[6], 370, 400,280,90);
	}else{
	ctx.drawImage(frames[3], 370, 400,280,90);
	}

	ctx.font= 'bold 25px ���C���I';
	ctx.font= 'bold 25px HG����E';
	ctx.strokeStyle = '#333';
	ctx.lineWidth = 6; 
	ctx.lineJoin = 'round';
	ctx.fillStyle = '#fff';
	ctx.strokeText('P L A Y',461,455,510);
	ctx.fillText('P L A Y',461,455);

	ctx.globalAlpha = 1.0-0.01*cnt[0];
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,w,h);
	ctx.globalAlpha = 1.0;
	if(cnt[0]<100)cnt[0] += 1;
	if(cnt[99]>0)cnt[99] -= 1;
	if(cnt[99]==2)charDefault = images[8];
	requestId = window.requestAnimationFrame(renderTitle); 
}
function renderStory(){
	ctx.drawImage(images[0], 0, 0, w, h);
	ctx.drawImage(charDefault, 0, 0);
	ctx.drawImage(frames[0], 0, 0,w/2,h/2);
	ctx.drawImage(frames[1], w/2, h/2,w/2,h/2);
	
	ctx.globalAlpha = 1.0-0.01*cnt[1];
	ctx.drawImage(images[1], 220, -50,580,480);
	ctx.drawImage(frames[2], 370, 400,280,90);
	ctx.globalAlpha = 1.0;

	ctx.fillStyle = 'rgb(0,0,0)';
	ctx.fillRect(0,0,w,cnt[1]*0.6);
	ctx.fillRect(0,h-cnt[1]*0.7,w,h);

	ctx.globalAlpha = 0.01*cnt[2];
	ctx.font= 'bold 30px ���C���I';
	ctx.font= 'bold 35px HG����E';
	ctx.strokeStyle = '#333';
	ctx.fillStyle = '#fff';
	var posy = 120;

	var pro = [
		'���̖��O�͊G�ޒ��B',
		'�ō��̃G�i�h������邽��',
		'�B���p�m��ڎw����',
		'���̂܂܂ł͑呲���E�I',
		'�O����̖ʐڂ܂ł�',
		'���ʕ����d�グ�悤�I'
	];
	if(achieve==0 || achieve==1 || achieve==2){
		for(var i = 0; i < 6; i++){
			ctx.strokeText(pro[i],220+(550-35*pro[i].length)/2,posy+i*70,510);
			ctx.fillText(pro[i],220+(550-35*pro[i].length)/2,posy+i*70);
		}
	}


/*
	if(achieve==1){
		for(var i = 0; i < 6; i++){
			ctx.strokeText(pro[i],400,posy+i*70,510);
			ctx.fillText(pro[i],400,posy+i*70);
		}
	}
	if(achieve==2){
		for(var i = 0; i < 6; i++){
			ctx.strokeText(pro[i],400,posy+i*75,510);
			ctx.fillText(pro[i],400,posy+i*75);
		}
	}
*/

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
	//�ጴ
	if(exp_area==31 && item_eff[22]==0){
		happy -= 150;
		if(happy<0)happy = 0;
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		exp_str[0] = '�����ŐS���܂ꂻ�����c�c�I';
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		exp_str[0] = '�G�ޒ��̐S�ɂP�T�O�_���[�W�I';
	}
	//�يE
	if(34<exp_area && exp_area<46){
		if(key_item[3]==-1 && item_eff[22]==0){
			hp -= 150;
			if(hp<0)hp = 0;
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			exp_str[0] = '�يE�ł͑����o���Ȃ��c�c�I';
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			exp_str[0] = '�G�ޒ��ɂP�T�O�_���[�W�I';
		}
	}
	//�n��
	if(exp_area==46 && item_eff[22]==0){
		hp -= 150;
		if(hp<0)hp = 0;
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		exp_str[0] = '�g�̂��Ă���Ă���c�c�I';
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		exp_str[0] = '�G�ޒ��ɂP�T�O�_���[�W�I';
	}
	if(exp_status!=-1){
		if(exp_status==0){
			//�]��
			exp_status = Math.floor(Math.random()*2)-1;
			var hit = Math.floor(Math.random()*3);
			if(hit==0){
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '���������ē����Ȃ��I';
				return;
			}
		}else if(exp_status==100 || exp_status==101 || exp_status==102){
			//�퓬
			exp_status++;
			var rnd = Math.floor(Math.random()*6);
			var vict = false;
			if(item_eff[15]==1){
				onClickSE(11);
				item_eff[15]=0;
				exp_status=-1;
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '�G�ޒ��u�q���b�n�[�[�I�I�v';
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '�����X�^�[�𔚎E�����I';
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				var i = Math.floor(Math.random()*10+15);
				var n = Math.floor(Math.random()*3+1);
				item_stack[i]+=n;
				exp_str[0] = item[i]+'��'+n+'��ɓ��ꂽ�B';
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
				exp_str[0] = '�G�ޒ��u�V�n�D�D�D�[�[�[�b�b�I�I�v';
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '�G�ޒ��̍U���I�@�����X�^�[�͔����l�U�I';
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '�����X�^�[��|�����I';
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				var i = Math.floor(Math.random()*10+15);
				var n = Math.floor(Math.random()*5+1);
				item_stack[i]+=n;
				exp_str[0] = item[i]+'��'+n+'��ɓ��ꂽ�B';
				score += 200;
			}else{
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '�G�ޒ��u�n�C���@�@�@�`�`�`�g�g�g�g�I�I�v';
				var dmg = Math.floor(score/200)-exp_mon_def;
				if(dmg<0)dmg=0;
				if(dmg>99)dmg=99;
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '�G�ޒ��̍U���I�@�����X�^�[��'+dmg+'�_���[�W�I';
				exp_mon_hp -= dmg;
				if(exp_mon_hp<1)vict=true;
				if(vict){
					onClickSE(15);
					exp_status=-1;
					for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
					exp_str[0] = '�����X�^�[��|�����I';
					for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
					var i = Math.floor(Math.random()*10+15);
					var n = Math.floor(Math.random()*3+1);
					item_stack[i]+=n;
					exp_str[0] = item[i]+'��'+n+'��ɓ��ꂽ�B';
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
					exp_str[0] = '�����X�^�[�̍U���I�@�G�ޒ���'+dmg+'�_���[�W�I';
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
				exp_str[0] = '�G�ޒ��u�I���r�[�g���v'
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '�G�ޒ��͑h�����B'
			}
			if(ability_have[8]!=-1){
				if(key_item[ability_have[8]]!=-1 && hp==0){
					onClickSE(12);
					hp=200;
					for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
					exp_str[0] = '�s���̗͂őh�����I'
				}
			}
			if(hp==0 || happy==0){
				charDefault = images[8];
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '����ł��܂����c�c�I'
			}
			return;
		}else if(exp_status==103){
			//����
			onClickSE(13);
			exp_status=-1;
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			exp_str[0] = '�G�ޒ��͓����o�����I';
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
		exp_str[0] = item[i]+'����ɓ��ꂽ�B';
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
		charDefault = images[8];
		exp_str[0] = '�]�񂾁I�@�G�ޒ���'+dmg+'�_���[�W�B';
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
		charDefault = images[4];
		exp_str[0] = '�������E�����B'+g+'�S�[���h�l���B';
		break;
	case  3 : 
		onClickSE(21);
		var per = (100-Math.floor(Math.random()*41-20))/100;
		exp_mon_hp  = Math.floor(exp_area * per)+1;
		exp_mon_atk = Math.floor(exp_area * per)+1;
		exp_mon_def = Math.floor(exp_area/5 * per)+1;
		//console.log(exp_area+" * "+per+" +1 = "+exp_mon_hp);
		//console.log(exp_area/5+" * "+per+" +1 = "+exp_mon_def);
		var sys = '';
		if(per>1.15)sys='���߂�';
		if(per<0.86)sys='��߂�'
		exp_str[0] = sys+'�����X�^�[�����ꂽ�I';
		exp_status = 100;
		break;
	case  4 : 
		quest_chance++;
		exp_str[0] = '�f�ނ̋C�z������c�c�B';
		break;
	case  5 : 
		onClickSE(17);
		if(happy<200){
			happy += Math.floor((200-happy)*0.3)+1;
			if(happy>200)happy = 200;
		}
		charDefault = images[9];
		exp_str[0] = '�ق̂��ȍK�����������B';
		break;
	case  6 : 
		onClickSE(16);
		var hit = Math.floor(Math.random()*56);
		score += 10;
		happy /= 10;
		if(happy<1)happy=0;
		charDefault = images[8];
		if(hit<exp_area){
			var dmg = Math.floor(Math.random()*40+30);
			if(ability_have[2]!=-1){
				if(key_item[ability_have[2]]!=-1)dmg=Math.floor(dmg*0.8);
			}
			hp -= dmg;
			if(hp<1)hp=0;
			exp_str[0] = '�R���痎�����I�@�G�ޒ���'+dmg+'�_���[�W�B';
		}else{
			exp_status = 0;
			exp_str[0] = '�R���痎�����I�@�����������I';
		}
		break;
	case  7 : 
		var n = Math.floor(Math.random()*21);
		if(key_achieve<2 && n>8){
			exp_str[0] = '�������������B';
		}else{
			if(key_item_know[Math.floor(n/3)][n%3]==-1){
				onClickSE(9);
				key_item_know[Math.floor(n/3)][n%3] = 0;
				exp_str[0] = '�B���̃q���g�𓾂��I';
			}else{
				exp_str[0] = '�������������B';
			}
		}
		break;
	case  8 : 
		exp_str[0] = '�ʐڊ������ꂽ�I';
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		var v = Math.floor(Math.random()*(2+item_eff[15]));
		if(v==0){
			onClickSE(20);
			if(happy<100){hp = 0; happy = 0;}else if(happy<300){happy -= 100;}
			exp_str[0] = '�F�@��@��@���@�I�@';
		}else{
			if(item_eff[15]==1){
				onClickSE(11);
				item_eff[15]=0;
				exp_str[0] = '�G�ޒ��u�q���b�n�[�[�I�I�v';
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '�ʐڊ��𔚎E�����I';
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				var i = Math.floor(Math.random()*5+20);
				var n = Math.floor(Math.random()*2+3);
				item_stack[i]+=n;
				exp_str[0] = item[i]+'��'+n+'��ɓ��ꂽ�B';
				score += 2000;
				
			}else{	
				onClickSE(19);
				score += 100;
				exp_str[0] = '���܂����߂������I';
			}
		}
		break;
	case  9 : 
		exp_str[0] = '���[�Ńp�����E�����B';
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
				exp_str[0] = '�K���̖����I�@�G�ޒ��̂g�o��'+dmg+'�񕜁I';
			}else{
				exp_str[0] = '���������I�@�G�ޒ��̂g�o��'+dmg+'�񕜁I';
			}
		}else if(dmg==0){
			exp_str[0] = '����ς�̂Ă��B';
		}else{
			onClickSE(16);
			exp_str[0] = '�����Ă����I�@�G�ޒ���'+(-dmg)+'�_���[�W�B';
		}
		break;
	case 10 : 
		quest_chance++;
		if(exp_area==0 || exp_area==3 || exp_area==5){
			onClickSE(8);
			var g = Math.floor(Math.random()*70+30);
			gold += g;
			exp_str[0] = '���ΑK���E�����B'+g+'�S�[���h�l���B';
		}else{
			exp_str[0] = '�������������B';
		}
		break;
	case 11 : 
		quest_chance++;
		if(11<exp_area && exp_area<17){
			onClickSE(18);
			exp_str[0] = '���񂾗N�����������B';
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			var n = Math.floor(Math.random()*3+1);
			item_stack[0]+=n;
			exp_str[0] = item[0]+'��'+n+'��ɓ��ꂽ�B';
		}else{
			exp_str[0] = '�������������B';
		}
		break;
	case 12 : 
		quest_chance++;
		if(exp_area==17 || exp_area==18 || exp_area==19){
			onClickSE(18);
			exp_str[0] = '�V�R�̉����������B';
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			var n = Math.floor(Math.random()*5+1);
			item_stack[1]+=n;
			exp_str[0] = item[1]+'��'+n+'��ɓ��ꂽ�B';
		}else{
			exp_str[0] = '�������������B';
		}
		break;
	case 13 : 
		quest_chance++;
		if(exp_area==8){
			onClickSE(18);
			exp_str[0] = '���̂��������Ă���B';
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			var n = Math.floor(Math.random()*5+1);
			item_stack[6]+=n;
			exp_str[0] = item[6]+'��'+n+'��ɓ��ꂽ�B';
		}else if(exp_area==30){
			exp_str[0] = '�Âт����������Ă���B';
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			var n = Math.floor(Math.random()*4);
			item_stack[19]+=n;
			if(n==0){
				exp_str[0] = '�����͕���Ă��܂����c�c�B';
			}else{
				onClickSE(18);
				exp_str[0] = item[19]+'��'+n+'��ɓ��ꂽ�B';
			}
		}else{
			exp_str[0] = '�������������B';
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
			exp_str[0] = '���󂪘c��ł���B';
		}else{
			exp_str[0] = '�������������B';
		}
		break;
	case 15 : quest_chance++;
		exp_str[0] = '�������������B';
		break;
	case 16 :quest_chance++;
		exp_str[0] = '�������������B';
		break;
	case 17 : quest_chance++;
		exp_str[0] = '�������������B';
		break;
	case 18 : quest_chance++;
		exp_str[0] = '�������������B';
		break;
	case 19 : 
		if((key_achieve<3 && quest_item!=-1 && quest_item<20) || (exp_area>51 && quest_item!=-1)){
			onClickSE(18);
			item_stack[quest_item]++;
			score += 10;
			exp_str[0] = item[quest_item]+'����ɓ��ꂽ�B';
		}else{
			quest_chance++;
			exp_str[0] = '�������������B';
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
		exp_str[0] = '�G�ޒ��u�I���r�[�g���v'
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		exp_str[0] = '�G�ޒ��͑h�����B'
	}
	if(ability_have[8]!=-1){
		if(key_item[ability_have[8]]!=-1 && hp==0){
			onClickSE(12);
			hp=200;
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			exp_str[0] = '�s���̗͂őh�����I'
		}
	}
	if(hp==0 || happy==0){
		charDefault = images[8];
		for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
		if(hp==0){
			exp_str[0] = '����ł��܂����c�c�I'
		}else{
			exp_str[0] = '�S���܂�Ă��܂����c�c�I'
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

		//���ʕ�
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
						if(key_achieve==3)status = "���������B���p�m";
						if(key_achieve==7)status = "���ʂɘB���p�m";
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

		//�����A�C�e������
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
	var time = 1;
	if(ability_have[12]!=-1){
		if(key_item[ability_have[12]]!=-1)time=1.2;
	}
	cnt[92]+=time;
	modTime();
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
			ctx.drawImage(frames[10], 10+(pos_cnt%5)*38, 490-Math.floor(pos_cnt/5)*38, 32, 32);
			ctx.drawImage(icons[i], 10+(pos_cnt%5)*38, 490-Math.floor(pos_cnt/5)*38, 32, 32);
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
	if(cnt[92]>0){requestAnimationFrame(modTime);} 
}
function appTime(){
	//console.log(audio_def.currentTime);
	ctx.font= 'bold 35px HG����E';
	var grad  = ctx.createLinearGradient(0,560,0,590);
	/* �O���f�[�V�����I�_�̃I�t�Z�b�g�ƐF���Z�b�g */
	grad.addColorStop(0,'#000');
	grad.addColorStop(0.6,'#ddd');

	grad.addColorStop(1,'#000');
	
	/* �O���f�[�V������fillStyle�v���p�e�B�ɃZ�b�g */
	ctx.fillStyle = grad;
	ctx.lineWidth = 3;
	ctx.lineJoin = 'round';
	ctx.strokeStyle = '#fff';
	cnt[95]++;//�_��
	if(cnt[95]==50){
		cnt[93]++;//���^�C�}�[
		if(cnt[93]==30){
			cnt[93]=0;
			cnt[92]++;//�^�C�}�[�ϐ�
			modTime();//�����C��
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

	ctx.font= 'bold 15px HG����E';
	ctx.strokeText('�c�莞��',45,553,510);
	ctx.fillText('�c�莞��',45,553);

	ctx.font= '15px ���C���I';
	ctx.fillStyle = '#fff';
	if(on_mouse_help.match(/�������V�s/)){
		var num = on_mouse_help.charAt(5) -1;
		for(var i = 0; i<3; i++){
			if(key_item_know[num][i]!=-1){
				ctx.drawImage(frames[10], 360+i*58, 550, 32, 32);
				ctx.drawImage(icons[key_item_recipe[num][i]], 360+i*58, 550, 32, 32);
			}else{
				ctx.drawImage(frames[10], 360+i*58, 550, 32, 32);
				ctx.drawImage(icons[25], 360+i*58, 550, 32, 32);
			}
		}
		var pos = 50;
		ctx.fillText('�B�����V�s�̃q���g�F�@�@�@�{�@�@�@�{�@�@�@�@�@�@',150+pos,570);
	}else{
		//var pos = (650 - 15*on_mouse_help.length)/2;
		//ctx.fillText(on_mouse_help,150+pos,570);
		var pos = (880 - 15*on_mouse_help.length)/2;
		ctx.fillText(on_mouse_help,pos,570);
	}

	if(!music_mute){
		ctx.drawImage(icons[30], 750, 550, 32, 32);
	}else{
		ctx.drawImage(icons[31], 750, 550, 32, 32);
	}
}
function appFrame(){
	ctx.drawImage(images[0], 0, 0, w, h);
	if(on_drag && happy>720)ctx.drawImage(images[0], -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
	ctx.drawImage(charDefault, 0, 0);
	ctx.drawImage(frames[0], 0, 0,w/2,h/2);
	ctx.drawImage(frames[1], w/2, h/2,w/2,h/2);
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
	/* �O���f�[�V�����I�_�̃I�t�Z�b�g�ƐF���Z�b�g */
	grad.addColorStop(0,'#2f2');
	grad.addColorStop(0.6,'#cfc');

	grad.addColorStop(1,'#484');
	
	/* �O���f�[�V������fillStyle�v���p�e�B�ɃZ�b�g */
	ctx.fillStyle = grad;
	ctx.fillRect(80,40,happy,10);
}
function appStatus(){
	ctx.drawImage(icons[26], 15, 5, 50, 50);
	ctx.font= '18px ���C���I';
	ctx.strokeStyle = '#999';
	ctx.lineWidth = 2;
	ctx.lineJoin = 'round';
	ctx.fillStyle = '#fff';
	ctx.strokeText('�G�ޒ�',80,25,510);
	ctx.fillText('�G�ޒ�',80,25);
	ctx.strokeText(status,150,25,510);
	ctx.fillText(status,150,25);

	ctx.font= 'bold 18px ���C���I';
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
	ctx.drawImage(frames[13], 0, 350-cnt[21]+cnt[22]-use_taima*3);
	
	if(cnt[21]<100){
		cnt[21]+=20;
		//cnt[21]+=8;
		//if(cnt[21]<60)cnt[21]+=4;
		//if(cnt[21]<80)cnt[21]+=4;
		//if(cnt[21]<90)cnt[21]+=4;
	}else{
		cnt[22]+=12;
		//cnt[22]+=6;
		//if(cnt[22]<60)cnt[22]+=4;
		//if(cnt[22]<80)cnt[22]+=4;
		//if(cnt[22]<90)cnt[22]+=4;
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
	ctx.drawImage(images[0], 0, 0, w, h);
	if(on_drag && happy>720)ctx.drawImage(images[0], -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
	ctx.drawImage(charDefault, 0, 0);

	ctx.globalAlpha = 0.01*cnt[1];
	for(var i = 0; i<3; i++){
		if(on_mouse_main == i){
			ctx.drawImage(frames[4], 480,  80+i*100, 300, 100);
		}else{
			ctx.drawImage(frames[5], 480,  80+i*100, 300, 100);
		}
	}

	ctx.drawImage(frames[0], 0, 0,w/2,h/2);
	ctx.drawImage(frames[1], w/2, h/2,w/2,h/2);

	ctx.font= 'bold 35px HG����E';
	ctx.strokeStyle = '#333';
	ctx.fillStyle = '#edf';
	ctx.lineWidth = 6;
	if(on_mouse_main==0){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
	ctx.strokeText('�́@�W',576,145,510);
	ctx.fillText('�́@�W',576,145);
	if(on_mouse_main==1){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
	ctx.strokeText('�B�@��',576,245,510);
	ctx.fillText('�B�@��',576,245);
	if(on_mouse_main==2){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
	ctx.strokeText('�ˁ@��',576,345,510);
	ctx.fillText('�ˁ@��',576,345);

	ctx.drawImage(frames[10],570,390,120,50);
	ctx.font= 'bold 25px HG����E';
	ctx.strokeStyle = '#333';
	ctx.fillStyle = '#edf';
	ctx.lineWidth = 4;
	if(on_mouse_main==3){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
	ctx.strokeText('�x�e',605,425,510);
	ctx.fillText('�x�e',605,425);

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
	/* �O���f�[�V�����I�_�̃I�t�Z�b�g�ƐF���Z�b�g */
	grad.addColorStop(0,'#2f2');
	grad.addColorStop(0.6,'#cfc');

	grad.addColorStop(1,'#282');
	
	/* �O���f�[�V������fillStyle�v���p�e�B�ɃZ�b�g */
	ctx.fillStyle = grad;
	ctx.fillRect(80,40,happy,cnt[1]*0.1);

	appStatus();

	//���ʕ��v���[�g
	ctx.drawImage(frames[10],270,70,178,40);
	//�g��
	if(key_achieve>2){
		ctx.font= 'bold 25px HG����E';
		ctx.fillStyle = '#fff';
		if(key_pos!=0){
			ctx.drawImage(frames[10],240,70,20,40);
			ctx.fillText('�s',230,99);
		}
		if(key_pos!=4){
			ctx.drawImage(frames[10],457,70,20,40);
			ctx.fillText('�t',461,99);
		}
	}
	
	//���ʕ��g
	ctx.drawImage(frames[9],240-  4,120,74,75);
	ctx.drawImage(frames[9],240+ 81,120,74,75);
	ctx.drawImage(frames[9],240+166,120,74,75);
	ctx.drawImage(frames[10],240,210,235,210);
	ctx.fillStyle = '#ec9';
	ctx.fillRect(240    ,124,65,65);
	ctx.fillRect(240+ 85,124,65,65);
	ctx.fillRect(240+170,124,65,65);
	ctx.fillStyle = '#864';
	ctx.fillRect(240    ,124,65,1);
	ctx.fillRect(240    ,124,1,65);
	ctx.fillRect(240+ 85,124,65,1);
	ctx.fillRect(240+ 85,124,1,65);
	ctx.fillRect(240+170,124,65,1);
	ctx.fillRect(240+170,124,1,65);
	if(key_item[0+key_pos]==0)ctx.drawImage(icons[32+key_ability[key_pos]],241    ,125,64,64);
	if(key_item[1+key_pos]==0)ctx.drawImage(icons[32+key_ability[key_pos+1]],241+ 85,125,64,64);
	if(key_item[2+key_pos]==0)ctx.drawImage(icons[32+key_ability[key_pos+2]],241+170,125,64,64);

	ctx.font= 'bold 20px HG����E';
	ctx.lineWidth = 4;
	ctx.strokeStyle = '#333';
	ctx.fillStyle = '#fff';
	var t;
	if(key_achieve < 3){
		t = '���݂̐��ʕ�';
	}else{
		t = '���ʕ����o';
	}
	ctx.strokeText(t,260+(200-t.length*21)/2,97,510);
	ctx.fillText(t,260+(200-t.length*21)/2,97);

	if(drag==1){
		ctx.strokeStyle = '#666';
		ctx.drawImage(icons[28],278,223,164,164);
		ctx.drawImage(icons[29],275,220,164,164);
	}else{
		ctx.strokeStyle = '#333';
		ctx.drawImage(icons[28],278,223,164,164);
		ctx.drawImage(icons[27],275,220,164,164);
	}
	ctx.font= 'bold 20px HG����E';
	t = '�G�i�h���������F'+have_taima;
	ctx.strokeText(t,270-(t.length-8)*4,408,510);
	ctx.fillText(t,270-(t.length-8)*4,408);

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
	ctx.drawImage(images[0], 0, 0, w, h);
	if(on_drag && happy>720)ctx.drawImage(images[0], -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
	ctx.drawImage(charDefault, 0, 0);

	if(20<cnt[2]){ctx.globalAlpha = 1.2-cnt[2]*0.01;}else{ctx.globalAlpha = 1.0;}
	ctx.drawImage(frames[2], (cnt[2]-20)*4, 0, 400-(cnt[2]-20)*4, 180, 480+(cnt[2]-20)*3,  80, 300-(cnt[2]-20)*3, 100);
	ctx.drawImage(frames[2], (cnt[2]-10)*4, 0, 400-(cnt[2]-10)*4, 180, 480+(cnt[2]-10)*3, 180, 300-(cnt[2]-10)*3, 100);
	ctx.drawImage(frames[2], (cnt[2]- 0)*4, 0, 400-(cnt[2]- 0)*4, 180, 480+(cnt[2]- 0)*3, 280, 300-(cnt[2]- 0)*3, 100);
	ctx.globalAlpha = 1.0;

	ctx.drawImage(frames[0], 0, 0,w/2,h/2);
	ctx.drawImage(frames[1], w/2, h/2,w/2,h/2);

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
			rnd1 = Math.floor(Math.random()*7)+20+exp_area-3+item_eff[6]*2;
			rnd2 = Math.floor(Math.random()*7)+20+exp_area-3+item_eff[6]*2;
			if(rnd1==rnd2)rnd1++;
			if(rnd1<20 || rnd2<20){rnd1+=4; rnd2+=4;}
			if(rnd1>75)rnd1-=56;
			if(rnd2>75)rnd2-=56;
			if(images[0]!=images[rnd1] && images[0]!=images[rnd2])break;
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

	ctx.font= 'bold 35px HG����E';
	ctx.strokeStyle = '#333';
	ctx.fillStyle = '#fff';
	ctx.lineWidth = 6;
	ctx.strokeText('�ǂ���֐i�ށH',365,125+10-cnt[6],510);
	ctx.fillText('�ǂ���֐i�ށH',365,125+10-cnt[6]);

	var on = 0;
	ctx.font= 'bold 25px HG����E';
	var select1 = field_name[rnd1-20];
	var select2 = field_name[rnd2-20];
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
	ctx.drawImage(images[rnd1],245-on,165-on+10-cnt[6],230,160,245-on,165-on+10-cnt[6],230,160);
	if(on_mouse_exp == 2){on = 2;}else{on = 0;}
	ctx.drawImage(images[rnd2],515-on,165-on+10-cnt[6],230,160,515-on,165-on+10-cnt[6],230,160);

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
	ctx.font= 'bold 35px HG����E';
	ctx.strokeStyle = '#333';
	ctx.fillStyle = '#fff';
	ctx.lineWidth = 6;
	ctx.strokeText('�ǂ���֐i�ށH',365,125,510);
	ctx.fillText('�ǂ���֐i�ށH',365,125);

	var on = 0;
	ctx.font= 'bold 25px HG����E';
	var select1 = field_name[rnd1-20];
	var select2 = field_name[rnd2-20];
	if(on_mouse_exp == 1){on = 2;}else{on = 0;}
	ctx.strokeText(select1,290-on,360-on,510);
	ctx.fillText(select1,290-on,360-on);
	if(on_mouse_exp == 2){on = 2;}else{on = 0;}
	ctx.strokeText(select2,570-on,360-on,510);
	ctx.fillText(select2,570-on,360-on);

	ctx.fillStyle = '#fff';
	ctx.fillRect(240-on,160-on,240,170);
	ctx.fillRect(510-on,160-on,240,170);
	ctx.drawImage(images[rnd1],245-on,165-on,230,160,245-on,165-on,230,160);
	ctx.drawImage(images[rnd2],515-on,165-on,230,160,515-on,165-on,230,160);
	ctx.globalAlpha = 1.0;

	ctx.globalAlpha = 0.01*cnt[4];
	if(on_mouse_exp == 1){
		ctx.drawImage(images[rnd1],0,0,w,h);
	}else{
		ctx.drawImage(images[rnd2],0,0,w,h);
	}
	ctx.globalAlpha = 1.0;

	ctx.drawImage(charDefault, 0, 0);
	ctx.drawImage(frames[0], 0, 0,w/2,h/2);
	ctx.drawImage(frames[1], w/2, h/2,w/2,h/2);
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
			images[0] = images[rnd1];
			dis = Math.abs(exp_area - (rnd1-20));
			exp_area = rnd1-20;
		}else{
			images[0] = images[rnd2];
			dis = Math.abs(exp_area - (rnd2-20));
			exp_area = rnd2-20;
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
	ctx.drawImage(frames[9],0,50,200,100, 280,60,420,470);
	ctx.drawImage(frames[12],295,60,388,470);
	ctx.fillStyle = '#864';
	ctx.fillRect(295,60,1,470);
	ctx.fillRect(682,60,1,470);
	ctx.globalAlpha = 1.0;

	if(!click_wait2 && !click_wait3){
		if(cnt[5]==0){
			for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
			var str = field_name[exp_area].replace(/\s+/g, '' );
			exp_str[0] = str+'�ɂ���Ă����B';
		}
		//if(cnt[5]<1000){
			if(exp_act==exp_act_num){
				exp_act++;
				exp_status=-1;
				for(var i = 14; i>0; i--)exp_str[i] = exp_str[i-1];
				exp_str[0] = '��ꂽ����A�����A��B';
			}else if(exp_act<exp_act_num){
				if(cnt[5]==40*exp_act){
					exp_act++;
					questEvent();
				}
			}
		//}
	}
	if(cnt[5]<40*exp_act)cnt[5]++;

	ctx.globalAlpha = 0.01*cnt[4];
	ctx.font= 'bold 18px ���C���I';
	ctx.strokeStyle = '#333';
	ctx.fillStyle = '#fff';
	ctx.lineWidth = 4;
	var line = 0;
	for(var i in exp_str){
		ctx.globalAlpha = 0.3;
		ctx.strokeText(exp_str[14-i],318,98+line*30,510);
		ctx.globalAlpha = 1.0;

		if(exp_str[14-i].match(/��ɓ��ꂽ/)){
			//�A�C�e������ɓ��ꂽ
			var len = exp_str[14-i].search(/��/);
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
		}else if(exp_str[14-i].match(/�S�[���h�l��/) || exp_str[14-i].match(/�߂�����/)){
			//�������E����
			ctx.strokeStyle = '#331';
			ctx.fillStyle = '#fda';
			ctx.strokeText(exp_str[14-i],315,95+line*30,510);
			ctx.fillText(exp_str[14-i],315,95+line*30);
			ctx.strokeStyle = '#333';
			ctx.fillStyle = '#fff';
		}else if(exp_str[14-i].match(/�U��/) || exp_str[14-i].match(/�_���[�W/)){
			//�U���E�_���[�W
			ctx.strokeStyle = '#422';
			ctx.fillStyle = '#faa';
			ctx.strokeText(exp_str[14-i],315,95+line*30,510);
			ctx.fillText(exp_str[14-i],315,95+line*30);
			ctx.strokeStyle = '#333';
			ctx.fillStyle = '#fff';
		}else if(exp_str[14-i].match(/���E/)){
			//���E
			ctx.strokeStyle = '#422';
			ctx.fillStyle = '#faa';
			ctx.strokeText(exp_str[14-i],315,95+line*30,510);
			ctx.fillText(exp_str[14-i],315,95+line*30);
			ctx.strokeStyle = '#333';
			ctx.fillStyle = '#fff';
		}else if(exp_str[14-i].match(/�R/)){
			//�]��
			ctx.strokeStyle = '#422';
			ctx.fillStyle = '#faa';
			ctx.strokeText(exp_str[14-i],315,95+line*30,510);
			ctx.fillText(exp_str[14-i],315,95+line*30);
			ctx.strokeStyle = '#333';
			ctx.fillStyle = '#fff';
		}else if(exp_str[14-i].match(/���܂���/)){
			//���S
			ctx.strokeStyle = '#422';
			ctx.fillStyle = '#faa';
			ctx.strokeText(exp_str[14-i],315,95+line*30,510);
			ctx.fillText(exp_str[14-i],315,95+line*30);
			ctx.strokeStyle = '#333';
			ctx.fillStyle = '#fff';
		}else if(exp_str[14-i].match(/�F/)){
			//�F��
			ctx.strokeStyle = '#424';
			ctx.fillStyle = '#faf';
			ctx.strokeText(exp_str[14-i],315,95+line*30,510);
			ctx.fillText(exp_str[14-i],315,95+line*30);
			ctx.strokeStyle = '#333';
			ctx.fillStyle = '#fff';
		}else if(exp_str[14-i].match(/��/) || exp_str[14-i].match(/�h/)){
			//��
			ctx.strokeStyle = '#242';
			ctx.fillStyle = '#cfc';
			ctx.strokeText(exp_str[14-i],315,95+line*30,510);
			ctx.fillText(exp_str[14-i],315,95+line*30);
			ctx.strokeStyle = '#333';
			ctx.fillStyle = '#fff';
		}else if(exp_str[14-i].match(/�B��/)){
			//�B��
			ctx.strokeStyle = '#224';
			ctx.fillStyle = '#ccf';
			ctx.strokeText(exp_str[14-i],315,95+line*30,510);
			ctx.fillText(exp_str[14-i],315,95+line*30);
			ctx.strokeStyle = '#333';
			ctx.fillStyle = '#fff';
		}else if(exp_str[14-i].match(/�K��/)){
			//�K��
			ctx.strokeStyle = '#413';
			ctx.fillStyle = '#fce';
			ctx.strokeText(exp_str[14-i],315,95+line*30,510);
			ctx.fillText(exp_str[14-i],315,95+line*30);
			ctx.strokeStyle = '#333';
			ctx.fillStyle = '#fff';
		}else{
			//���̑�
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

	ctx.drawImage(images[0], 0, 0, w, h);
	if(on_drag && happy>720)ctx.drawImage(images[0], -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
	ctx.drawImage(charDefault, 0, 0);

	if(20<cnt[2]){ctx.globalAlpha = 1.2-cnt[2]*0.01;}else{ctx.globalAlpha = 1.0;}
	ctx.drawImage(frames[2], (cnt[2]-20)*4, 0, 400-(cnt[2]-20)*4, 180, 480+(cnt[2]-20)*3,  80, 300-(cnt[2]-20)*3, 100);
	ctx.drawImage(frames[2], (cnt[2]-10)*4, 0, 400-(cnt[2]-10)*4, 180, 480+(cnt[2]-10)*3, 180, 300-(cnt[2]-10)*3, 100);
	ctx.drawImage(frames[2], (cnt[2]- 0)*4, 0, 400-(cnt[2]- 0)*4, 180, 480+(cnt[2]- 0)*3, 280, 300-(cnt[2]- 0)*3, 100);
	ctx.globalAlpha = 1.0;

	ctx.drawImage(frames[0], 0, 0,w/2,h/2);
	ctx.drawImage(frames[1], w/2, h/2,w/2,h/2);

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

	ctx.drawImage(frames[9],236,147+m,275,276);

	ctx.drawImage(frames[9],236,66+m,74,75);
	ctx.drawImage(frames[9],236+100,66+m,74,75);
	ctx.drawImage(frames[9],236+200,66+m,74,75);

	ctx.drawImage(frames[9],554,249+m,183,169);

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
		ctx.drawImage(frames[8], 535, 150+m, 220, 80);
	}else{
		ctx.drawImage(frames[7], 535, 150+m, 220, 80);
	}
	if(on_mouse_alc_menu == 1){
		ctx.drawImage(frames[8], 260, 435+m, 220, 80);
	}else{
		ctx.drawImage(frames[7], 260, 435+m, 220, 80);
	}
	if(on_mouse_alc_menu == 2){
		ctx.drawImage(frames[8], 500, 435+m, 220, 80);
	}else{
		ctx.drawImage(frames[7], 500, 435+m, 220, 80);
	}

	ctx.font= 'bold 28px HG����E';
	ctx.fillStyle = '#edf';
	ctx.lineWidth = 6;
	if(on_mouse_alc_menu==0){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
	ctx.strokeText('�B�@��',601,200+m,510);
	ctx.fillText('�B�@��',601,200+m);
	if(on_mouse_alc_menu==1){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
	ctx.strokeText('�g�@�p',325,485+m,510);
	ctx.fillText('�g�@�p',325,485+m);
	if(on_mouse_alc_menu==2){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
	ctx.strokeText('���@�p',565,485+m,510);
	ctx.fillText('���@�p',565,485+m);
	
	for(var i = 0; i<3; i++){
		var num = alc_item[i];
		if(num!=-1){
			ctx.drawImage(icons[num], 244+i*100,74+m,57,57);
			ctx.font= 'bold 25px HG����E';
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
			ctx.drawImage(icons[tar], 565,260+m,64,64);
	
			ctx.font= 'bold 15px HG����E';
			ctx.strokeText('���l:'+tar*3+'G',648,325+m,510);
			ctx.fillText('���l:'+tar*3+'G',648,325+m);

			ctx.strokeText(item_help[tar][0],572,355+m,510);
			ctx.fillText(item_help[tar][0],572,355+m);
			ctx.strokeText(item_help[tar][1],565,380+m,510);
			ctx.fillText(item_help[tar][1],565,380+m);
			ctx.strokeText(item_help[tar][2],565,400+m,510);
			ctx.fillText(item_help[tar][2],565,400+m);	

		}else{
			name = '���m�F';
			ctx.drawImage(icons[25], 565,260+m,64,64);
		}
		ctx.font= 'bold 22px HG����E';
		ctx.strokeText(name,630+(100-22*name.length)/2,300+m,510);
		ctx.fillText(name,630+(100-22*name.length)/2,300+m);

	}


	if(-1<alc_item[3] && alc_item[3]<14){
		if(cnt[30]>0)ctx.globalAlpha = 1-0.1*cnt[30];
		//ctx.drawImage(icons[32+alc_item[3]], 597,267+m+cnt[30],100,100);
		ctx.drawImage(icons[32+alc_item[3]], 595,265+m+cnt[30],100,100);
		ctx.font= 'bold 22px HG����E';
		ctx.strokeStyle = '#333';
		ctx.fillStyle = '#fff';
		ctx.lineWidth = 4;
		ctx.strokeText('���ʕ���B���I',570,400+m,510);
		ctx.fillText('���ʕ���B���I',570,400+m);
		ctx.globalAlpha = 1.0;
	}else if(alc_item[3] == 99){
		if(cnt[30]>0)ctx.globalAlpha = 1-0.1*cnt[30];
		ctx.drawImage(icons[28], 597,267+m+cnt[30],100,100);
		ctx.drawImage(icons[27], 595,265+m+cnt[30],100,100);
		ctx.font= 'bold 22px HG����E';
		ctx.strokeStyle = '#333';
		ctx.fillStyle = '#fff';
		ctx.lineWidth = 4;
		ctx.strokeText('�G�i�h���B���I',570,400+m+cnt[30]/2,510);
		ctx.fillText('�G�i�h���B���I',570,400+m+cnt[30]/2);
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
				//ctx.drawImage(icons[i*5+j], 244+j*52-on, 154+i*52-on+m, 48, 48);
				ctx.drawImage(frames[10], 244+j*52-on, 154+i*52-on+m, 48, 48);
				ctx.drawImage(icons[i*5+j], 244+j*52-on, 154+i*52-on+m, 48, 48);
			}else{
				//ctx.drawImage(icons[0], 244+j*52-on, 154+i*52-on+m, 48, 48);
				ctx.drawImage(frames[10], 244+j*52-on, 154+i*52-on+m, 48, 48);
				ctx.drawImage(icons[25], 244+j*52-on, 154+i*52-on+m, 48, 48);
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
				ctx.font= 'bold 20px HG����E';
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
	ctx.drawImage(images[0], 0, 0, w, h);
	if(on_drag && happy>720)ctx.drawImage(images[0], -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
	ctx.drawImage(charDefault, 0, 0);

	if(20<cnt[2]){ctx.globalAlpha = 1.2-cnt[2]*0.01;}else{ctx.globalAlpha = 1.0;}
	ctx.drawImage(frames[2], (cnt[2]-20)*4, 0, 400-(cnt[2]-20)*4, 180, 480+(cnt[2]-20)*3,  80, 300-(cnt[2]-20)*3, 100);
	ctx.drawImage(frames[2], (cnt[2]-10)*4, 0, 400-(cnt[2]-10)*4, 180, 480+(cnt[2]-10)*3, 180, 300-(cnt[2]-10)*3, 100);
	ctx.drawImage(frames[2], (cnt[2]- 0)*4, 0, 400-(cnt[2]- 0)*4, 180, 480+(cnt[2]- 0)*3, 280, 300-(cnt[2]- 0)*3, 100);
	ctx.globalAlpha = 1.0;

	ctx.drawImage(frames[0], 0, 0,w/2,h/2);
	ctx.drawImage(frames[1], w/2, h/2,w/2,h/2);

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
	ctx.drawImage(images[0], 0, 0, w, h);
	if(on_drag && happy>720)ctx.drawImage(images[0], -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
	ctx.drawImage(charDefault, 0, 0);
	ctx.drawImage(frames[0], 0, 0,w/2,h/2);
	ctx.drawImage(frames[1], w/2, h/2,w/2,h/2);
	ctx.drawImage(images[76],860-3*cnt[5],0);
	//ctx.drawImage(images[2],880-3*cnt[5],0);
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,w,60);
	ctx.fillRect(0,530,w,h);
	appGage();
	appStatus();
	
	if(cnt[5]==100){
		if(cnt[7]<10){
			cnt[7]++;
			ctx.globalAlpha = 0.1*cnt[7];
			ctx.drawImage(frames[11],550-3*cnt[5],100+10-cnt[7],300,220);
			ctx.globalAlpha = 1.0;
		}else{
			if(cnt[7]<20)cnt[7]++;
			ctx.drawImage(frames[11],550-3*cnt[5],100,300,220);
		}
	if(cnt[7]==20){
		ctx.font= 'bold 30px HG����E';
		ctx.fillStyle = '#000';
		if(quest_conv==0){
			if(cnt[6]<10){
				cnt[6]++;
				ctx.globalAlpha = 0.1*cnt[6];
				console.log(quest_num);
				if(key_achieve<2 && quest_num>18){
					ctx.fillText('�˗��͖�����',610-3*cnt[5],205+10-cnt[6]);
				}else{
					ctx.drawImage(icons[quest_item],580-3*cnt[5],130+10-cnt[6],64,64);
					ctx.fillText('�� '+quest_sum+' ��',670-3*cnt[5],180+10-cnt[6]);
					ctx.fillText('�����Ă��ĉ�����',580-3*cnt[5],230+10-cnt[6]);
				}
				ctx.globalAlpha = 1.0;
			}else{
				if(key_achieve<2 && quest_num>18){
					ctx.fillText('�˗��͖�����',610-3*cnt[5],205);
				}else{
					ctx.drawImage(icons[quest_item],580-3*cnt[5],130,64,64);
					ctx.fillText('�� '+quest_sum+' ��',670-3*cnt[5],180);
					ctx.fillText('�����Ă��ĉ�����',580-3*cnt[5],230);
				}
			}
		}else if(quest_conv==1){
			if(cnt[6]<10){
				cnt[6]++;
				ctx.globalAlpha = 0.1*cnt[6];
				ctx.fillText('����Ȃ���I',610-3*cnt[5],180+10-cnt[6]);
				ctx.globalAlpha = 1.0;
			}else{
				ctx.fillText('����Ȃ���I',610-3*cnt[5],180);
			}

		}else if(quest_conv==2){
			if(cnt[6]<50){
				cnt[6]++;
				if(cnt[6]<10){
					ctx.globalAlpha = 0.1*cnt[6];
					ctx.fillText('���肪�Ƃ��I',610-3*cnt[5],180+10-cnt[6]);
					ctx.globalAlpha = 1.0;
				}else{
					ctx.fillText('���肪�Ƃ��I',610-3*cnt[5],180);
				}
			}else{
				if(cnt[6]<60)cnt[6]++;
				var num = (quest_num/2 -1)%21 +1;
				var num1 = Math.floor((num-1)/3);
				var num2 = (num-1)%3;
				key_item_know[num1][num2] = 0;
				if(cnt[6]<60){
					ctx.globalAlpha = 0.1*(cnt[6]-50);
					if(quest_num<44){
						ctx.fillText('key'+num+'��',610-3*cnt[5],180+60-cnt[6]);
						ctx.drawImage(icons[key_item_recipe[num1][num2]],720-3*cnt[5],130+60-cnt[6],64,64);
					}else{
						item_stack[20]++;
						ctx.fillText('�����',610-3*cnt[5],180+60-cnt[6]);
						ctx.drawImage(icons[20],720-3*cnt[5],130+60-cnt[6],64,64);
					}
					ctx.globalAlpha = 1.0;
				}else{
					if(quest_num<44){
						ctx.fillText('key'+num+'��',610-3*cnt[5],180);
						ctx.drawImage(icons[key_item_recipe[num1][num2]],720-3*cnt[5],130,64,64);
					}else{
						ctx.fillText('�����',610-3*cnt[5],180+60-cnt[6]);
						ctx.drawImage(icons[20],720-3*cnt[5],130+60-cnt[6],64,64);
					}
				}
			}
		}
	}
	}

	if(cnt[5]==100){
		if(on_mouse_quest == 0){
			ctx.drawImage(frames[8], 220, 435, 170, 80);
		}else{
			ctx.drawImage(frames[7], 220, 435, 170, 80);
		}
		if(on_mouse_quest == 1){
			ctx.drawImage(frames[8], 410, 435, 170, 80);
		}else{
			ctx.drawImage(frames[7], 410, 435, 170, 80);
		}
		ctx.font= 'bold 28px HG����E';
		ctx.fillStyle = '#edf';
		ctx.lineWidth = 6;
		if(on_mouse_quest==0){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
		ctx.strokeText('�n��',279, 484, 510);
		ctx.fillText('�n��',279, 484);
		if(on_mouse_quest==1){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
		ctx.strokeText('�߂�',466, 484, 510);
		ctx.fillText('�߂�',466, 484);
		if(ability_have[7]!=-1){
			if(key_item[ability_have[7]]!=-1){
				if(on_mouse_quest == 2){
					ctx.drawImage(frames[8], 305, 345, 190, 80);
				}else{
					ctx.drawImage(frames[7], 305, 345, 190, 80);
				}
				if(on_mouse_quest==2){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
				ctx.strokeText('���ŉ���',342, 394, 510);
				ctx.fillText('���ŉ���',342, 394);
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
		//audio_def.playbackRate = 0.96;
		//audio_def.loop = false;
		if(music_next!=12)audioChange(12);
		if(cnt[20]==0)status = "�^���̘B���p�m";
		if(ending_num==5 && exp_area==55)status = "�n���㋉�B���p�m";
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
	ctx.font= 'bold 28px HG����E';
	ctx.fillStyle = '#000';
	ctx.lineWidth = 6;
	ctx.strokeStyle = '#fff';
	var str = [];
	if(ending_num==0){
		//�g�o���S
		str.push('�f�`�l�d�@�n�u�d�q');
		str.push('�G�ޒ��̗̑͂��s�����B');
		str.push('');
		str.push('');
		str.push('');
		str.push('score '+score+' To be continued.');
	}else if(ending_num==1){
		//�K���x���S
		str.push('�f�`�l�d�@�n�u�d�q');
		str.push('�G�ޒ��̐S���܂ꂽ�B');
		str.push('');
		str.push('');
		str.push('');
		str.push('score '+score+' To be continued.');
	}else if(ending_num==2){
		//��
		str.push('�f�`�l�d�@�n�u�d�q');
		str.push('�l�̓����̂ăG�i�h����');
		str.push('�S�Ă�������G�ޒ���');
		str.push('����͂����');
		str.push('�K���������̂����m��Ȃ��B');
		str.push('score '+score+' To be continued.');
	}else if(ending_num==3){
		//���Ԑ؂�
		str.push('�f�`�l�d�@�n�u�d�q');
		str.push('���؂ɊԂɍ���Ȃ������B');
		str.push('');
		str.push('');
		str.push('');
		str.push('score '+score+' To be continued.');
	}else if(ending_num==4){
		//��o3
		str.push('�Ȃ�Ƃ����ʕ����d�オ�����B');
		str.push('�������A�����');
		str.push('�S�Ă��I������킯�ł͂Ȃ��B');
		str.push('����O�̖ʐڂ��A');
		str.push('�G�ޒ���҂��󂯂Ă��邾�낤�c�c�B');
		str.push('score '+score+' To be continued.');
	}else if(ending_num==5){
		//��o7
		str.push('�����Ȑ��ʕ����ł����B');
		str.push('�������ĊG�ޒ��ɂ��A����i���ɓn��');
		str.push('�P�������J�����񑩂��ꂽ�c�c�B');
		str.push('');
		str.push('�b�n�m�f�q�`�s�t�k�`�s�h�n�m�r�D');
		str.push('score '+score);
	}else{
		//�G���[
		str.push('�s���ȃG���[�ł�');
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
				end_pict[i] = i+20;
				end_y[i] = 600+i*160;
			}
			requestId = window.requestAnimationFrame(renderEnding3); 
		}else{
			if(ending_num!=4 && ending_num!=5)status = "����̘B���p�m";
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
			if(end_pict[i]<76){
				ctx.drawImage(images[end_pict[i]],80,end_y[i],260,150);
				end_y[i]--;
			}
		}
	}
	ctx.drawImage(images[1],380,-10,390,320);
	ctx.fillStyle = '#fff';
	var str = [];
	str.push(' ��搧��  �G�ޒ�');
	for(var i in str){
		ctx.fillText(str[i],350+Math.floor((450-28*str[i].length)/2),325+45*i);
	}

	//console.log(cnt[61]%1000);
	var c = cnt[61]%1000;
	if(250<c && c<1000 && Math.floor(cnt[61]/1000)<9){
		if(c<350)cnt[62]++;
		if(c>900)cnt[62]--;
		ctx.globalAlpha = 0.01*cnt[62];
		ctx.drawImage(ends[Math.floor(cnt[61]/1000)],410,350,330,230);
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
	charDefault = images[rnd+2];
}
function onClickSE(n){
	if(!music_mute && music_play==0){
		if(n==1 || n==2 || n==4 || n==10 || n==13 || n==17 || n==18 || n==20 || n==21 || n==22){audio_se.volume = 0.5;}else{audio_se.volume = 1.0;}
		audio_se.src = "se"+n+".mp3";
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
		audio_def.src = music_next+".mp3";
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
		charDefault = images[2];
	}
	if(70<x && x<180 && 90<y && y<150){
		onClickSE(3);
		charDefault = images[9];
		for(var i in key_item)key_item[i] = 0;
		key_achieve = 7;
	}
	if(90<x && x<180 && 300<y && y<370){
		onClickSE(22);
		charDefault = images[8];
		status = "�Z�N�n���B���p�m";
	}
	if(phase==0){
		if(50<x && x<200 && 555<y && y<600){
			onClickSE(22);
			charDefault = images[6];
			cnt[99]=12;
			status = "�Z�N�n���B���p�m";
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
			key_ability[3] = 5;//�يE�T��
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

		//���ʕ��R�~�b�g
		if(268<x && x<448 && 70<y && y<110 && key_achieve>2){
			phase = 77777;
			if(key_achieve==7){ending_num=5;}else{ending_num=4;}
			onClickSE(19);
			window.cancelAnimationFrame(requestId);
			renderEnding();
		}
		//key_pos�ړ�
		if(240<x && x<260 && 70<y && y<110){
			if(key_pos!=0)key_pos--;
		}
		if(457<x && x<477 && 70<y && y<110){
			if(key_pos!=4)key_pos++;
		}
		//�G�i�h���g�p
		if(240<x && x<475 && 210<y && y<420){
			if(have_taima>0){
				status = "�G�i�h���B���p�m";
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
				var rnd = Math.floor(Math.random()*9);
				charDefault = images[rnd+2];
				
				if(music_play==0){
				music_play++;
				audio_drag.pause();
				//audio_drag.loop = true;
				audio_drag.src = "d.mp3";
				audio_drag.currentTime = 72.5;
				audio_drag.play();
				}
			}
		}
		//�x�e
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
		//bt1,2,3�̎��s
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
				area = rnd1-20;
			}else{
				area = rnd2-20;
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
				if(cnt[20]==0)status = "�^���̘B���p�m";
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
			if(hp!=0 && (exp_str[0] == '��ꂽ����A�����A��B' || (0<x && x<800 && 0<y && y<60) || (0<x && x<800 && 520<y && y<600))){
				if((0<x && x<800 && 0<y && y<60) || (0<x && x<800 && 520<y && y<600)){
					run++;
					if(run>0)status = "�a���o�b�N���[";
					if(run>5)status = "�`���o�b�N���[";
					if(run>9)status = "�r���o�b�N���[";
					if(run>20)status = "�o�b�N���B���p�m";
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
	on_mouse_help =�@'';

	if(phase == 0){
		on_mouse_title = -1;
		if(400<x && x<680 && 400<y && y<490)on_mouse_title = 1;
	}
	if(phase == 2){
		if(270<x && x<450 && 70<y && y<110){
			if(key_item[0]!=-1 && key_item[1]!=-1 && key_item[2]!=-1){
				on_mouse_help = '���ʕ����o���Ėʐڂ����z���悤�B';
			}else{
				on_mouse_help = '�}�g���Ȑ��ʕ��𐶂ݏo���āA�ʐڂ����z���悤�B';
			}
		}
		if(80<x && x<280 && 40<y && y<50)on_mouse_help = '�K���x���[�^�[�F�G�ޒ��̐��_��Ԃ�\���Ă���B�K���x���s����ƃQ�[���I�[�o�[�B';
		if(25<x && x<135 && 540<y && y<590)on_mouse_help = '�c�莞�ԁF�ʐڂ܂ł̎c�莞�ԁB���ʕ����d�グ�Ȃ��ƋF���ăQ�[���I�[�o�[�B';

		if(pict==0){
			if(240<x && x<475 && 210<y && y<420){
				if(drag==0){
					drag = 1;
					charDefault = images[4];
				}
				on_mouse_help = '�G�i�W�[�h�����N�F���ނƃS�L�Q���ɂȂ�B�y�����F'+cnt_taima+'�z';
			}else{
				if(drag==1){
					drag = 0;
					charDefault = images[2];
				}
			}
		}

		on_mouse_main = -1;
		for(var i = 0; i < 3; i++){
			if(487<x && x<775 && 80+100*i<y && y<180+100*i){
				on_mouse_main = i;
				switch(i){
					case 0 : on_mouse_help = '�f�ނ����߂č̏W�֏o�|����B'; break;
					case 1 : on_mouse_help = '�����A�C�e�����g���ĘB�����n�߂�B'; break;
					case 2 : on_mouse_help = '�X�̐l����˗����󂯂�B'; break;
				}
			}
			if(236+85*i<x && x<310+85*i && 120<y && y<195){
				if(key_item[i+key_pos]!=0){
					on_mouse_help = '�������V�s'+(i+1+key_pos);
				}else{
					on_mouse_help = ability[key_ability[i+key_pos]];
				}
			}
		}
		if(570<x && x<690 && 390<y && y<440){
			on_mouse_main = 3;
			on_mouse_help = heal_price+'GOLD���x�����āAHP�ƍK���x���񕜂���B';
			if(ability_have[10]!=-1){
				if(key_item[ability_have[10]]!=-1){
					on_mouse_help = '������HP�ƍK���x���񕜂���B';
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
		if(245<x && x<500 && 155<y && y<410)on_mouse_help = '�N���b�N�őI���B�_�u���N���b�N�ŘB���f�ނɎw��B';
		on_mouse_alc_menu = -1;
		if(535<x && x<755 && 145<y && y<228){
			on_mouse_alc_menu = 0;
			if(alc_item[3]==-1){
				on_mouse_help = '�w�肵���A�C�e���ŘB�����s���B';
			}else if(0<alc_item[3] && alc_item[3]<14){
				on_click_alc = -1;
				var str = ability[alc_item[3]];
				on_mouse_help = str.substring(0, str.indexOf("�F"))+'��B�������I';
			}else{
				on_click_alc = -1;
				on_mouse_help = '�G�i�W�[�h�����N��B�������I';
			}
		}else{
			alc_item[3] = -1;
		}
		if(260<x && x<480 && 435<y && y<515){
			on_mouse_alc_menu = 1;
			on_mouse_help = '�I�������A�C�e�����g�p����B';
		}
		if(500<x && x<720 && 435<y && y<515){
			on_mouse_alc_menu = 2;
			on_mouse_help = '�I�������A�C�e���𔄋p���Ă����𓾂�B';
		}
		if((0<x && x<800 && 0<y && y<60) || (0<x && x<800 && 520<y && y<600)){
			on_mouse_help = '���j���[��ʂɖ߂�B';
		}

	}
	if(phase == 5){
		if(cnt[5]==100){
			on_mouse_quest = -1;
			if(220<x && x<390 && 435<y && y<515){
				on_mouse_quest = 0;
				on_mouse_help = '�A�C�e����n���Ĉ˗�����������B';
			}
			if(410<x && x<580 && 435<y && y<515){
				on_mouse_quest = 1;
				on_mouse_help = '���j���[��ʂɖ߂�B';
			}
			if(305<x && x<495 && 345<y && y<425){
				on_mouse_quest = 2;
				if(ability_have[7]!=-1){
					if(key_item[ability_have[7]]!=-1){
						on_mouse_help = quest_item*100*quest_sum+'GOLD�x�����Ĉ˗�����������B';
					}
				}
			}
			if((0<x && x<800 && 0<y && y<60) || (0<x && x<800 && 520<y && y<600)){
				on_mouse_help = '���j���[��ʂɖ߂�B';
			}
		}
	}
	if(phase==6){
		if(cnt[5]>0 && (0<x && x<800 && 0<y && y<60) || (0<x && x<800 && 520<y && y<600)){
			on_mouse_help = '�̏W�𒆒f���āA���j���[��ʂɖ߂�B';
		}
		if(click_wait || exp_str[0] == '��ꂽ����A�����A��B'){
			on_mouse_help = '��ʂ��N���b�N�B';
		}
	}
}

})();