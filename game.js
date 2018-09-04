window.onload= function(){
		var game = document.getElementById('game'),
		res = document.getElementById('game-1'),
		box = document.getElementsByClassName('block'),
		btn = document.getElementById('btn'); // Здесь я объявил доступ к DOM элементам
		var step = 0, playerStep = 'X', x=[], o=[]; //переменные 
		var winArr = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9],
			[1, 5, 9],
			[3, 5, 7]
		];  //это победные комбинации который будут работать через атрибут step

		for (var i=1; i<10; i++) {
			game.innerHTML+='<div class="block" step="'+i+'"></div>';
		} 
		

		for(var i=0; i<box.length; i++){
			box[i].addEventListener('click', gameplay);
		}
		

		function gameplay(){
			var getBlock = +this.getAttribute('step');
			if(!this.textContent){
				this.innerText = playerStep;
				if(playerStep === "X"){
					x.push(+getBlock);
				} else {
					o.push(+getBlock);
				}
				if(win(o, getBlock) || win(x, getBlock)){
					for(var i = 0; i < box.length; i++){
						box[i].removeEventListener('click', gameplay);
					} 
					return res.innerText = ": Победа " + playerStep;
				}
				steps();
				step++;
				restart();
				if(step == 9){
					res.innerText = ": Ничья";
				} else {res.innerText=": Ожидаем..."}
				
			}
		}

	function restart(){
		btn.addEventListener('click', function(){
			for(var i = 0; i < box.length; i++){
				box[i].innerText = "";
			}
				o = [];
				x = [];
				step = 0;
				playerStep = "X";
				
				for (var j = 0; j < box.length; j++) {
	    			box[j].addEventListener("click", gameplay);
	    			res.innerText = "";
				}
		});
	}

	function steps(){
		if(playerStep === 'X'){
			playerStep = 'O';
		} else {
			playerStep = 'X';
		}
	}

	function win(arr, blocknum){
		target_2: for(var main = 0; main < winArr.length; main++){
		 var winner = winArr[main], num=0;
		 if(winner.indexOf(blocknum) !== -1)
			target_1: for(var second = 0; second < winner.length; second++){
				if(arr.indexOf(winner[second]) !== -1) {
					num++;
					if(num===3){ 
						return true;
					}					
					continue target_1;
				} else {
					continue target_2;
				}
			}
		num = 0;
		}
	}	
}