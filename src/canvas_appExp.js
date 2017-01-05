function appExp(pts){
	if(cnt[90]==0)earn_exp = pts;
	if(cnt[90]<100)cnt[90]+=4;
	if(cnt[90]==100 && cnt[91]<100)cnt[91]+=4;
	
	if(cnt[91]==100){
		cnt[90] = 0;
		cnt[91] = 0; 
	}else{
		requestId = window.requestAnimationFrame(appExp);
	}
}