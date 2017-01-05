function sell(){
	if(on_click_alc!=-1){
		if(item_stack[on_click_alc]>0){
			onClickSE(8);
			item_stack[on_click_alc]--;
			gold += on_click_alc*3;
			if(gold>99999)gold = 99999;
		}else{
			onClickSE(4);
		}
	}else{
		onClickSE(4);
	}
}