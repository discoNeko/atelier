function itemUse(){
	if(on_click_alc!=-1){
		if(item_stack[on_click_alc]>0){
			onClickSE(7);
			item_stack[on_click_alc]--;
			switch(on_click_alc){
			case  0 : 
				hp+=1;
				break;
			case  1 : 
				if(happy<200)happy+=1;
				break;
			case  2 : 
				var p = Math.floor(Math.random()*10);
				if(p>6){hp-=30;if(hp<0)hp=0;}
				if(p==0)hp+=30;
				break;
			case  3 : 
				var p = Math.floor(Math.random()*10);
				if(p>6){happy-=30;if(happy<0)happy=0;}
				if(p==0 && happy<200){happy+=30;if(happy>200)happy=200;}
				break;
			case  4 : 
				hp+=30;
				break;
			case  5 : 
				if(happy<200){happy+=30;if(happy>200)happy=200;}
				break;
			case  6 : 
				item_eff[6] = 1;
				break;
			case  7 : break;
			case  8 : break;
			case  9 : break;
			case 10 : break;
			case 11 : 
				item_eff[11] = 1;
				break;
			case 12 : break;
			case 13 : break;
			case 14 : break;
			case 15 : 
				item_eff[15] = 1;
				break;
			case 16 : 
				item_eff[16] = 1;
				break;
			case 17 : 
				item_eff[17] = 1;
				break;
			case 18 : 
				hp-=50;
				if(hp<0)hp=0;
				break;
			case 19 : 
				cnt[96]++;
				if(cnt[96]>99)cnt[96]=99;
				break;
			case 20 : 
				var n = Math.floor(Math.random()*25);
				var s = Math.floor(Math.random()*10);
				if(s<4){s=2;}else if(s<7){s=3;}else if(s<9){s=4;}else{s=5;}
				item_stack[n]+=s;
				itemCheck();
				break;
			case 21 : 
				var g = Math.floor(Math.random()*500+500);
				gold+=g;
				break;
			case 22 : 
				item_eff[22] = 1;
				break;
			case 23 : 
				var c = Math.floor(Math.random()*3);
				if(c==0){
					phase = 77777;
					ending_num = 0;
					window.cancelAnimationFrame(requestId);
					renderEnding();
				}else if(c==1){
					hp=100;
					happy=200;
					gold=100;
					cnt[96]=72;
					cnt[97]=0;
					cnt[98]=0;
					heal_price = 100;
				}else{
					alc_item[0]=-1;
					alc_item[1]=-1;
					alc_item[2]=-1;
					for (var i in item){
						item_stack[i] = 0;
						item_stack_once[i] = 0;
					}
				}
				break;
			case 24 : break;
			}
			limitCheck();
			if(hp==0 || happy==0){
			
			}
		}else{
			onClickSE(4);
		}
	}else{
		onClickSE(4);
	}
}