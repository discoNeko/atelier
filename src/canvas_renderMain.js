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
	t = 'エナドリの所持数：'+have_drink;
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