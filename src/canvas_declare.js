/* Canvas */

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
var quest_conversation = 0;
var gather_chance = 0;
var cnt_drink = 0;
var have_drink = 0;
var use_drink = 0;
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
	// MEMO: BGM対応ファイル名
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