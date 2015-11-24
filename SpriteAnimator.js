function SpriteAnimator(image, numWalk, numCast, numMelee, numRange, numDeath) {	
	var x = 0;
	var y = 0;
	
	function animate(row, overTime, scope, delay) {
		_this.y = -64 * row;
		var numSprites;
		var startAt = 0
		var inc = 1;
		var endAt;
		
		if (row > 199) { //greater than 199 is code to go forwards, then backwards
			animate(row - 100, overTime / 2, scope, overTime / 2);
			row -= 200;
			overTime /= 2;
		} else if (row > 99) { //greater than 99 is code to animate backwards 
			var backwards = true;
			row -= 100;
		}
		
		if (row <= SpriteAnimator.WALK_EAST) { 
			endAt = numSprites = numWalk;
		} else if (row <= SpriteAnimator.CAST_EAST) { 
			endAt = numSprites = numCast;
		} else if (row <= SpriteAnimator.MELEE_EAST) { 
			endAt = numSprites = numMelee;
		} else if (row <= SpriteAnimator.RANGE_EAST) { 
			endAt = numSprites = numRange;
		} else if (row <= SpriteAnimator.DEATH) { 
			endAt = numSprites = numDeath;
		} else {
			numSprites = 0;
		}
		
		if (backwards) {
			startAt = numSprites - 1;
			endAt = -1
			inc = -1;
		}
		
		_this.x = startAt * -64;
		_this.y = row * -64;
			
		var counter = 0;
		for (var i = startAt; i != endAt; i += inc) {
			(function(index, count) {
				setTimeout(function() {
					_this.x = index * -64;
					scope.$apply(); 
				}, (delay||0) + overTime * (count + 1) / numSprites);
			})(i, counter++);
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

/*
	DEATH
	WALK_COMPASS
	ATTACKS_COMPASS (%4 determines direction, /4 determines row, allows each sprite to have varying complexity)
*/

// Sprite sequences
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

// Modifiers
SpriteAnimator.REVERSE = 100;
SpriteAnimator.FORWARD_REVERSE = 200;
