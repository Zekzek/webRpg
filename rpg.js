var recursiveApp = angular.module('rpgApp', []);

recursiveApp.controller('rpgCtrl', function($scope, $rootScope) {
	$scope.characters = [];
	$scope.activeCharacterIndex = 0;
	$scope.warrior = {
		'name': 'Warrior',
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
							'description': 'Encourage an enemy to fight only you (limit: 1 active)',
						},
						{
							'name': 'Sweep',
							'id': 'ability_sweep',
							'description': 'Knockdown every nearby enemy',
						},
						{
							'name': 'Throw Axe',
							'id': 'ability_throwingAxe',
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
							'description': 'Quick strike',
						},
						{
							'name': 'Power Strike',
							'id': 'attack_powerStrike',
							'description': 'Slower, more powerful attack',
						},
						{
							'name': 'Knockdown',
							'id': 'attack_knockdown',
							'description': 'Strong shove designed to knock the enemy prone',
						}
					]
				}
			]
		}
	};
	$scope.archer = {
		'name': 'Archer',
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
							'description': 'Create a immobile trap',
						},
						{
							'name': 'Barrage',
							'id': 'ability_barrage',
							'description': 'Release a lot of inaccurate arrows - "Quantity over quality"',
						},
						{
							'name': 'Ignite',
							'id': 'ability_ignite',
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
							'description': 'Quick shot',
						},
						{
							'name': 'Power Shot',
							'id': 'attack_powerShot',
							'description': 'Slower, more powerful attack',
						},
						{
							'name': 'Pin',
							'id': 'attack_pin',
							'description': 'Aim for the legs, designed to lock the enemy in place',
						}
					]
				}
			]
		}
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

	$scope.updateactionDisplay = function() {
		$scope.getActiveCharacter().actionDisplay = $scope.getAction($scope.getActiveCharacter().actionDisplayIdTree[0]);
	};
	
	$scope.actionMenu_select = function(action) {
		if (action.list) {
			$scope.getActiveCharacter().actionDisplayIdTree.unshift(action.id);
		}
		else {
			if (action.combo) {
				for (i in action.combo) {
					$scope.getActiveCharacter().actionQueue.push($scope.getAction(action.combo[i]));
				}
			}
			else {
				$scope.getActiveCharacter().actionQueue.push(action);
			}
			$scope.nextCharacter();
		}
		$scope.updateactionDisplay();
	};
	
	$scope.actionMenu_back = function() {
		$scope.getActiveCharacter().actionDisplayIdTree.shift();
		$scope.updateactionDisplay();
	};
	
	$scope.nextCharacter= function() {
		$scope.activeCharacterIndex++;
		if ($scope.activeCharacterIndex >= $scope.characters.length) {
			$scope.activeCharacterIndex = 0;
		}
	};
	
	//On initial load
	$scope.addCharacter($scope.warrior);
	$scope.addCharacter($scope.archer);
	$scope.updateactionDisplay();
});