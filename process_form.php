<html>
  <head>
	<title>Password test, page 2</title>
  <head>

  <body>
	<?php 
		 $usr  = $_POST['createusr'];

		 //read the contents of our password file.
		 $myFile = "data.txt";
		 
		$final_array = array();
		foreach ($myFile as $row) {
			$temp_array = explode(':', $row);
			$final_array[$temp_array[0]] = (int)$temp_array[1];
		}
		arsort($final_array, SORT_NUMERIC);
		
		foreach ($final_array as $name => $score) {
			echo $name . ' got a ' . (string)$score;
		}
	  ?>	
		<br>
  
  </body>
</html>