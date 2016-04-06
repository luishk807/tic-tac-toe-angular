/**
 * Tic Tac Toe
 * Tic Tac Toe Game in Angular
 * https://github.com/luishk807
 * 
 * 
 * Released on: April 5, 2016
 */

angular.module("tictacApp",[])
.controller("tictacCtrl",['$scope','$timeout',function($scope,$timeout){
	$scope.resetGameAll=function(){
		$scope.cPlayers=[
			{
				name:"Player 1",
				spot:"x",
				score:0
			},{
				name:"Computer",
				spot:"o",
				score:0
			}
		];
		$scope.resetGame();
	}
	$scope.resetGame=function(){
		$scope.tictac = {
			"0":[null,null,null],
			"1":[null,null,null],
			"2":[null,null,null]
		}
		$scope.humanTurn=true;
		$scope.cMark="x";
		$scope.Winner=null;
		$scope.isOver=false;
		$scope.cPlayer=$scope.cPlayers[0];
	}
	$scope.resetGameAll();
	$scope.foundEmpty=function(){
		var found=false;
		angular.forEach($scope.tictac,function(row){
			angular.forEach(row,function(col){
				if(!col)
				{
					found=true;
				}
			})
		})
		if(!found){
			$scope.isOver=true;
		}
		return found;
	}
	$scope.checkGame=function(){
		var tictac=$scope.tictac;
		var mark=$scope.cMark;
		var found=false;
		var winner=null;
		if((tictac[0][0]==mark && tictac[0][1]==mark && tictac[0][2]==mark) || (tictac[1][0]==mark && tictac[1][1]==mark && tictac[1][2]==mark) || (tictac[2][0]==mark && tictac[2][1]==mark && tictac[2][2]==mark)){
			found=true;
		}
		else if((tictac[0][0]==mark && tictac[1][0]==mark && tictac[2][0]==mark)|| (tictac[0][1]==mark && tictac[1][1]==mark && tictac[2][1]==mark) || (tictac[0][2]==mark && tictac[1][2]==mark && tictac[2][2]==mark)){
			found=true;
		}
		else if((tictac[0][0]==mark && tictac[1][1]==mark && tictac[2][2]==mark) || (tictac[0][2]==mark && tictac[1][1]==mark && tictac[2][0]==mark)){
			found=true;
		}
		if(found){
			$scope.isOver=true;
			$scope.Winner = $scope.cPlayers.filter(function(player){
				return player.spot==$scope.cMark;
			})[0]
			var total=$scope.Winner.score;
			total++;
			$scope.Winner.score=total;
			return true;
		}
		return false;
	}
	$scope.switchPlayer=function(){
		$scope.cPlayer=$scope.cPlayers.filter(function(player){
			return player.spot != $scope.cMark;
		})[0]
		$scope.humanTurn=($scope.cPlayer.name=="Computer")?false:true;
		$scope.cMark=($scope.cMark=="x")?"o":"x";
	}
	$scope.setSpot=function(row,col){
		var num=Math.floor(Math.random()*8)
		var found =false;
		var stillOn=$scope.foundEmpty();
		$scope.checkGame();
		if(!$scope.isOver){
			if(!$scope.tictac[row][col] && stillOn)
			{
				$scope.tictac[row][col]=$scope.cMark;
				$scope.checkGame();
				$scope.switchPlayer();
				stillOn=$scope.foundEmpty();
				if(!$scope.isOver){
					found=false;
					$timeout(function(){
						while(!found){
							var prow=Math.floor(Math.random()*3);
							var pcol=Math.floor(Math.random()*3);
							if(!$scope.tictac[prow][pcol] && stillOn)
							{
								$scope.tictac[prow][pcol]=$scope.cMark;
								$scope.checkGame();
								$scope.switchPlayer();
								found=true;
							}
						}
					},1000)
				}
				else
				{
					console.log("GAME OVER")
				}
			}
			else{
				console.log("it's taken")
			}
		}
		else
		{
			console.log("GAME OVER")
		}
		if($scope.Winner  && $scope.isOver){
			console.log("FOUND WINNER"+$scope.Winner.name)
		}
	}
}]);