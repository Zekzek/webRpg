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
		$scope.characters.push(aChar);
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
		if (action.list) {
			$scope.getActiveCharacter().actionDisplayIdTree.unshift(action.id);
		}
		else {
			if (action.combo) {
				for (i in action.combo) {
					$scope.queueAction($scope.getActiveCharacter(), $scope.getAction(action.combo[i]));
				}
			}
			else {
				$scope.queueAction($scope.getActiveCharacter(), action);
			}
			$scope.nextCharacter();
		}
		$scope.updateActionDisplay();
	};
	
	$scope.queueAction = function(character, action) {
		action.durationLeft = action.duration;
		action.characterId = character.id;
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
		var indexUsed = [];
		var durationUsed = [];
		
		for (var i in $scope.characters) {
			if ($scope.characters[i].actionQueue[0]) {
				durationUsed[i] = $scope.characters[i].actionQueue[0].duration - $scope.characters[i].durationWaited;
			}
			else {
				durationUsed[i] = -$scope.characters[i].durationWaited;
			}
		}
		while (true) {
			var nextAction = null;
			var characterIndex = -1;
			var lowestTime = Number.MAX_VALUE;
			for (var i in $scope.characters) {
				if ((durationUsed[i]||0) < lowestTime && (indexUsed[i]||0) < $scope.characters[i].actionQueue.length) {
					characterIndex = i;
					nextAction = $scope.characters[i].actionQueue[(indexUsed[i]||0)];
					lowestTime = (durationUsed[i]||0);
				}
			}
			if (nextAction != null) {
				indexUsed[characterIndex] = (indexUsed[characterIndex]||0) + 1;
				durationUsed[characterIndex] = (durationUsed[characterIndex]||0) + nextAction.duration;
				nextAction.icon = $scope.characters[characterIndex].image.left;
				$scope.actionQueue.push(nextAction);
			}
			else {
				break;
			}
		}
	};
	
	$scope.activateAction = function() {
		var action = $scope.actionQueue[0];
		var character = $scope.getCharacter(action.characterId);
		character.actionQueue.shift();
		character.durationQueued -= action.duration;
		var timePassed = action.duration - character.durationWaited;
		character.durationWaited = 0;
		
		//add to duration waited for all characters that didn't get to act.
		for (var i in $scope.characters) {
			if ($scope.characters[i].id != action.characterId) {
				$scope.characters[i].durationWaited += timePassed;
			}
		}
		$scope.updateActionQueue();
	}
	
	$scope.forceAnimate = function(character, row, time) {
		character.spriteAnimator.animate(row, time, $scope);
	};
	
	$scope.animateAll = function(row, time) {
		for (var i in $scope.characters) {
			$scope.characters[i].spriteAnimator.animate(row, time, $scope);
		}
	};
	
	$scope.php_getAllCharacters = function() {
		$http({
			method: 'GET',
			url: 'database.php?request=getAll'
		})
		.then(function successCallback(response) {
			console.log("getAllCharacters success", response.data);
			document.getElementById("php_response").innerHTML = response.data;
			for (var i in response.data) {
				$scope.addCharacter(response.data[i]);
			}
		},
		function errorCallback(response) {
			console.log("getAllCharacters failure", response);
		});
	};
	
	$scope.php_request = function(request) {
		$http({
			method: 'GET',
			url: 'database.php?request=' + request
		})
		.then(function successCallback(response) {
			console.log("populate success", response);
			$scope.response = response.data;
			document.getElementById("php_response").innerHTML = response.data;
		},
		function errorCallback(response) {
			console.log("populate failure", response);
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