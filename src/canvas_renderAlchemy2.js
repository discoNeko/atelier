function renderAlchemy2(){
	appFrame();
	appGage();
	appStatus();

	if(cnt[6]<10)cnt[6]++;
	if(cnt[6]<5)ctx.globalAlpha = 0.2*cnt[6];
	var m = 10-cnt[6];

	ctx.drawImage(frames, 400, 272, 200, 200,236,147+m,275,276);

	ctx.drawImage(frames, 400, 272, 200, 200,236,66+m,74,75);
	ctx.drawImage(frames, 400, 272, 200, 200,236+100,66+m,74,75);
	ctx.drawImage(frames, 400, 272, 200, 200,236+200,66+m,74,75);

	ctx.drawImage(frames, 400, 272, 200, 200,554,249+m,183,169);

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
		ctx.drawImage(frames, 400, 136, 300, 136, 535, 150+m, 220, 80);
	}else{
		ctx.drawImage(frames, 400, 0, 300, 136, 535, 150+m, 220, 80);
	}
	if(on_mouse_alc_menu == 1){
		ctx.drawImage(frames, 400, 136, 300, 136, 260, 435+m, 220, 80);
	}else{
		ctx.drawImage(frames, 400, 0, 300, 136, 260, 435+m, 220, 80);
	}
	if(on_mouse_alc_menu == 2){
		ctx.drawImage(frames, 400, 136, 300, 136, 500, 435+m, 220, 80);
	}else{
		ctx.drawImage(frames, 400, 0, 300, 136, 500, 435+m, 220, 80);
	}

	ctx.font= 'bold 28px HG明朝E';
	ctx.fillStyle = '#edf';
	ctx.lineWidth = 6;
	if(on_mouse_alc_menu==0){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
	ctx.strokeText('錬　金',601,200+m,510);
	ctx.fillText('錬　金',601,200+m);
	if(on_mouse_alc_menu==1){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
	ctx.strokeText('使　用',325,485+m,510);
	ctx.fillText('使　用',325,485+m);
	if(on_mouse_alc_menu==2){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
	ctx.strokeText('売　却',565,485+m,510);
	ctx.fillText('売　却',565,485+m);
	
	for(var i = 0; i<3; i++){
		var num = alc_item[i];
		if(num!=-1){
			ctx.drawImage(icons, (num%6)*64, Math.floor(num/6)*64, 64, 64, 244+i*100,74+m,57,57);
			ctx.font= 'bold 25px HG明朝E';
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
			ctx.drawImage(icons, (tar%6)*64, Math.floor(tar/6)*64, 64, 64, 565,260+m,64,64);
	
			ctx.font= 'bold 15px HG明朝E';
			ctx.strokeText('売値:'+tar*3+'G',648,325+m,510);
			ctx.fillText('売値:'+tar*3+'G',648,325+m);

			ctx.strokeText(item_help[tar][0],572,355+m,510);
			ctx.fillText(item_help[tar][0],572,355+m);
			ctx.strokeText(item_help[tar][1],565,380+m,510);
			ctx.fillText(item_help[tar][1],565,380+m);
			ctx.strokeText(item_help[tar][2],565,400+m,510);
			ctx.fillText(item_help[tar][2],565,400+m);

		}else{
			name = '未確認';
			ctx.drawImage(icons, 192, 384, 64, 64, 565,260+m,64,64);
		}
		ctx.font= 'bold 22px HG明朝E';
		ctx.strokeText(name,630+(100-22*name.length)/2,300+m,510);
		ctx.fillText(name,630+(100-22*name.length)/2,300+m);

	}


	if(-1<alc_item[3] && alc_item[3]<14){
		if(cnt[30]>0)ctx.globalAlpha = 1-0.1*cnt[30];
		var inum = 25+alc_item[3];
		ctx.drawImage(icons, (inum%6)*64, Math.floor(inum/6)*64, 64, 64, 595,265+m+cnt[30],100,100);
		ctx.font= 'bold 22px HG明朝E';
		ctx.strokeStyle = '#333';
		ctx.fillStyle = '#fff';
		ctx.lineWidth = 4;
		ctx.strokeText('成果物を錬成！',570,400+m,510);
		ctx.fillText('成果物を錬成！',570,400+m);
		ctx.globalAlpha = 1.0;
	}else if(alc_item[3] == 99){
		if(cnt[30]>0)ctx.globalAlpha = 1-0.1*cnt[30];
		ctx.drawImage(icons, 128, 448, 128, 128, 597,267+m+cnt[30],100,100);
		ctx.drawImage(icons,   0, 448, 128, 128, 595,265+m+cnt[30],100,100);
		ctx.font= 'bold 22px HG明朝E';
		ctx.strokeStyle = '#333';
		ctx.fillStyle = '#fff';
		ctx.lineWidth = 4;
		ctx.strokeText('エナドリ錬成！',570,400+m+cnt[30]/2,510);
		ctx.fillText('エナドリ錬成！',570,400+m+cnt[30]/2);
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
				ctx.drawImage(frames, 400, 472, 200, 200, 244+j*52-on, 154+i*52-on+m, 48, 48);
				var inum = i*5+j;
				ctx.drawImage(icons, (inum%6)*64, Math.floor(inum/6)*64, 64, 64, 244+j*52-on, 154+i*52-on+m, 48, 48);
			}else{
				ctx.drawImage(frames, 400, 472, 200, 200, 244+j*52-on, 154+i*52-on+m, 48, 48);
				ctx.drawImage(icons, 192, 384, 64, 64, 244+j*52-on, 154+i*52-on+m, 48, 48);
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
				ctx.font= 'bold 20px HG明朝E';
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