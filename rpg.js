var rpgApp = angular.module('rpgApp', []);

rpgApp.controller('rpgCtrl', function($scope, $rootScope, $http) {
	$scope.SpriteAnimator = SpriteAnimator;
	
	$scope.characters = [];
	$scope.activeCharacterIndex = 0;
	
	$scope.actionQueue = [];
	
	$scope.getCharacter = function(id) {
		for (var i in $scope.characters) {
			if ($scope.characters[i].id == id) {
				return $scope.characters[i];
			}
		}
		return null;
	};
		
	$scope.addCharacter = function(aChar) {
		//aChar.actionDisplayIdTree = [aChar.actions.id];
		aChar.actionQueue = [];
		aChar.spriteCounts = JSON.parse(aChar.spriteCounts);
		aChar.spriteAnimator = new SpriteAnimator(
			"image/spritesheet/" + aChar.spriteSheet,
			aChar.spriteCounts[0], aChar.spriteCounts[1], aChar.spriteCounts[2],
			aChar.spriteCounts[3], aChar.spriteCounts[4]);
		aChar.actionDisplayIdTree = ['list_top'];
		aChar.durationWaited = 0;
		aChar.durationQueued = 0;
		if (!aChar.facingDirection) aChar.facingDirection = "SOUTH";
		$scope.characters.push(aChar);
		$scope.php_getActionsFor(aChar);
	};
	
	$scope.addAction = function(aChar, anAction) {
		anAction.category = JSON.parse(anAction.category);
		if (!aChar.actions) {
			aChar.actions = {
				'id':'list_top',
				'name':'Actions',
				'description':'All Actions',
				'list':{}
			};
		}
		if (!aChar.actions.list[anAction.category]) {
			aChar.actions.list[anAction.category] = {
				'id':'list_' + anAction.category[0],
				'name':anAction.category[0],
				'description':'List all ' + anAction.category[0],
				'list':{}
			}
		}
		aChar.actions.list[anAction.category].list[anAction.id] = anAction;	
		$scope.updateActionDisplay();
		//TODO
	};
	
	$scope.getActiveCharacter = function() {
		return $scope.characters[$scope.activeCharacterIndex]; 
	};	
	
	$scope.getAction = function(id, actionGroup) {
		if (!actionGroup) {
			actionGroup = $scope.getActiveCharacter().actions;
		}
		if (id == actionGroup.id) {
			return actionGroup;
		} else {
			for (var i in actionGroup.list) {
				var theAction = $scope.getAction(id, actionGroup.list[i]);
				if (theAction) {
					return theAction;
				}
			}
		}
		return null;
	};

	$scope.updateActionDisplay = function() {
		$scope.getActiveCharacter().actionDisplay = $scope.getAction($scope.getActiveCharacter().actionDisplayIdTree[0]);
		$scope.updateActionQueue();
	};
	
	$scope.actionMenu_select = function(action) {
		$scope.getActiveCharacter().actionDisplayIdTree.unshift(action.id);
		$scope.updateActionDisplay();
	};
	
	$scope.actionMenu_queue = function(action, target) {
		if (action.combo) {
			var subActions = action.combo.split('>');
			for (i in subActions) {
				$scope.queueAction($scope.getActiveCharacter(), $scope.getAction(subActions[i]), target);
			}
		}
		else {
			$scope.queueAction($scope.getActiveCharacter(), action, target);
		}
		$scope.actionMenu_back();
		$scope.nextCharacter();
		$scope.updateActionDisplay();
	};
	
	$scope.queueAction = function(character, action, target) {
		console.debug('queueAction', character, action, target);
		action.durationLeft = action.duration;
		action.characterId = character.id;
		action.targetId = target.id;
		character.actionQueue.push(action);
		character.durationQueued += action.duration;
	};
	
	$scope.actionMenu_back = function() {
		$scope.getActiveCharacter().actionDisplayIdTree.shift();
		$scope.updateActionDisplay();
	};
	
	$scope.nextCharacter= function() {
		for (var i in $scope.characters) {
			if ($scope.characters[i].durationQueued < $scope.characters[$scope.activeCharacterIndex].durationQueued) {
				$scope.activeCharacterIndex = i;
			}
		}
	};
	
	$scope.updateActionQueue = function() {
		$scope.actionQueue.length = 0;
		var indexScheduled = [];
		var timeToNext = [];
		
		// calculate inital action delay for each character
		for (var i in $scope.characters) {
			var nextActionDuration = 0;
			if ($scope.characters[i].actionQueue[0]) {
				nextActionDuration = $scope.characters[i].actionQueue[0].duration;
			}
			timeToNext[i] = nextActionDuration - $scope.characters[i].durationWaited;
		}
		
		while (true) {
			var nextAction = null;
			var characterIndex = -1;
			var lowestTime = Number.MAX_VALUE;
			for (var i in $scope.characters) {
				if ((timeToNext[i]||0) < lowestTime && (indexScheduled[i]||0) < $scope.characters[i].actionQueue.length) {
					characterIndex = i;
					nextAction = $scope.characters[i].actionQueue[(indexScheduled[i]||0)];
					lowestTime = (timeToNext[i]||0);
				}
			}
			if (nextAction == null) {
				return; //No next action, action queue updated
			} else {
				indexScheduled[characterIndex] = (indexScheduled[characterIndex]||0) + 1;
				timeToNext[characterIndex] = (timeToNext[characterIndex]||0) + nextAction.duration;
				nextAction.icon = $scope.characters[characterIndex].spriteSheet;
				nextAction.targetIcon = $scope.getCharacter(nextAction.targetId).spriteSheet;
				$scope.actionQueue.push(nextAction);
			}
		}
	};
	
	$scope.activateAction = function() {
		if (!$scope.actionQueue || $scope.actionQueue.length == 0) {
			return false;
		}
		var action = $scope.actionQueue[0];
		var character = $scope.getCharacter(action.characterId);
		var target = $scope.getCharacter(action.targetId);
		character.actionQueue.shift();
		character.durationQueued -= action.duration;
		var timePassed = action.duration - character.durationWaited;
		character.durationWaited = 0;
		target.hp -= action.damage;
		if (target.hp <= 0) {
			target.spriteAnimator.animate('DEATH', 1000, $scope);
		}
		
		//add to duration waited for all characters that didn't get to act.
		for (var i in $scope.characters) {
			if ($scope.characters[i].id != action.characterId) {
				$scope.characters[i].durationWaited += timePassed;
			}
		}
		$scope.updateActionQueue();
		character.spriteAnimator.animate(action.animation + "_" + character.facingDirection, action.duration * 10, $scope);
		return true;
	}
	
	//Testing function. Delete later
	$scope.animateAll = function(row, time) {
		for (var i in $scope.characters) {
			$scope.characters[i].spriteAnimator.animate(row, time, $scope);
		}
	};
	
	$scope.php_getActionsFor = function(character) {
		$http({
			method: 'GET',
			url: 'database.php?request=getActionFor&characterId=' + character.id
		})
		.then(function successCallback(response) {
			document.getElementById("php_response").innerHTML = response.data;
			for (var i in response.data) {
				$scope.addAction(character, response.data[i]);
			}
		},
		function errorCallback(response) {
			console.error("getActionsFor failure", response);
		});
	};
	
	$scope.php_getAllCharacters = function() {
		$http({
			method: 'GET',
			url: 'database.php?request=getAllCharacterInstances'
		})
		.then(function successCallback(response) {
			document.getElementById("php_response").innerHTML = response.data;
			for (var i in response.data) {
				$scope.addCharacter(response.data[i]);
			}
		},
		function errorCallback(response) {
			console.error("getAllCharacters failure", response);
		});
	};
	
	$scope.php_request = function(request) {
		$http({
			method: 'GET',
			url: 'database.php?request=' + request
		})
		.then(function successCallback(response) {
			$scope.response = response.data;
			document.getElementById("php_response").innerHTML = response.data;
		},
		function errorCallback(response) {
			console.error(request, "failure", response);
		});
	};
	
	$scope.objectMerge = function (obj1, obj2) {
		for (var i in obj2) {
			if ( obj2[i].constructor==Object ) {
				if (!obj1[i]) { obj1[i] = {}; }
				$scope.objectMerge(obj1[i], obj2[i]);
			} else {
				obj1[i] = obj2[i];
			}
		}
	};
	
	//On initial load
	//$scope.php_request('populate');
	$scope.php_getAllCharacters();
	//$scope.updateActionDisplay();
});

rpgApp.directive('timer', function(){
	return {
		restrict: 'E',
		scope: {
			action : '='
		},
		templateUrl: 'timer.html'
	}
});