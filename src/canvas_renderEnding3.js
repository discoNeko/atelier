function renderEnding3(){
	ctx.globalAlpha = 1.0;
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,w,h);
	
	if(cnt[61]>9500){
		var g = 1 - 0.01*(cnt[61]-9500);
		if(g<0)g=0;
		ctx.globalAlpha = g;
	}
	if(cnt[60]<500)ctx.globalAlpha = 0.002*cnt[60];
	for(var i = 0; i<5; i++){
		if(end_y[i]==-160){
			end_pict[i]+=5;
			end_y[i]=-160+160*5;
		}else{
			if(end_pict[i]<56){
				ctx.drawImage(fields, (end_pict[i]%10)*800, Math.floor(end_pict[i]/10)*600, 800, 600,80,end_y[i],260,150);
				end_y[i]--;
			}
		}
	}
	ctx.drawImage(logo,380,-10,390,320);
	ctx.fillStyle = '#fff';
	var str = [];
	str.push(' 企画制作  discoNeko');
	for(var i in str){
		ctx.fillText(str[i],350+Math.floor((450-14*str[i].length-60)/2),325+45*i);
	}

	//console.log(cnt[61]%1000);
	var c = cnt[61]%1000;
	if(250<c && c<1000 && Math.floor(cnt[61]/1000)<9){
		if(c<350)cnt[62]++;
		if(c>900)cnt[62]--;
		ctx.globalAlpha = 0.01*cnt[62];

		ctx.drawImage(ends,((Math.floor(cnt[61]/1000))%5)*400,0,400,300,410,350,330,230);
	}
	
	if(cnt[61]>9600 && cnt[61]<9701){
		ctx.globalAlpha = 0.01*(cnt[61]-9600);
		ctx.fillText('FIN',(800-14*3)/2,300);
	}
	
	if(cnt[60]<500)cnt[60]++;
	if(cnt[61]<9700){cnt[61]++;click_wait=true;}
	if(cnt[61]==9700 && !click_wait)cnt[61]++;
	if(cnt[61]<9701){
		requestId = window.requestAnimationFrame(renderEnding3); 
	}else{
		window.cancelAnimationFrame(requestId);
		init();
		requestId = window.requestAnimationFrame(renderTitle); 
	}
}