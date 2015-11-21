function SpriteAnimator(image, numWalk, numCast, numMelee, numRange, numDeath) {	
	var x = 0;
	var y = 0;
	
	function animate(row, overTime, scope) {
		_this.y = -64 * row;
		_this.x = 0;
		var sprites;
		if (row <= SpriteAnimator.WALK_EAST) { 
			numSprites = numWalk;
		} else if (row <= SpriteAnimator.CAST_EAST) { 
			numSprites = numCast;
		} else if (row <= SpriteAnimator.MELEE_EAST) { 
			numSprites = numMelee;
		} else if (row <= SpriteAnimator.RANGE_EAST) { 
			numSprites = numRange;
		} else if (row <= SpriteAnimator.DEATH) { 
			numSprites = numDeath;
		} else {
			numSprites = 0;
		}
			
		for (var i = 0; i < numSprites; i++) {
			(function(index) {
				setTimeout(function() {
					_this.x = index * -64;
					scope.$apply(); 
				}, overTime * (index + 1) / numSprites);
			})(i);
		}
	};
	
	var _this = {
		'x' : x,
		'y' : y,
		'image' : image,
		'animate' : animate
	};
	
	return _this;
}

SpriteAnimator.WALK_NORTH = 0;
SpriteAnimator.WALK_WEST = 1;
SpriteAnimator.WALK_SOUTH = 2;
SpriteAnimator.WALK_EAST = 3;
SpriteAnimator.CAST_NORTH = 4;
SpriteAnimator.CAST_WEST = 5;
SpriteAnimator.CAST_SOUTH = 6;
SpriteAnimator.CAST_EAST = 7;
SpriteAnimator.MELEE_NORTH = 8;
SpriteAnimator.MELEE_WEST = 9;
SpriteAnimator.MELEE_SOUTH = 10;
SpriteAnimator.MELEE_EAST = 11;
SpriteAnimator.RANGE_NORTH = 12;
SpriteAnimator.RANGE_WEST = 13;
SpriteAnimator.RANGE_SOUTH = 14;
SpriteAnimator.RANGE_EAST = 15;
SpriteAnimator.DEATH = 16;
