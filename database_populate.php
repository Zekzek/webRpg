<?php
	function populate() {
	# Drop all tables
		query("DROP TABLE IF EXISTS characters");
		query("DROP TABLE IF EXISTS characterInstances");
		query("DROP TABLE IF EXISTS actions");
		query("DROP TABLE IF EXISTS characters_actions");
		query("DROP TABLE IF EXISTS actions_subactions");
		
	# Recreate all tables
		query("CREATE TABLE characters (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
			name VARCHAR(30) NOT NULL,
			spriteCounts VARCHAR(25) NOT NULL,
			spriteSheet VARCHAR(50) NOT NULL
		)");
		query("CREATE TABLE characterInstances (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
			character_id INT(6) UNSIGNED, 
			name VARCHAR(30),
			spriteCounts VARCHAR(25),
			spriteSheet VARCHAR(50),
			posX INT(4),
			posY INT(4),
			posZ INT(4)			
		)");
		query("CREATE TABLE actions (
			id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
			name VARCHAR(30) NOT NULL,
			description VARCHAR(100),
			category VARCHAR(30),
			duration INT(3)
		)");
		query("CREATE TABLE characters_actions (
			character_id INT(6) UNSIGNED, 
			action_id INT(6) UNSIGNED
		)");
		query("CREATE TABLE actions_subactions (
			action_id INT(6) UNSIGNED, 
			subaction_id INT(6) UNSIGNED
		)");
		
	# Insert data into characters
		query("INSERT INTO characters (name, spriteCounts, spriteSheet)
			VALUES ('Boy', '[9,7,6,6,6]', 'boy.png'
		)");
		$boyId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO characters (name, spriteCounts, spriteSheet)
			VALUES ('Girl', '[9,7,6,6,6]', 'girl.png'
		)");
		$girlId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO characters (name, spriteCounts, spriteSheet)
			VALUES ('Guard', '[9,7,6,13,6]', 'guard.png'
		)");
		$guardId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO characters (name, spriteCounts, spriteSheet)
			VALUES ('Sorceress', '[9,7,6,13,6]', 'sorceress.png'
		)");
		$sorceressId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO characters (name, spriteCounts, spriteSheet)
			VALUES ('Defender', '[9,7,6,13,6]', 'defender.png'
		)");
		$defenderId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO characters (name, spriteCounts, spriteSheet)
			VALUES ('Berserker', '[9,7,6,13,6]', 'berserker.png'
		)");
		$berserkerId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO characters (name, spriteCounts, spriteSheet)
			VALUES ('Archer', '[9,7,6,13,6]', 'archer.png'
		)");
		$archerId = mysqli_insert_id($GLOBALS['mysqli']);
		
	# Insert data into characterInstances
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ)
			VALUES (" . $boyId . ", 'Boy #1', 3, 3, 0
		)");
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ)
			VALUES (" . $boyId . ", 'Boy #2', 3, 4, 0
		)");
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ)
			VALUES (" . $girlId . ", 'Girl #1', 3, 5, 0
		)");
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ)
			VALUES (" . $guardId . ", 'Guard #1', 4, 3, 0
		)");
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ)
			VALUES (" . $sorceressId . ", 'Sorceress #1', 4, 4, 0
		)");
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ)
			VALUES (" . $defenderId . ", 'Defender #1', 4, 5, 0
		)");
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ)
			VALUES (" . $berserkerId . ", 'Berserker #1', 5, 3, 0
		)");
		query("INSERT INTO characterInstances (character_id, name, posX, posY, posZ)
			VALUES (" . $archerId . ", 'Archer #1', 5, 4, 0
		)");
		
	# Insert data into actions
		query("INSERT INTO actions (name, description, category)
			VALUES ('Keep Your Distance', 'Do solid damage at range while preventing your target from closing in', '[\'combo\']'
		)");
		$keepYourDistanceId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO actions (name, description, category, duration)
			VALUES ('Snare', 'Create an immobile trap (limit: 1 active)', '[\'ability\']', 80
		)");
		$snareId = mysqli_insert_id($GLOBALS['mysqli']);
		query("INSERT INTO actions (name, description, category, duration)
			VALUES ('Multi-Shot', 'Release a lot of inaccurate arrows - \"Quantity over quality\"', '[\'ability\']', 40
		)");
		$multiShotId = mysqli_insert_id($GLOBALS['mysqli']);
		
		# Insert data into characters_actions
		
		# Insert data into actions_subactions
	}
?>