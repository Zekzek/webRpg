var rpgApp = angular.module('rpgApp', []);

rpgApp.controller('rpgCtrl', function($scope, $rootScope) {
	$scope.SpriteAnimator = SpriteAnimator;
	$scope.characters = [];
	$scope.activeCharacterIndex = 0;
	$scope.boy = {
		'name':'boy',
		'id': 'boy',
		'position': {
			'x':1,
			'y':3,
			'z':0
		},
		'spriteAnimator': new SpriteAnimator('image/spritesheet/boy.png', 9, 7, 6, 6, 6),
		'spriteIndex': {
			'x':0,
			'y':0
		},
		'actions': {
			'name': 'Actions',
			'id': 'actionGroup',
			'list': [
				{
					'name': 'Throw Axe',
					'id': 'ability_throwingAxe',
					'duration': 30,
					'description': 'Hurl a throwing axe',
				}
			]			
		},
		'durationQueued': 0,
		'durationWaited': 0
	};
	$scope.girl = {
		'name':'girl',
		'id': 'girl',
		'position': {
			'x':2,
			'y':3,
			'z':0
		},
		'spriteAnimator': new SpriteAnimator('image/spritesheet/girl.png', 9, 7, 6, 6, 6),
		'spriteIndex': {
			'x':0,
			'y':0
		},
		'actions': {
			'name': 'Actions',
			'id': 'actionGroup',
			'list': [
				{
					'name': 'Throw Axe',
					'id': 'ability_throwingAxe',
					'duration': 30,
					'description': 'Hurl a throwing axe',
				}
			]			
		},
		'durationQueued': 0,
		'durationWaited': 0
	};
	$scope.guard = {
		'name':'Guard',
		'id': 'guard',
		'position': {
			'x':2,
			'y':2,
			'z':0
		},
		'spriteAnimator': new SpriteAnimator('image/spritesheet/guard.png', 9, 7, 6, 13, 6),
		'spriteIndex': {
			'x':0,
			'y':0
		},
		'actions': {
			'name': 'Actions',
			'id': 'actionGroup',
			'list': [
				{
					'name': 'Throw Axe',
					'id': 'ability_throwingAxe',
					'duration': 30,
					'description': 'Hurl a throwing axe',
				}
			]			
		},
		'durationQueued': 0,
		'durationWaited': 0
	};
	
	$scope.sorceress = {
		'name':'Sorceress',
		'id': 'sorceress',
		'position': {
			'x':2,
			'y':4,
			'z':0
		},
		'spriteAnimator': new SpriteAnimator('image/spritesheet/sorceress.png', 9, 7, 6, 13, 6),
		'spriteIndex': {
			'x':0,
			'y':0
		},
		'actions': {
			'name': 'Actions',
			'id': 'actionGroup',
			'list': [
				{
					'name': 'Throw Axe',
					'id': 'ability_throwingAxe',
					'duration': 30,
					'description': 'Hurl a throwing axe',
				}
			]			
		},
		'durationQueued': 0,
		'durationWaited': 0
	};
	
	$scope.defender = {
		'name':'Defender',
		'id': 'defender',
		'position': {
			'x':3,
			'y':2,
			'z':0
		},
		'spriteAnimator': new SpriteAnimator('image/spritesheet/defender.png', 9, 7, 6, 13, 6),
		'spriteIndex': {
			'x':0,
			'y':0
		},
		'actions': {
			'name': 'Actions',
			'id': 'actionGroup',
			'list': [
				{
					'name': 'Throw Axe',
					'id': 'ability_throwingAxe',
					'duration': 30,
					'description': 'Hurl a throwing axe',
				}
			]			
		},
		'durationQueued': 0,
		'durationWaited': 0
	};
	
	$scope.berserker = {
		'name': 'Warrior',
		'id': 'warrior',
		'position': {
			'x':1,
			'y':4,
			'z':0
		},
		'spriteAnimator': new SpriteAnimator('image/spritesheet/berserker.png', 9, 7, 6, 13, 6),
		'image': {
			'spritesheet':'image/spritesheet/defender.png',
			'left':'image/warrior/left.png',
			'right':'image/warrior/right.png',
			'up':'image/warrior/up.png',
			'down':'image/warrior/down.png'
		},
		'spriteIndex': {
			'x':0,
			'y':0
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
		'durationQueued': 0,
		'durationWaited': 0
	};
	$scope.archer = {
		'name': 'Archer',
		'id': 'archer',
		'position': {
			'x':1,
			'y':2,
			'z':0
		},
		'spriteAnimator': new SpriteAnimator('image/spritesheet/archer.png', 9, 7, 6, 13, 6),
		'image': {
			'spritesheet':'image/spritesheet/archer.png',
			'left':'image/archer/left.png',
			'right':'image/archer/right.png',
			'up':'image/archer/up.png',
			'down':'image/archer/down.png'
		},
		'spriteIndex': {
			'x':0,
			'y':0
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
		'durationQueued': 0,
		'durationWaited': 0
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
	
	//On initial load
	$scope.addCharacter($scope.berserker);
	$scope.addCharacter($scope.archer);
	$scope.addCharacter($scope.boy);
	$scope.addCharacter($scope.girl);
	$scope.addCharacter($scope.guard);
	$scope.addCharacter($scope.sorceress);
	$scope.addCharacter($scope.defender);
	$scope.updateActionDisplay();
});