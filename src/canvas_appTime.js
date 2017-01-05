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