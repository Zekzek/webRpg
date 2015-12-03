<?php
	# initialize $GLOBALS['mysqli']
	require 'login.php';
	
	include 'database_populate.php';
	
	function query($sql) {
		if ($GLOBALS['mysqli']->query($sql) === TRUE) {
			echo "SQL Success<br>";
		} else {
			echo "SQL Error: " . $GLOBALS['mysqli']->error . "<br>";
		}
	}
	
	function getAllCharacterInstances() {
		$myArray = array();
		$result = $GLOBALS['mysqli']->query(
			"SELECT
				characterInstances.id AS id,
				characterInstances.character_id AS character_id,
				characterInstances.posX AS posX,
				characterInstances.posY AS posY,
				characterInstances.posZ AS posZ,
				CASE WHEN characterInstances.name IS NULL 
					THEN characters.name
					ELSE characterInstances.name
				END AS name,
				CASE WHEN characterInstances.hp IS NULL 
					THEN characters.hp
					ELSE characterInstances.hp
				END AS hp,
				CASE WHEN characterInstances.spriteCounts IS NULL 
					THEN characters.spriteCounts
					ELSE characterInstances.spriteCounts
				END AS spriteCounts,
				CASE WHEN characterInstances.spriteSheet IS NULL
					THEN characters.spriteSheet
					ELSE characterInstances.spriteSheet
				END AS spriteSheet
			FROM characterInstances
			LEFT JOIN characters
				ON characterInstances.character_id=characters.id");
		if ($result) {
			while($row = $result->fetch_array(MYSQL_ASSOC)) {
				$myArray[] = $row;
			}
			echo json_encode($myArray);
			$result->close();
		}
	}
	
	function getActionsFor($characterId) {
		$myArray = array();
		$result = $GLOBALS['mysqli']->query(
			"SELECT
				actions.id AS id, 
				actions.name AS name,
				actions.description AS description,
				actions.category AS category,
				(actions.duration * weapons.duration / 100) AS duration,
				(actions.damage * weapons.damage / 100) AS damage,
				actions.attackMomentum AS attackMomentum,
				actions.moveMomentum AS moveMomentum,
				CASE WHEN actions.animation IS NULL
					THEN weapons.animation
					ELSE actions.animation
				END AS animation
			FROM actions
			INNER JOIN characters_actions
				ON characters_actions.action_id=actions.id
			INNER JOIN characters
				ON characters_actions.character_id=characters.id
			INNER JOIN characterInstances
				ON characters.id=characterInstances.character_id
			LEFT JOIN weapons
				ON characters.weapon_id=weapons.id
			WHERE characterInstances.id=".$characterId
		);
		if ($result) {
			while($row = $result->fetch_array(MYSQL_ASSOC)) {
				$myArray[] = $row;
			}
			echo json_encode($myArray);
			$result->close();
		}
	}
	
	function getAll($table) {
		$myArray = array();
		if ($result = $GLOBALS['mysqli']->query("SELECT * FROM " . $table)) {
			while($row = $result->fetch_array(MYSQL_ASSOC)) {
				$myArray[] = $row;
			}
			echo json_encode($myArray);
		}
		$result->close();
	}
	
	$request = $_REQUEST["request"];
	if ($request == 'populate') {
		populate();
	}
	else if ($request == 'getAllCharacterInstances') {
		#getAll('characters');
		getAllCharacterInstances();
	}
	else if ($request == 'getActionFor') {
		getActionsFor($_REQUEST["characterId"]);
	}
	mysqli_close($GLOBALS['mysqli']);
?>