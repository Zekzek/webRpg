RPG_DATABASES = {}

RPG_DATABASES.CHARACTER = {};
RPG_DATABASES.ACTION = {};
RPG_DATABASES.WEAPON = {};

RPG_DATABASES.CHARACTER_INSTANCE = {};


RPG_DATABASES.getCharacter = function(id) {
	var instance, base;
	
	for (i in RPG_DATABASES.CHARACTER_INSTANCE) {
		if (RPG_DATABASES.CHARACTER_INSTANCE[i].id == id) {
			instance = RPG_DATABASES.CHARACTER_INSTANCE[i];
			break;
		}
	}
	for (i in RPG_DATABASES.CHARACTER) {
		if (RPG_DATABASES.CHARACTER[i].id == instance.characterId) {
			base = RPG_DATABASES.CHARACTER[i];
			break;
		}
	}
	
	var theCharacter = {'spriteIndex':{ 'x':0, 'y':0 }, 'durationQueued':0, 'durationWaited':0 };
	RPG_DATABASES.objectMerge(theCharacter, base);
	RPG_DATABASES.objectMerge(theCharacter, instance);
	console.debug('theCharacter:', theCharacter);
	for (var i in theCharacter.actions) {
		for (var j in RPG_DATABASES.ACTION) {
			if (theCharacter.actions[i] == RPG_DATABASES.ACTION[j].id) {
				theCharacter.actions[i] = RPG_DATABASES.ACTION[j];
				break;
			}
		}
		if (typeof theCharacter.actions[i] == 'string') {
			console.error("No action found for ", theCharacter.actions[i]);
		}
	}
}

RPG_DATABASES.objectMerge = function (obj1, obj2) {
	for (var i in obj2) {
		if ( obj2[i].constructor==Object ) {
			if (!obj1[i]) { obj1[i] = {}; }
			RPG_DATABASES.objectMerge(obj1[i], obj2[i]);
		} else {
			obj1[i] = obj2[i];
		}
	}
}

RPG_DATABASES.CHARACTER.boy = {
	'id':'boy',
	'name':'Boy',
	'spriteCounts':[9,7,6,6,6],
	'spritesheet':'image/spritesheet/boy.png',
	'actions': [
		'throwAxe'
	]
};
RPG_DATABASES.CHARACTER.girl = {
	'id':'girl',
	'name':'Girl',
	'spriteCounts':[9,7,6,6,6],
	'spritesheet':'image/spritesheet/girl.png',
	'actions': [
		'throwAxe'
	]
};
RPG_DATABASES.CHARACTER.guard = {
	'id':'guard',
	'name':'Guard',
	'spriteCounts':[9,7,6,13,6],
	'spritesheet':'image/spritesheet/guard.png',
	'actions': [
		'throwAxe'
	]
};
RPG_DATABASES.CHARACTER.sorceress = {
	'id':'sorceress',
	'name':'Sorceress',
	'spriteCounts':[9,7,6,13,6],
	'spritesheet':'image/spritesheet/sorceress.png',
	'actions': [
		'throwAxe'
	]
};
RPG_DATABASES.CHARACTER.defender = {
	'id':'defender',
	'name':'Defender',
	'spriteCounts':[9,7,6,13,6],
	'spritesheet':'image/spritesheet/defender.png',
	'actions': [
		'throwAxe'
	]
};
RPG_DATABASES.CHARACTER.berserker = {
	'id':'berserker',
	'name':'Berserker',
	'spriteCounts':[9,7,6,13,6],
	'spritesheet':'image/spritesheet/berserker.png',
	'actions': [
		'rush',
		'threeHitCombo',
		'challenge',
		'sweep',
		'throwAxe',
		'quickAttack',
		'powerAttack',
		'knockdown'
	]
};
RPG_DATABASES.CHARACTER.archer = {
	'id':'archer',
	'name':'Archer',
	'spriteCounts':[9,7,6,13,6],
	'spritesheet':'image/spritesheet/archer.png',
	'actions': [
		'keepYourDistance',
		'threeHitCombo',
		'snare',
		'barrage',
		'ignite',
		'quickAttack',
		'powerAttack',
		'pin'
	]
};
	
/*	Equiped weapons effect all attacks.
	If undefined, weapons are assumed to have:
		'duration':1.0,
		'damage':1.0,
		'range':0
	Could alter chances for certain status effects (ie. knockdown)*/
RPG_DATABASES.WEAPON.axe = {
	'damage': 1.2
}
RPG_DATABASES.WEAPON.greatAxe = {
	'duration': 1.4,
	'damage': 1.6,
	'range': 1
}
RPG_DATABASES.WEAPON.bow = {
	'range': 6
}
RPG_DATABASES.WEAPON.greatBow = {
	'duration': 1.5,
	'damage': 1.5,
	'range': 8
}
RPG_DATABASES.WEAPON.longBow = {
	'damage': 0.9,
	'range': 12
}

