<?php
	/**
	 * this is the main class that has all the methods/functions needed to run the api that i have created for the reviews
	 */

	class myapi 
	{	
		//I have set the database credentials in the class to make testing errors and error handeling, making changes more convenient for developers or debuging
		// change the database from test to the actual one
		private $servername = "localhost";
		//private $database = "ob273_CI601_Project_test";
		private $database = "ob273_CI601_Project";
		private $username = "ob273_user1";
		private $password = "thisisapain";
		//status code set to 200, so if an error occurs it is changed in the correct area
		private $statuscode = 200;
		//My database connection variable so i can call it in any method that requires access
		private $myDatabase = null;

		//this is the construct method that is used to make the first connection with the database
		function __construct()
		{
			$this->myDatabase = new mysqli($this->servername, $this->username, $this->password, $this->database);
			if ($this->myDatabase->connect_error){
				echo "Connection failed: " . $this->myDatabase->connect_error;
				$this->statuscode = 500;
			}
		}

		//this is the destruct method that is used to close the connection to the database
		function __destruct()
		{
			$this->myDatabase->close();
		}

		//This method is used to see if the user is getting data from the database with a GET request or setting data to the database using a POST request, it is also used to sanitise the inputs given from the user before being handed off to the set and get methods.
		//real_escape_string is not used as the prepare function does checking and handeling for the sql query
		public function handleRequest(){
			$method = $_SERVER['REQUEST_METHOD'];
			//If the request is a GET for getting data out of the databse
			if ($method == 'GET'){
				$case = $_GET['var1'];
				/*switch to allow for multiple request to be handled from 1 JavaScript page*/
				switch ($case) {
					case 1:
						$reviewTitle = $_GET['var2'];
						//echo $case;
						//echo $reviewTitle;
						//echo '<script>console.log('+$reviewTitle+'); </script>';
						/*validating values sent by JavaScript*/
						if (isset($reviewTitle)) {
							if((strlen($reviewTitle) > 0 && strlen($reviewTitle) <= 512)){
								$this->getReviewData($reviewTitle);
							} else {
								//If the imput is invalid for length or type
								$this->statuscode =400;
								//echo '<script>console.log("If the imput is invalid for length or type"); </script>';
							}
						} else {
							//If the required parameter has not been given
							$this->statuscode = 400;
							//echo '<script>console.log("If the required parameter has not been given"); </script>';
							
						}
						break;
					case '2':
						# code...
						break;
					default:
						//echo '<script>console.log("switch not working"); </script>';
						break;
				}
			//If the request is a POST for setting data to the databse
			} elseif ($method == 'POST'){//post method closed
				$case = $_GET['var1'];
				//echo "post: ";
				//echo $case;
				/*switch to allow for multiple request to be handled from 1 JavaScript page*/
				switch ($case) {
					//set review
					case 1:
						//echo "writing: ";
						/*Setting values to variable to be checked and validated*/
						$username = $_POST['username'];
						$reviewTitle = $_POST['reviewTitle'];
						$platform = $_POST['platform'];
						$gameTitle = $_POST['gameTitle'];
						$rating = intval($_POST['rating']);
						$difficulty = intval($_POST['difficulty']);
						$hoursPlayed = intval($_POST['hoursPlayed']);
						$recommend = $_POST['recommend'];
						$tags = $_POST['tags'];
						$summary = $_POST['summary'];
						$review = $_POST['review'];
						/*if used to make sure the data is the correct type and length*/
						if(isset($username) && isset($reviewTitle) && isset($platform) && isset($gameTitle) && isset($rating) && is_int($rating) && isset($difficulty) && is_int($difficulty) && isset($hoursPlayed) && is_int($hoursPlayed) &&isset($recommend) && isset($tags) && isset($summary) && isset($review)){
							//echo "is set: ";
							/*if used to sterilize the data*/
							if ((strlen($username) > 0 && strlen($username) <=64) && 
								(strlen($reviewTitle) > 0 && strlen($reviewTitle) <=512) && 
								(strlen($platform) > 0 && strlen($platform) <= 11) && 
								(strlen($gameTitle) > 0 && strlen($gameTitle) <=32) &&
								(strlen((string)$rating) > 0 && strlen((string)$rating) <=11) &&
								(strlen((string)$difficulty) > 0 && strlen((string)$difficulty) <=11) &&
								(strlen((string)$hoursPlayed) > 0 && strlen((string)$hoursPlayed) <=11) &&
								(strlen($recommend) > 0 && strlen($recommend) <=32) &&
								(strlen($tags) > 0 && strlen($tags) <=128) &&
								(strlen($summary) > 0 && strlen($summary) <=2000) &&
								(strlen($review) > 0)){
								$username1 = $username;
								//echo "username1: ";
								//echo $username1;
								//echo gettype($username1);
								/*used to get userID for the review so the user can comment on the review*/
								$result3 = $this->myDatabase->prepare("SELECT userID FROM users WHERE username LIKE '%".$username1."%'");
								//echo "r3: ";
								//echo gettype($result3);
								$result3->bind_Param('s', $username1);
								$result3->execute();
								$result3 = $result3->get_result();
								if($result3){
									if($result3->num_rows > 0){
										$UserID = array();
										for ($i=0; $i < $result3->num_rows; $i++) { 
											$row = $result3->fetch_assoc();
											$row1 = array_values($row);
											array_push($UserID, $row1[0]);
										}
										$userID1 = $UserID[0];
									}
								}
								$userID = $userID1;
								//echo $userID1;
								//echo gettype($userID1);
								/*used to set data to the database*/
								$this->setReviewData($userID,$username,$reviewTitle,$platform,$gameTitle,$rating,$difficulty,$hoursPlayed,$recommend,$tags,$summary,$review);
							} else {
								//If one or more imput(s) is invalid for length or type
								$this->statuscode= 400;
								//used to see which issues i was having with the post method
								//echo "invalid input";
							}
						} else {
							//If one or more parameter(s) have not been given
							$this->statuscode= 400;
							//used to see which issues i was having with the post method
							//echo "parameter not set";
						}
						/*for the login function*/
					case 2:
						/*setting data to variables to validate */
						$username = $_POST['username'];
						$password = $_POST['password'];
						if(isset($username) && isset($password)){
							if ((strlen($username) > 0 && strlen($username) <=64) && 
								(strlen($reviewTitle) > 0 && strlen($reviewTitle) <=60)) {
								$this->getLoggedIn($username,$password);
							} else {
								//If one or more imput(s) is invalid for length or type
								$this->statuscode= 400;
							}
						} else {
							//If one or more parameter(s) have not been given
							$this->statuscode= 400;
						}
					case 3:
					//sign up 
					/*used to upload comments to their corresponding reviews*/
					case 4:
					//comments
					$reviewID = intval($_POST['reviewID']);
					$username = $_POST['username'];
					$comment = $_POST['comment'];
					if(isset($reviewID) && is_int($reviewID) && isset($username) && isset($comment)){
						if ((strlen((string)$reviewID) > 0 && strlen((string)$reviewID) <=11) && 
								(strlen($username) > 0 && strlen($username) <=64) && 
								(strlen($comment) > 0 && strlen($comment) <=5000)) {
							$this->setCommentData($reviewID,$username,$comment);
						} else {
								//If one or more imput(s) is invalid for length or type
								$this->statuscode= 400;
								//used to see which issues i was having with the post method
								//echo "invalid input";
						}
					} else {
							//If one or more parameter(s) have not been given
							$this->statuscode= 400;
							//used to see which issues i was having with the post method
							//echo "parameter not set";
					}
				}
			} else {
				//If the request is not a GET or POST or PUT
				$this->statuscode = 400;
				echo '<script>console.log("If the request is not a GET or POST or PUT"); </script>';
				
			}
			//Used to show the appropriate http status code
			http_response_code($this->statuscode);
		}

		//This method is used to get the data from the database as the name suggests, the opropriate data values are retrived via the SELECT query and inputed into an array which is then converted into json
		//Prepare used as it is more secure and it is optimise a statement for repeated execution compared to query
		private function getReviewData($reviewTitle){
			$result = $this->myDatabase->prepare("SELECT reviewID,userID,username,reviewTitle,platform,gameTitle,rating,difficulty,hoursPlayed,recommend,tags,summary,review,numComments FROM reviews WHERE reviewTitle LIKE '%".$reviewTitle."%'");
			//echo gettype($result);
			$result->bind_Param('s', $reviewTitle);
			$result->execute();
			$result = $result->get_result();
			if($result){
				if($result->num_rows > 0){
					$reView = array();
					for ($i=0; $i < $result->num_rows; $i++) { 
						$row = $result->fetch_assoc();
						array_push($reView, $row);

						$result = $this->myDatabase->prepare("SELECT reviewID FROM reviews WHERE reviewTitle LIKE '%".$reviewTitle."%'");
						$result->bind_Param('s', $commentKey);
						$result->execute();
						$result = $result->get_result();
						for ($t=0; $t < $result->num_rows; $t++) { 
							//echo $t;
							$reviewID1 = $result->fetch_assoc();
							$reviewID2 = array_values($reviewID1);
							//echo ($reviewID2[0]);
							$reviewID3 = $reviewID2[0];
							$reviewID = $reviewID3;
							//echo gettype($reviewID3);
							//echo gettype($reviewID);
							$result1 = $this->myDatabase->prepare("SELECT comment FROM comments WHERE reviewID LIKE $reviewID");
							$result1->bind_Param('s', $reviewID1);
							$result1->execute();
							$result1 =$result1->get_result();
							$commentArray = array();
							for ($p=0; $p < $result1->num_rows; $p++) { 
							$comments = $result1->fetch_assoc();
							array_push($commentArray, $comments);
							}
							//array_push($reView, $commentArray);
						}
						array_push($reView, $commentArray);
					}

					$reViewObj = new stdClass();
					$reViewObj->reView = $reView;
					header('content-type: application/json');
					echo json_encode($reViewObj); 
				} else {
					/*if nothing is found*/
                	$this->statuscode = 204;
            	}
			} else {
            //If the SQL failed
            $this->statuscode = 400;
            echo '<script>console.log("If the SQL failed"); </script>';
        	} 
		}		

		//This is used to set review data to the database as the name suggests, the opropriate data values are set via the INSERT query and the id value is inputed in a object which is then converted into json
		//Prepare used as it is more secure and it is optimise a statement for repeated execution compared to query
		private function setReviewData($userID,$username,$reviewTitle,$platform,$gameTitle,$rating,$difficulty,$hoursPlayed,$recommend,$tags,$summary,$review){
			$stmt = $this->myDatabase->prepare("INSERT INTO reviews (userID,username,reviewTitle,platform,gameTitle,rating,difficulty,hoursPlayed,recommend,tags,summary,review) "
			. "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
			$stmt->bind_Param('ssssssssssss', $userID,$username,$reviewTitle,$platform,$gameTitle,$rating,$difficulty,$hoursPlayed,$recommend,$tags,$summary,$review);
			$stmt->execute();
			$reviewIDObj = new stdClass();
			$reviewIDObj->reviewID = $stmt->insert_reviewID;
			$this->statuscode = 201;
			http_response_code(201);
			echo json_encode($reviewIDObj);
		}
		
		//This is used to set comment data to the database as the name suggests, the opropriate data values are set via the INSERT query and the id value is inputed in a object which is then converted into json
		//Prepare used as it is more secure and it is optimise a statement for repeated execution compared to query
		private function setCommentData($reviewID,$username,$comment){
			$stmt = $this->myDatabase->prepare("INSERT INTO comments (reviewID,username,comment) "
			. "VALUES (?,?,?)");
			$stmt->bind_Param('sss', $reviewID,$username,$comment);
			$stmt->execute();
			$commentIDObj = new stdClass();
			$commentIDObj->commentID = $stmt->insert_commentID;
			$this->statuscode = 201;
			http_response_code(201);
			echo json_encode($commentIDObj);
		}

		//This function is for the user to log in to their account
		private function getLoggedIn($username,$password){
			$result = $this->myDatabase->prepare("SELECT username,password FROM users WHERE username LIKE $username");
			$result->bind_Param('s', $testResult);
			$result->execute();
			$result = $result->get_result();
			if($result){
				if($result->num_rows > 0){
					$logIn = array();
					for ($i=0; $i < $result->num_rows; $i++) { 
						$row = $result->fetch_assoc();
						array_push($LogIn, $row);
					}
					$dbLoginUsername = $logIn[0];
					$dbLoginPassword = $logIn[1];
					if ($dbLoginUsername == $username & $dbLoginPassword == $password){
						echo "you loggin in";
					} else {
						//username, password not right
            			echo "you didn't login, username or password incorrect";
					}
				}
			} else {
				//If the SQL failed
            	$this->statuscode = 400;
            	echo 'If the SQL failed';
			}	
		}

		//This function is for when the user wants to get comments for the review they are looking at
		private function getCommentData($reviewID){
			$result = $this->myDatabase->prepare("SELECT comment FROM comments WHERE reviewID LIKE $reviewID");
			$result->bind_Param('s', $reviewID);
			$result->execute();
			$result =$result->get_result();
			if($result){
				if($result->num_rows > 0){
					$reviewComment = array();
					for ($i=0; $i < $result->num_rows; $i++) { 
						$row = $result->fetch_assoc();
						array_push($reviewComment, $row);
					}
					$reviewComment = $reviewComment->fetch_assoc();
					return $reviewComment;
					/*$reviewCommentObj = new stdClass();
					$reviewCommentObj->reviewComment = $reviewComment;
					header('content-type: application/json');
					echo json_encode($reviewCommentObj);*/ 
				} else {
					/*if nothing is found*/
                	$this->statuscode = 204;
            	}
			} else {
            //If the SQL failed
            $this->statuscode = 400;
            echo "If the SQL failed 2";
        	} 
		}
		//This function is to get the userID for the when a review is being written then it needs to be linked in the database
		private function getUserID($username1){
			$result = $this->myDatabase->prepare("SELECT userID FROM users WHERE username LIKE $username1");
			$result->bind_Param('s', $username);
			$result->execute();
			$result = $result->get_result();
			if($result){
				if($result->num_rows > 0){
					$UserID = array();
					for ($i=0; $i < $result->num_rows; $i++) { 
						$row = $result->fetch_assoc();
						array_push($UserID, $row);
					}
					$userID = $UserID[0];
					echo "userid1:";
					echo $userID;
					return $userID;
				} else {
					/*if nothing is found*/
                	$this->statuscode = 204;
            	}
			}else {
	            //If the SQL failed
	            $this->statuscode = 400;
	            echo '<script>console.log("If the SQL failed"); </script>';
	        } 
		}

	}
	//Used to start the script
	$api = new myapi();
	$api->handleRequest();
?>