var rpgApp = angular.module('rpgApp', []);

rpgApp.controller('rpgCtrl', function($scope, $rootScope) {
	$scope.characters = [];
	$scope.activeCharacterIndex = 0;
	$scope.warrior = {
		'name': 'Warrior',
		'id': 'warrior',
		'position': {
			'x':1,
			'y':1,
			'z':0
		},
		'image': {
			'left':'image/warrior/left.png',
			'right':'image/warrior/right.png',
			'up':'image/warrior/up.png',
			'down':'image/warrior/down.png'
		},
		'actions': {
			'name': 'Actions',
			'id': 'actionGroup',
			'list': [
				{	'name': 'Combo',
					'id': 'comboGroup',
					'description': 'Combinations of basic attacks that utilize momentum bonuses',	
					'list': [
						{
							'name': 'Rush',
							'id': 'combo_rush',		
							'description': 'Knockdown -> Power Strike',
							'combo': ['attack_knockdown', 'attack_powerStrike']
						},
						{
							'name': '3-hit',
							'id': 'combo_3hit',
							'description': 'Jab -> Jab -> Power Strike',
							'combo': ['attack_jab', 'attack_jab', 'attack_powerStrike']
						}
					]
				},
				{	'name': 'Ability',
					'id': 'abilityGroup',
					'description': 'Special abilities',	
					'list': [
						{
							'name': 'Challenge',
							'id': 'ability_challenge',
							'duration': 10,
							'description': 'Encourage an enemy to fight only you (limit: 1 active)',
						},
						{
							'name': 'Sweep',
							'id': 'ability_sweep',
							'duration': 40,
							'description': 'Knockdown every nearby enemy',
						},
						{
							'name': 'Throw Axe',
							'id': 'ability_throwingAxe',
							'duration': 30,
							'description': 'Hurl a throwing axe',
						}
					]
				},
				{	'name': 'Attack',
					'id': 'attackGroup',
					'description': 'Basic attacks',	
					'list': [
						{
							'name': 'Jab',
							'id': 'attack_jab',
							'duration': 20,
							'description': 'Quick strike',
						},
						{
							'name': 'Power Strike',
							'id': 'attack_powerStrike',
							'duration': 40,
							'description': 'Slower, more powerful attack',
						},
						{
							'name': 'Knockdown',
							'id': 'attack_knockdown',
							'duration': 20,
							'description': 'Strong shove designed to knock the enemy prone',
						}
					]
				}
			]
		},
		'durationQueued': 0
	};
	$scope.archer = {
		'name': 'Archer',
		'id': 'archer',
		'position': {
			'x':1,
			'y':2,
			'z':0
		},
		'image': {
			'left':'image/archer/left.png',
			'right':'image/archer/right.png',
			'up':'image/archer/up.png',
			'down':'image/archer/down.png'
		},
		'actions': {
			'name': 'Actions',
			'id': 'actionGroup',
			'list': [
				{	'name': 'Combo',
					'id': 'comboGroup',
					'description': 'Combinations of basic attacks that utilize momentum bonuses',	
					'list': [
						{
							'name': 'Keep your Distance',
							'id': 'combo_keepYourDistance',		
							'description': 'Pin -> Power Shot',
							'combo': ['attack_pin', 'attack_powerShot']
						},
						{
							'name': '3-hit',
							'id': 'combo_3hit',
							'description': 'Plunk -> Plunk -> Power Shot',
							'combo': ['attack_plunk', 'attack_plunk', 'attack_powerShot']
						}
					]
				},
				{	'name': 'Ability',
					'id': 'abilityGroup',
					'description': 'Special abilities',	
					'list': [
						{
							'name': 'Snare',
							'id': 'ability_snare',
							'duration': 80,
							'description': 'Create an immobile trap (limit: 1 active)',
						},
						{
							'name': 'Barrage',
							'id': 'ability_barrage',
							'duration': 40,
							'description': 'Release a lot of inaccurate arrows - "Quantity over quality"',
						},
						{
							'name': 'Ignite',
							'id': 'ability_ignite',
							'duration': 40,
							'description': 'Fire a flaming arrow',
						}
					]
				},
				{	'name': 'Attack',
					'id': 'attackGroup',
					'description': 'Basic attacks',	
					'list': [
						{
							'name': 'Plunk',
							'id': 'attack_plunk',
							'duration': 20,
							'description': 'Quick shot',
						},
						{
							'name': 'Power Shot',
							'id': 'attack_powerShot',
							'duration': 40,
							'description': 'Slower, more powerful attack',
						},
						{
							'name': 'Pin',
							'id': 'attack_pin',
							'duration': 40,
							'description': 'Aim for the legs, designed to lock the enemy in place',
						}
					]
				}
			]
		},
		'durationQueued': 0
	};
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
		aChar.actionDisplayIdTree = [aChar.actions.id];
		aChar.actionQueue = [];
		$scope.characters.push(aChar);
	}
	
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
		
		while (true) {
			var nextAction = null;
			var characterIndex = -1;
			var lowestTime = Number.MAX_VALUE;
			for (var i in $scope.characters) {
				console.log($scope.characters[i].name, ":", (durationUsed[i]||0), "<", $scope.characters[i].durationQueued, "?");	
				if ((durationUsed[i]||0) < lowestTime && (durationUsed[i]||0) < $scope.characters[i].durationQueued) {
					console.log("yes");
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
		$scope.updateActionQueue();
	}
	
	//On initial load
	$scope.addCharacter($scope.warrior);
	$scope.addCharacter($scope.archer);
	$scope.updateActionDisplay();
});