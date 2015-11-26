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
			#characterInstances.id AS id,
			#characterInstances.character_id AS character_id,
			#characterInstances.posX AS posX,
			#characterInstances.posY AS posY,
			#characterInstances.posZ AS posZ,
			"SELECT *,
				CASE WHEN characterInstances.name IS NULL 
					THEN characters.name
					ELSE characterInstances.name
				END AS name,
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
	else if ($request == 'getAll') {
		#getAll('characters');
		getAllCharacterInstances();
	}
	mysqli_close($GLOBALS['mysqli']);
?>