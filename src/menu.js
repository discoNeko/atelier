/* Menu */

	$('.btn').click(function(){
		OpenTips($(this).attr('id'));
	});

	function OpenTips(target){
		for(var i = 1; i < 6; i++){
			$('#tips'+i).css('display', 'none');
		}
		$('#tips'+target.substr(4)).css('display', 'block');
	};