//range
//animationType
//attackMomentum
//moveMomentum
//status (id and chance/power)
//Conventions: Shot=ranged only, Strike=melee only, Attack=ranged/melee
RPG_DATABASES.ACTION.keepYourDistance = {
	'id': 'keepYourDistance',
	'name': 'Keep Your Distance',
	'description': 'Do solid damage at range while preventing your target from closing in',
	'categoryTree' : ['combo'],
	'combo' : ['pin', 'powerAttack']
};
RPG_DATABASES.ACTION.snare = {
	'id': 'snare',
	'name': 'Snare',
	'description': 'Create an immobile trap (limit: 1 active)',
	'categoryTree' : ['ability'],
	'duration' : 80
};
RPG_DATABASES.ACTION.barrage = {
	'id': 'barrage',
	'name': 'Barrage',
	'description': 'Release a lot of inaccurate arrows - "Quantity over quality"',
	'categoryTree' : ['ability'],
	'duration' : 40
};
RPG_DATABASES.ACTION.ignite = {
	'id': 'ignite',
	'name': 'Ignite',
	'description': 'A flaming attack designed to light the target ablaze',
	'categoryTree' : ['ability'],
	'duration' : 40
};
RPG_DATABASES.ACTION.pin = {
	'id': 'pin',
	'name': 'Pin',
	'description': 'Aim for the legs, designed to lock the enemy in place',
	'categoryTree' : ['attack'],
	'duration' : 40
};
RPG_DATABASES.ACTION.rush = {
	'id': 'rush',
	'name': 'Rush',
	'description': 'Knockdown, followed by a powerful strike',
	'categoryTree' : ['combo'],
	'combo': ['knockdown', 'powerAttack']
};
RPG_DATABASES.ACTION.threeHitCombo = {
	'id': 'threeHitCombo',
	'name': 'Three-Hit Combo',
	'description': '3-hit combo building to a powerful attack',
	'categoryTree' : ['combo'],
	'combo': ['quickAttack', 'quickAttack', 'powerAttack']
};
RPG_DATABASES.ACTION.challenge = {
	'id': 'challenge',
	'name': 'Challenge',
	'description': 'Encourage an enemy to fight only you (limit: 1 active)',
	'categoryTree' : ['ability'],
	'duration': 10
};
RPG_DATABASES.ACTION.sweep = {
	'id': 'sweep',
	'name': 'Sweep',
	'description': 'A spinning attack designed to knockdown everyone nearby',
	'categoryTree' : ['ability'],
	'duration': 40
};
RPG_DATABASES.ACTION.throwAxe = {
	'id': 'throwAxe',
	'name': 'Throw Axe',
	'description': 'Hurl a throwing axe',
	'categoryTree' : ['ability'],
	'duration': 30
};
RPG_DATABASES.ACTION.quickAttack = {
	'id': 'quickAttack',
	'name': 'Quick Attack',
	'description': 'A fast, weaker attack',
	'categoryTree' : ['attack'],
	'duration': 20
};
RPG_DATABASES.ACTION.powerAttack = {
	'id': 'powerAttack',
	'name': 'Power Attack',
	'description': 'Slower, more powerful attack',
	'categoryTree' : ['attack'],
	'duration': 40
};
RPG_DATABASES.ACTION.knockdown = {
	'id': 'knockdown',
	'name': 'Knockdown',
	'description': 'Strong shove designed to knock the enemy prone',
	'categoryTree' : ['attack'],
	'duration': 20
};

/*
	Instances can overwrite any fields from the base class (other than id).
	If undefined, instances are assumed to have:
		'spriteIndex':{
			'x':0,
			'y':0
		},
		'durationQueued': 0,
		'durationWaited': 0
*/
RPG_DATABASES.CHARACTER_INSTANCE.boy1 = {
	'id':'boy1',
	'characterId':'boy',
	'position': {
		'x':1,
		'y':3,
		'z':0
	}
};
RPG_DATABASES.CHARACTER_INSTANCE.girl1 = {
	'id':'girl1',
	'characterId':'girl',
	'name':'Girl #1',
	'position': {
		'x':2,
		'y':3,
		'z':0
	}
};
RPG_DATABASES.CHARACTER_INSTANCE.guard1 = {
	'id':'guard1',
	'characterId':'guard',
	'name':'Guard #1',
	'position': {
		'x':2,
		'y':2,
		'z':0
	}
};
RPG_DATABASES.CHARACTER_INSTANCE.sorceress1 = {
	'id':'sorceress1',
	'characterId':'sorceress',
	'name':'Sorceress',
	'position': {
		'x':2,
		'y':4,
		'z':0
	}
};
RPG_DATABASES.CHARACTER_INSTANCE.defender1 = {
	'id':'defender1',
	'characterId':'defender',
	'name':'Defender',
	'position': {
		'x':3,
		'y':2,
		'z':0
	}
};
RPG_DATABASES.CHARACTER_INSTANCE.berserker1 = {
	'id':'berserker1',
	'characterId':'berserker',
	'position': {
		'x':1,
		'y':4,
		'z':0
	}
};
RPG_DATABASES.CHARACTER_INSTANCE.archer1 = {
	'id':'archer1',
	'characterId':'archer',
	'position': {
		'x':1,
		'y':2,
		'z':0
	}
};