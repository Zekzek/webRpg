var recursiveApp = angular.module('rpgApp', []);

recursiveApp.controller('rpgCtrl', function($scope) {
	$scope.test="test";
	
	$scope.data = [{  
		"BatchID":35,
		"Product":{
			"Description":"Thingamabob",
			"ProductID":12,
			"Components":[  
				{
					"Requirement":"Sprocket",
					"Quantity":1,
					"FulfilledBy":[
						{  
							"BatchID":87,
							"Product":{  
								"Description":"Sprocket",
								"ProductID":3,
								"Components":{  
								}
							}						
						}
					]
				},
				{
					"Requirement":"Gizmo",
					"Quantity":5,
					"FulfilledBy":[ 
						{  
							"BatchID":32,
							"Product":{  
								"Description":"Gizmo",
								"ProductID":54,
								"Components":{  
								}
							}
						},
						{  
							"BatchID":33,
							"Product":{  
								"Description":"Gizmo",
								"ProductID":54,
								"Components":{  

								}
							}
						}
					]
				}
			]
		}		
	}];
	
	$scope.toggle = function(field) {
		field.expanded = !field.expanded;
	};
});

recursiveApp.directive('batch', function() {
	return { 
		restrict : 'E',
		scope : { 
			batch: '=*data',
		},
		template : '<div ng-include="\'batch.html\'"></div>'
	};
}).directive('product', function() {
	return {
		restrict : 'E',
		scope : { 
			product: '=*data',
		},
		template : '<div ng-include="\'product.html\'"></div>'
	};
}).directive('component', function() {
	return {
		restrict : 'E',
		scope : { 
			component: '=*data',
		},
		template : '<div ng-include="\'component.html\'"></div>'
	};
})