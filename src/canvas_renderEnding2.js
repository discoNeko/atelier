function renderEnding2(){
	ctx.globalAlpha = 1.0;
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,w,h);

	if(cnt[9]<10)ctx.globalAlpha = 0.1*cnt[9];
	if(0<cnt[10] && cnt[10]<100)ctx.globalAlpha = 1-0.01*cnt[10];
	ctx.font= 'bold 28px HG明朝E';
	ctx.fillStyle = '#000';
	ctx.lineWidth = 6;
	ctx.strokeStyle = '#fff';
	var str = [];
	if(ending_num==0){
		//ＨＰ死亡
		str.push('ＧＡＭＥ　ＯＶＥＲ');
		str.push('絵奈鳥の体力が尽きた。');
		str.push('');
		str.push('');
		str.push('');
		str.push('score '+score+' To be continued.');
	}else if(ending_num==1){
		//幸福度死亡
		str.push('ＧＡＭＥ　ＯＶＥＲ');
		str.push('絵奈鳥の心が折れた。');
		str.push('');
		str.push('');
		str.push('');
		str.push('score '+score+' To be continued.');
	}else if(ending_num==2){
		//薬中
		str.push('ＧＡＭＥ　ＯＶＥＲ');
		str.push('人の道を捨て');
		str.push('エナドリに全てを捧げた絵奈鳥は');
		str.push('それはそれで');
		str.push('幸せだったのかも知れない。');
		str.push('score '+score+' To be continued.');
	}else if(ending_num==3){
		//時間切れ
		str.push('ＧＡＭＥ　ＯＶＥＲ');
		str.push('締切に間に合わなかった。');
		str.push('');
		str.push('');
		str.push('');
		str.push('score '+score+' To be continued.');
	}else if(ending_num==4){
		//提出3
		str.push('なんとか成果物が仕上がった。');
		str.push('しかし、これで');
		str.push('全てが終わったわけではない。');
		str.push('第二第三の面接が、');
		str.push('絵奈鳥を待ち受けているだろう……。');
		str.push('score '+score+' To be continued.');
	}else if(ending_num==5){
		//提出7
		str.push('完璧な成果物ができた。');
		str.push('こうして絵奈鳥にも、今後永きに渡る');
		str.push('輝かしい労働が約束された……。');
		str.push('');
		str.push('ＣＯＮＧＲＡＴＵＬＡＴＩＯＮＳ．');
		str.push('score '+score);
	}else{
		//エラー
		str.push('不明なエラーです');
	}
	for(var i in str){
		if(i==5){
			ctx.strokeText(str[i],(800-14*str[i].length)/2, 130+i*80, 510);
			ctx.fillText(str[i],(800-14*str[i].length)/2, 130+i*80);
		}else{
			ctx.strokeText(str[i],(800-28*str[i].length)/2, 130+i*80, 510);
			ctx.fillText(str[i],(800-28*str[i].length)/2, 130+i*80);
		}
	}
	audio_drag.volume = 0.007*cnt[20];
	if(!click_wait && cnt[9]<100)cnt[9]++;
	if(cnt[9]==99)click_wait=true;
	if(cnt[9]==100)cnt[10]++;	
	if(cnt[10]<100){
		if(cnt[10]>0){cnt[20]-=1;if(cnt[20]<0)cnt[20]=0;}
		requestId = window.requestAnimationFrame(renderEnding2); 
	}else{
		audio_drag.pause();
		window.cancelAnimationFrame(requestId);
		if(ending_num==5){
			for(var i = 0; i<5; i++){	
				end_pict[i] = i;
				end_y[i] = 600+i*160;
			}
			if(status.match(/イカサマ/))status = "周回の錬金術士";
			requestId = window.requestAnimationFrame(renderEnding3); 
		}else{
			if(ending_num!=4 && ending_num!=5)status = "周回の錬金術士";
			init();
			requestId = window.requestAnimationFrame(renderTitle); 
		}
	}
}