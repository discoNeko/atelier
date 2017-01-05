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