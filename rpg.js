var recursiveApp = angular.module('rpgApp', []);

recursiveApp.controller('rpgCtrl', function($scope, $rootScope) {
	$scope.warrior = {
		'actions': {
			'name': 'Actions',
			'id': 'actionGroup',
			'list': [
				{	'name': 'Combo',
					'id': 'comboGroup',
					'list': [
						{
							'name': 'Rush',
							'id': 'combo_rush',		
							'description': 'Knockdown -> Power Strike',
						},
						{
							'name': '3-hit',
							'id': 'combo_3hit',
							'description': 'Jab -> Jab -> Power Strike',
						}
					]
				},
				{	'name': 'Ability',
					'id': 'abilityGroup',
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
	
	$scope.getAction = function(id, actionGroup) {
		if (id == actionGroup.id) {
			console.log(id,'==',actionGroup.id);
			return actionGroup;
		} else {
			console.log(id,'!=',actionGroup.id);
			for (var action in actionGroup) {
				var theAction = $scope.getAction(id, action);
				if (theAction) {
					return theAction;
				}
			}
		}
		return null;
	};
	
	$scope.getWarriorAction = function(id) {
		return $scope.getAction(id, $scope.warrior.actions); 
	};
	
	$scope.toggleExpansion = function(id) {
		console.log('toggleExpansion',id);
		var field = $scope.getWarriorAction(id);
		field.expanded = !field.expanded;
	};
	
	$scope.$on("toggleExpansion", function(event, args) {
		console.log("received toggleExpansion", args);
		var field = $scope.getWarriorAction(args);
		field.expanded = !field.expanded;
	});
	
	$scope.sendToggleExpansion = function(id) {
		$rootScope.$broadcast("toggleExpansion", id);
	};
});

recursiveApp.directive('actionGroup', function() {
	return { 
		restrict : 'E',
		scope : { 
			data: '=*data',
			sendToggleExpansion: '&'
		},
		template : '<div ng-include="\'actionGroup.html\'"></div>'
	};
}).directive('action', function() {
	return {
		restrict : 'E',
		scope : { 
			data: '=*data',
		},
		template : '<div ng-include="\'action.html\'"></div>'
	};
});