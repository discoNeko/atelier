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
	quest_conversation = 0;
	gather_chance = 0;
	cnt_drink = 0;
	have_drink = 0;
	use_drink = 0;
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