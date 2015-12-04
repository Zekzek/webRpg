<?php
	function populate() {
	# Drop all tables
		query("DROP TABLE IF EXISTS characters");
		query("DROP TABLE IF EXISTS characterInstances");
		query("DROP TABLE IF EXISTS actions");
		query("DROP TABLE IF EXISTS statusEffects");
		query("DROP TABLE IF EXISTS weapons");
		query("DROP TABLE IF EXISTS characters_actions");
		query("DROP TABLE IF EXISTS actions_statusEffects");

	# Recreate all tables
		query("CREATE TABLE characters (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
			name VARCHAR(30) NOT NULL,
			hp int(5) UNSIGNED,
			spriteCounts VARCHAR(25) NOT NULL,
			spriteSheet VARCHAR(50) NOT NULL,
			weapon_id INT(6) UNSIGNED)");
		query("CREATE TABLE characterInstances (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
			character_id INT(6) UNSIGNED, 
			name VARCHAR(30),
			hp int(5) UNSIGNED,
			spriteCounts VARCHAR(25),
			spriteSheet VARCHAR(50),
			weapon_id INT(6) UNSIGNED,
			posX INT(4),
			posY INT(4),
			posZ INT(4),
			facingDirection VARCHAR(5))");
		query("CREATE TABLE actions (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
			name VARCHAR(30) NOT NULL,
			description VARCHAR(100),
			category VARCHAR(30),
			combo VARCHAR(100),
			duration INT(3),
			damage INT(5),
			attackMomentum INT(2),
			moveMomentum INT(2),
			animation VARCHAR(20))");
		query("CREATE TABLE statusEffects (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
			name VARCHAR(30) NOT NULL,
			description VARCHAR(100))");
		query("CREATE TABLE weapons (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
			name VARCHAR(30) NOT NULL,
			description VARCHAR(100),
			duration INT(3),
			damage INT(3),
			reach INT(2),
			animation VARCHAR(20))");
		query("CREATE TABLE characters_actions (
			character_id INT(6) UNSIGNED, 
			action_id INT(6) UNSIGNED)");
		query("CREATE TABLE actions_statusEffects (
			action_id INT(6) UNSIGNED, 
			statusEffect_id INT(6) UNSIGNED,
			tenacity INT(3) UNSIGNED)");

	# Insert data into weapons
		query("INSERT INTO weapons (name, description, duration, damage, reach, animation)
			VALUES ('Weak Fist', 'Weak unarmed strike', 100, 30, 0, 'MELEE')");
		$weakFistId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO weapons (name, description, duration, damage, reach, animation)
			VALUES ('Expert Fist', 'Honed unarmed strike', 75, 85, 0, 'MELEE')");
		$expertFistId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO weapons (name, description, duration, damage, reach, animation)
			VALUES ('Dagger', 'Fast', 80, 90, 0, 'MELEE')");
		$daggerId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO weapons (name, description, duration, damage, reach, animation)
			VALUES ('Wand', 'Mage\'s Weapon', 100, 90, 0, 'MELEE')");
		$wandId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO weapons (name, description, duration, damage, reach, animation)
			VALUES ('Spear', 'Slow 1-handed weapon with reach', 120, 100, 1, 'MELEE')");
		$spearId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO weapons (name, description, duration, damage, reach, animation)
			VALUES ('Axe', 'Heavier 1-handed weapon', 100, 120, 0, 'MELEE')");
		$axeId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO weapons (name, description, duration, damage, reach, animation)
			VALUES ('Great Mace', 'Heavy 2-handed weapon', 150, 175, 1, 'MELEE')");
		$greatMaceId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO weapons (name, description, duration, damage, reach, animation)
			VALUES ('Great Axe', 'Heavy 2-handed weapon', 140, 160, 1, 'MELEE')");
		$greatAxeId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO weapons (name, description, duration, damage, reach, animation)
			VALUES ('Bow', 'Typical ranged weapon', 100, 100, 6, 'RANGE')");
		$bowId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO weapons (name, description, duration, damage, reach, animation)
			VALUES ('Great Bow', 'Powerful ranged weapon', 150, 150, 8, 'RANGE')");
		$greatBowId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO weapons (name, description, duration, damage, reach, animation)
			VALUES ('Long Bow', 'Maximum range weapon', 100, 90, 12, 'RANGE')");
		$longBowId = mysqli_insert_id($GLOBALS['mysqli']);
		
	# Insert data into characters
		query("INSERT INTO characters (name, hp, spriteCounts, spriteSheet, weapon_id)
			VALUES ('Boy', 20, '[9,7,6,6,6]', 'boy.png', ".$weakFistId.")");
		$boyId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO characters (name, hp, spriteCounts, spriteSheet, weapon_id)
			VALUES ('Girl', 19, '[9,7,6,6,6]', 'girl.png', ".$weakFistId.")");
		$girlId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO characters (name, hp, spriteCounts, spriteSheet, weapon_id)
			VALUES ('Guard', 60, '[9,7,6,13,6]', 'guard.png', ".$spearId.")");
		$guardId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO characters (name, hp, spriteCounts, spriteSheet, weapon_id)
			VALUES ('Sorceress', 50, '[9,7,6,13,6]', 'sorceress.png', ".$wandId.")");
		$sorceressId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO characters (name, hp, spriteCounts, spriteSheet, weapon_id)
			VALUES ('Defender', 70, '[9,7,6,13,6]', 'defender.png', ".$spearId.")");
		$defenderId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO characters (name, hp, spriteCounts, spriteSheet, weapon_id)
			VALUES ('Berserker', 65, '[9,7,6,13,6]', 'berserker.png', ".$greatMaceId.")");
		$berserkerId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO characters (name, hp, spriteCounts, spriteSheet, weapon_id)
			VALUES ('Archer', 55, '[9,7,6,13,6]', 'archer.png', ".$bowId.")");
		$archerId = mysqli_insert_id($GLOBALS['mysqli']);
		
	# Insert data into characterInstances
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ, facingDirection)
			VALUES (" . $sorceressId . ", 'Sorceress #1', 3, 3, 0, 'EAST')");
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ, facingDirection)
			VALUES (" . $defenderId . ", 'Defender #1', 3, 4, 0, 'EAST')");
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ, facingDirection)
			VALUES (" . $berserkerId . ", 'Berserker #1', 3, 5, 0, 'EAST')");
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ, facingDirection)
			VALUES (" . $archerId . ", 'Archer #1', 3, 6, 0, 'EAST')");
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ, facingDirection)
			VALUES (" . $boyId . ", 'Boy #1', 8, 3, 0, 'WEST')");
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ, facingDirection)
			VALUES (" . $guardId . ", 'Guard #1', 8, 4, 0, 'WEST')");
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ, facingDirection)
			VALUES (" . $girlId . ", 'Girl #1', 8, 5, 0, 'WEST')");
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ, facingDirection)
			VALUES (" . $guardId . ", 'Guard #2', 8, 6, 0, 'WEST')");
		
	# Insert data into actions
		query("INSERT INTO actions (name, description, category, duration, damage, animation)
			VALUES ('Snare', 'Create an immobile trap (limit: 1 active)', '[\"ability\"]', 800, 50, 'EXCERCISE')");
		$snareId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO actions (name, description, category, duration, damage)
			VALUES ('Multi-Shot', 'Release a lot of inaccurate arrows - \"Quantity over quality\"', '[\"ability\"]', 400, 10)");
		$multiShotId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO actions (name, description, category, duration, damage)
			VALUES ('Ignite', 'A flaming attack designed to light the target ablaze', '[\"ability\"]', 400, 10)");
		$igniteId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO actions (name, description, category, duration, damage)
			VALUES ('Pin', 'Aim for the legs, designed to lock the enemy in place', '[\"attack\"]', 400, 10)");
		$pinId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO actions (name, description, category, duration, damage)
			VALUES ('Challenge', 'Encourage an enemy to fight only you (limit: 1 active)', '[\"ability\"]', 100, 1)");
		$challengeId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO actions (name, description, category, duration, damage)
			VALUES ('Sweep', 'A spinning attack designed to knockdown everyone nearby', '[\"ability\"]', 400, 10)");
		$sweepId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO actions (name, description, category, duration, damage)
			VALUES ('Throw', 'Hurl your weapon at a distant enemy', '[\"ability\"]', 300, 10)");
		$throwId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO actions (name, description, category, duration, damage)
			VALUES ('Quick Attack', 'A fast, weak attack', '[\"attack\"]', 200, 10)");
		$quickAttackId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO actions (name, description, category, duration, damage)
			VALUES ('Power Attack', 'A slow, powerful attack', '[\"attack\"]', 400, 25)");
		$powerAttackId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO actions (name, description, category, duration, damage)
			VALUES ('Knockdown', 'Strong shove designed to knock the enemy prone', '[\"attack\"]', 200, 5)");
		$knockdownId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO actions (name, description, category, combo)
			VALUES ('Keep Your Distance', 'Do solid damage at range while preventing your target from closing in', '[\"combo\"]', '".$pinId.">".$powerAttackId."')");
		$keepYourDistanceId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO actions (name, description, category, combo)
			VALUES ('Rushing Strike', 'Knockdown, followed by a powerful strike', '[\"combo\"]', '".$knockdownId.">".$powerAttackId."')");
		$rushingStrikeId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO actions (name, description, category, combo)
			VALUES ('3-hit Combo', '3-hit combo building to a powerful attack', '[\"combo\"]', '".$quickAttackId.">".$quickAttackId.">".$powerAttackId."')");
		$threeHitComboId = mysqli_insert_id($GLOBALS['mysqli']);
		
	# Insert data into status effet
		query("INSERT INTO statusEffects (name, description)
			VALUES ('Pinned', 'Unable to move from current location')");
		query("INSERT INTO statusEffects (name, description)
			VALUES ('Burning', 'Taking damage over time and distracted by the fire')");

	# Insert data into characters_actions
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$boyId.",".$quickAttackId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$girlId.",".$quickAttackId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$guardId.",".$quickAttackId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$sorceressId.",".$quickAttackId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$defenderId.",".$quickAttackId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$berserkerId.",".$quickAttackId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$berserkerId.",".$rushingStrikeId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$berserkerId.",".$threeHitComboId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$berserkerId.",".$challengeId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$berserkerId.",".$sweepId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$berserkerId.",".$throwId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$berserkerId.",".$powerAttackId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$berserkerId.",".$knockdownId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$archerId.",".$quickAttackId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$archerId.",".$keepYourDistanceId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$archerId.",".$snareId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$archerId.",".$multiShotId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$archerId.",".$igniteId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$archerId.",".$pinId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$archerId.",".$threeHitComboId.")");
		query("INSERT INTO characters_actions (character_id, action_id)
			VALUES (".$archerId.",".$powerAttackId.")");
	}
?>