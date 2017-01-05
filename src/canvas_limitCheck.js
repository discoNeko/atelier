function limitCheck(){
	if(hp<0)hp=0;
	if(hp>9999)hp=9999;
	if(gold>99999)gold=99999;
	for(var i = 0; i<25; i++){
		if(item_stack[i]>99)item_stack[i]=99;
	}
	if(happy<0)happy=0;
}