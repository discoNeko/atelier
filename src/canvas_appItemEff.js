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