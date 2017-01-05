function itemCheck(){
	for(var i in item){
		if(item_stack[i]>0)item_stack_once[i] = 1;
	}
}