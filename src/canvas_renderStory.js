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