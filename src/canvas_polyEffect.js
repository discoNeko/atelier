function polyEffect(){
	var c = false;
	for(var i in poly_eff){
		if(poly_eff[i]>0)c = true;
	}
	if(c){
		ctx.globalCompositeOperation = "lighter";
		for(var i in poly_eff){
			if(poly_eff[i]>0){
				if(poly_eff[i]==80){
					poly_vx[i] = Math.random()*12-6;
					poly_vy[i] = Math.random()*(-8)-8;
					poly_x[i] = 645+Math.random()*50-25;
					poly_y[i] = 410+Math.random()*50-25;
					poly_radius[i] = Math.random()*18+1;
					poly_r[i] = Math.floor(Math.random() * 40)+40;
					poly_g[i] = Math.floor(Math.random() * 60)+20;
					poly_b[i] = Math.floor(Math.random() * 80);
				}else{
					poly_vy[i] +=0.01*poly_eff[i];
					poly_x[i] += poly_vx[i];
					poly_y[i] += poly_vy[i];
					if(poly_vx[i]+poly_vy[i]>4)poly_radius[i] *= 1.01;

					ctx.beginPath();
					ctx.fillStyle = 'rgb(' + poly_r[i] + ',' + poly_g[i] + ',' + poly_b[i] + ')';
				ctx.arc(poly_x[i], poly_y[i], poly_radius[i], 0, Math.PI*2.0, true);
				ctx.fill();
				}
				poly_eff[i]--;
			}
		}
		ctx.globalCompositeOperation = "source-over";
	}else{
		poly_eff.length = 0;
	}
}