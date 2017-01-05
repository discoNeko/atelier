function renderQuest2(){
	ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, 800, 600, 0, 0, w, h);//back
	if(on_drag && happy>720)ctx.drawImage(fields, (back%10)*800, Math.floor(back/10)*600, -(cnt[22]+cnt[21])/4, -(cnt[22]+cnt[21])/4, w + (cnt[22]+cnt[21])/2, h + (cnt[22]+cnt[21])/2);
	ctx.drawImage(chars, charDefault*225, 0, 225, 600, 0, 0, 225, 600);//chara
	ctx.drawImage(deco1, 0, 0,w/2,h/2);
	ctx.drawImage(deco2, w/2, h/2,w/2,h/2);
	ctx.drawImage(chars, 2025, 0, 265, 600,800-3*cnt[5],100,265,600);
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0,w,60);
	ctx.fillRect(0,530,w,h);
	appGage();
	appStatus();
	
	if(cnt[5]==100){
		if(cnt[7]<10){
			cnt[7]++;
			ctx.globalAlpha = 0.1*cnt[7];
			ctx.drawImage(pop,550-3*cnt[5],100+10-cnt[7],300,220);
			ctx.globalAlpha = 1.0;
		}else{
			if(cnt[7]<20)cnt[7]++;
			ctx.drawImage(pop,550-3*cnt[5],100,300,220);
		}
	if(cnt[7]==20){
		ctx.font= 'bold 30px HG明朝E';
		ctx.fillStyle = '#000';
		if(quest_conversation==0){
			if(cnt[6]<10){
				cnt[6]++;
				ctx.globalAlpha = 0.1*cnt[6];
				if(key_achieve<2 && quest_num>18){
					ctx.fillText('依頼は無いよ',610-3*cnt[5],205+10-cnt[6]);
				}else{
					ctx.drawImage(icons, (quest_item%6)*64, Math.floor(quest_item/6)*64, 64, 64,580-3*cnt[5],130+10-cnt[6],64,64);
					ctx.fillText('を '+quest_sum+' 個',670-3*cnt[5],180+10-cnt[6]);
					ctx.fillText('持ってきて下さい',580-3*cnt[5],230+10-cnt[6]);
				}
				ctx.globalAlpha = 1.0;
			}else{
				if(key_achieve<2 && quest_num>18){
					ctx.fillText('依頼は無いよ',610-3*cnt[5],205);
				}else{
					ctx.drawImage(icons, (quest_item%6)*64, Math.floor(quest_item/6)*64, 64, 64,580-3*cnt[5],130,64,64);
					ctx.fillText('を '+quest_sum+' 個',670-3*cnt[5],180);
					ctx.fillText('持ってきて下さい',580-3*cnt[5],230);
				}
			}
		}else if(quest_conversation==1){
			if(cnt[6]<10){
				cnt[6]++;
				ctx.globalAlpha = 0.1*cnt[6];
				ctx.fillText('足りないよ！',610-3*cnt[5],180+10-cnt[6]);
				ctx.globalAlpha = 1.0;
			}else{
				ctx.fillText('足りないよ！',610-3*cnt[5],180);
			}

		}else if(quest_conversation==2){
			if(cnt[6]<50){
				cnt[6]++;
				if(cnt[6]<10){
					ctx.globalAlpha = 0.1*cnt[6];
					ctx.fillText('ありがとう！',610-3*cnt[5],180+10-cnt[6]);
					ctx.globalAlpha = 1.0;
				}else{
					ctx.fillText('ありがとう！',610-3*cnt[5],180);
				}
			}else{
				var num = (quest_num/2 -1)%21 +1;
				var num1 = Math.floor((num-1)/3);
				var num2 = (num-1)%3;
				if(cnt[6]==50){
					unknown = true;
					if(key_item_know[num1][num2]==0){
						unknown = false;
						if(quest_num>18){
							item_stack[20]+=9;
						}else{
							item_stack[20]+=num1*3+num2+1;
						}
					}else{
						key_item_know[num1][num2] = 0;
					}
				}
				if(cnt[6]<60)cnt[6]++;
				if(cnt[6]<60){
					ctx.globalAlpha = 0.1*(cnt[6]-50);
					if(quest_num<44 && unknown){
						ctx.fillText('key'+num+'は',610-3*cnt[5],180+60-cnt[6]);
						var inum = key_item_recipe[num1][num2];
						ctx.drawImage(icons, (inum%6)*64, Math.floor(inum/6)*64, 64, 64,720-3*cnt[5],130+60-cnt[6],64,64);
					}else{
						ctx.fillText('お礼は',610-3*cnt[5],180+60-cnt[6]);
						ctx.drawImage(icons, 128, 192, 64, 64,720-3*cnt[5],130+60-cnt[6],64,64);//box
					}
					ctx.globalAlpha = 1.0;
				}else{
					if(quest_num<44 && unknown){
						ctx.fillText('key'+num+'は',610-3*cnt[5],180);
						var inum = key_item_recipe[num1][num2];
						ctx.drawImage(icons, (inum%6)*64, Math.floor(inum/6)*64, 64, 64,720-3*cnt[5],130,64,64);
					}else{
						ctx.fillText('お礼は',610-3*cnt[5],180+60-cnt[6]);
						ctx.drawImage(icons, 128, 192, 64, 64,720-3*cnt[5],130+60-cnt[6],64,64);//box
					}
				}
			}
		}
	}
	}

	if(cnt[5]==100){
		if(on_mouse_quest == 0){
			ctx.drawImage(frames, 400, 136, 300, 136, 220, 435, 170, 80);
		}else{
			ctx.drawImage(frames, 400, 0, 300, 136, 220, 435, 170, 80);
		}
		if(on_mouse_quest == 1){
			ctx.drawImage(frames, 400, 136, 300, 136, 410, 435, 170, 80);
		}else{
			ctx.drawImage(frames, 400, 0, 300, 136, 410, 435, 170, 80);
		}
		ctx.font= 'bold 28px HG明朝E';
		ctx.fillStyle = '#edf';
		ctx.lineWidth = 6;
		if(on_mouse_quest==0){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
		ctx.strokeText('渡す',279, 484, 510);
		ctx.fillText('渡す',279, 484);
		if(on_mouse_quest==1){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
		ctx.strokeText('戻る',466, 484, 510);
		ctx.fillText('戻る',466, 484);
		if(ability_have[7]!=-1){
			if(key_item[ability_have[7]]!=-1){
				if(on_mouse_quest == 2){
					ctx.drawImage(frames,400, 136, 300, 136, 305, 345, 190, 80);
				}else{
					ctx.drawImage(frames,400, 0, 300, 136, 305, 345, 190, 80);
				}
				if(on_mouse_quest==2){ctx.strokeStyle = '#666';}else{ctx.strokeStyle = '#333';}
				ctx.strokeText('金で解決',342, 394, 510);
				ctx.fillText('金で解決',342, 394);
			}
		}
	}
	if(cnt[5]<80)cnt[5]++;
	if(cnt[5]<90)cnt[5]++;
	if(cnt[5]<100)cnt[5]++;
	requestId = window.requestAnimationFrame(renderQuest2); 
	appEffect();
}