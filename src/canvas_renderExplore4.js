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
				exploreEvent();
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