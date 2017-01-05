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