function appFrame(){
	if(on_drag && happy>720){
		ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
	}else{
		ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, 0, 0, w, h);//back
	}
	ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0, 0, 225, 600);//chara
	ctx.drawImage(deco1, 0, 0,w/2,h/2);
	ctx.drawImage(deco2, w/2, h/2,w/2,h/2);

	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,w,60);
	ctx.fillRect(0,530,w,h);
}