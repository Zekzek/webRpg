CHARACTER_TYPE = {};

CHARACTER_TYPE.boy = {
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
CHARACTER_TYPE.girl = {
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
CHARACTER_TYPE.guard = {
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
CHARACTER_TYPE.sorceress = {
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
CHARACTER_TYPE.defender = {
	'name':'Defender',
	'id': 'defender',
	'position': {
		'x':3,
		'y':2,
		'z':0
	},
	'spriteAnimator': new SpriteAnimator('image/spritesheet/defender.png', 9, 6, 6, 10, 6),
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
CHARACTER_TYPE.berserker = {
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
CHARACTER_TYPE.archer = {
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