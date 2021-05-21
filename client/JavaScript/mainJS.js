window.addEventListener("load", function(){
		
		/*this is the event listener that is used for the search bar for GET*/
		document.querySelector("#searchReviewForm").addEventListener("submit", searchReviewForm);
		/*this is the event listener that is used for the send bar for POST*/
		document.querySelector("#writenReviewForm").addEventListener("submit", sendReviewForm);
		/*this is the event listener that is used for the send bar for posting comments*/
		document.querySelector("#commentForm").addEventListener("submit", sendCommentForm);
		/*this is the event listener that is used for the send bar for POSTing login details*/
		document.querySelector("#loginForm").addEventListener("submit", loginForm);
		/*this is the event listener that is used for the send bar for POSTing sign up details*/
		document.querySelector("#signupForm").addEventListener("submit", signupForm);
		/*thisis to test opening a page dynamically for a review*/
		//document.querySelector("#opForm").addEventListener("submit", openpage);
	});

	/*function openpage(evt){
		evt.preventDefault();
		var o = window.open("");
		o.document.write("<html><head><title>MyTitle</title></head><body>test</body></html>");
	}*/

	/*this is the main function for getting a review from the database*/
	function searchReviewForm(evt){
		/*prevents the browser form submitting so it can be checked*/
		evt.preventDefault();
		/*this is for when the user presses the buttin the old results are hidden*/
		document.querySelector("#searchReviewResults").classList.add("hide");
		document.querySelector("#choosenResult").classList.add("hide");
		/*document.querySelector("#send_error").classList.add("hide");*/
		/*get value from the review search bar*/
		var search = document.querySelector("#search").value.trim();
		/*make the search compatiable for the API*/
		var searchFriendly = search.split(' ').join('+');
		/*gets field error message if the input is invalid*/
		/*var email_hint = document.querySelector("#email_error");*/
		/*used to test field values*/
		var search_ok = true;
		/*if the search value that is entered is not valid then a 
		hint/error message is dispayed to the user */
		/*if (search.length == 0){
			search_error.classList.remove("hide");
			search_ok = false;
		}else{
			search_error.classList.add("hide");
		}*/
		/*used to see if the search value is valid and able to be used*/
		if (search_ok == true) {
			/*used to hide the results when a new search value is entered*/
			document.querySelector("#searchReviewResults").classList.add("hide");
			/*used to hide the results message when a new search value is entered*/
			document.querySelector("#choosenResult").classList.add("hide");
			/*used to show the loading gif when a new/search item has been entered*/
			document.querySelector("#loading").classList.remove("hide");
			/*this clears the results div content so the new search is the 
			first content in the results*/
			document.querySelector("#searchReviewResults").innerHTML = "";

		/*this is where the xmlhttprequest starts and then the search 
		url is created using the code below, method=1 is so the api can use the appropriate GET method*/
		let xhr = new XMLHttpRequest();
		let url = "https://ob273.brighton.domains/CI601Project/server/api.php?var1=1&var2="
		url = url + searchFriendly; 
		xhr.addEventListener("load", function(){

		/*this piece is used to check if the the search is valid and able 
		to get back results and then the results are then looped using a 
		for loop, then default values are applied and then overwritten if 
		if the search result are valid and correct*/
		if (xhr.status == 200 && xhr.readyState == 4) {
			console.log(xhr.responseText);
			/*for (c = 0; c<10; c+=2) {
				console.log(c);
			}*/
			//console.log(JSON.parse(xhr.responseText));
			/*this allocats the values to variables to be later used to show in the main page*/
			let i, result, results = JSON.parse(xhr.responseText);
			for(i = 0; i < results.reView.length; i+=2){
				result = results.reView[i];

				let reviewID = "Not Given";
				if (result.reviewID > 0){
					reviewID = result.reviewID
				}
				let userID = "Not Given";
				if (result.userID > 0){
					userID = result.userID
				}
				let username = "Not Given";
				if (result.username.length > 0){
					username = result.username
				}
				let reviewTitle = "Not Given";
				if (result.reviewTitle.length > 0){
					reviewTitle = result.reviewTitle
				}
				let platform = "Not Given";
				if (result.platform.length > 0){
					platform = result.platform
				}
				let gameTitle = "Not Given";
				if (result.gameTitle.length > 0){
					gameTitle = result.gameTitle
				}
				let rating = "Not Given";
				if (result.rating > 0){
					rating = result.rating
				}
				let difficulty = "Not Given";
				if (result.difficulty > 0){
					difficulty = result.difficulty
				}
				let hoursPlayed = "Not Given";
				if (result.hoursPlayed > 0){
					hoursPlayed = result.hoursPlayed
				}
				let recommend = "Not Given";
				if (result.recommend.length > 0){
					recommend = result.recommend
				}
				let tags = "Not Given";
				if (result.tags.length > 0){
					tags = result.tags
				}
				let summary = "Not Given";
				if (result.summary.length > 0){
					summary = result.summary
				}
				let review = "Not Given";
				if (result.review.length > 0){
					review = result.review
				}
				let numComments = "Not Given";
				if (result.numComments >= 0){
					numComments = result.numComments
				}
				comment1 = [];
				if(numComments>0){
					comment1.push(results.reView[i+1][0].comment +"  ");
				} else {
					comment1.push("Not Given");
				}
				/*if(results.reView[i+1][0].comment == undefined){
					comment1 = comment1.push("Not Given");
				}else {
					comment1.push(results.reView[i+1][0].comment +"  ");
				}*/
				/*if (results.reView[i+1][i].comment.length > 0){
					for (d = 0; d < results.reView.length; d++){
						comment.push(results.reView[i+1][d].comment +"  ");
					}
					comment.push(results.reView[i+1][0].comment +"  ");
					//comment = results.reView[i+1][i].comment
				} else {
					let comment = comment.push("Not Given");
				}*/


				/*when the data has been set then the laoding div is hidden*/
				document.querySelector("#loading").classList.add("hide");
				/*the results div is shown when the results are ready*/
				document.querySelector("#searchReviewResults").classList.remove("hide");
				/*the search results message is shown when the results are ready 
				to be displayed*/
				document.querySelector("#choosenResult").classList.remove("hide");
				/*used to clear the search bar content to allow the user to enter
				new entrys*/
				document.querySelector("#search").value = "";

				/*creates a div for the results to be put inside and class
				for the contents to be styled*/
				let pDiv = document.createElement("div");
				pDiv.setAttribute("id", "resultDiv");
				pDiv.setAttribute("class", "looks");

				/*this is where the paragraph elements are made dynamically 
				with the corresponding attribute for the data of each 
				record present in the json file*/
				let pUserID = document.createElement("p");
				pUserID.setAttribute("id", "resultUserID");
				pUserID.textContent = "UserID : " + userID;
				pDiv.appendChild(pUserID);

				let pReviewID = document.createElement("p");
				pReviewID.setAttribute("id", "resultReviewID");
				pReviewID.textContent = "ReviewID : " + reviewID;
				pDiv.appendChild(pReviewID);

				let pUsername = document.createElement("p");
				pUsername.setAttribute("id", "resultUsername");
				pUsername.textContent = "Username : " + username;
				pDiv.appendChild(pUsername);

				let pReviewTitle = document.createElement("p");
				pReviewTitle.setAttribute("id", "resultReviewTitle");
				pReviewTitle.textContent = "Review Title : " + reviewTitle;
				pDiv.appendChild(pReviewTitle);

				let pPlatform = document.createElement("p");
				pPlatform.setAttribute("id", "resultPlatform");
				pPlatform.textContent = "Platform : " + platform;
				pDiv.appendChild(pPlatform);

				let pGameTitle = document.createElement("p");
				pGameTitle.setAttribute("id", "resultGameTitle");
				pGameTitle.textContent = "Game Title : " + gameTitle;
				pDiv.appendChild(pGameTitle);

				let pRating = document.createElement("p");
				pRating.setAttribute("id", "resultRatinge");
				pRating.textContent = "Rating : " + rating + "/10";
				pDiv.appendChild(pRating);

				let pDifficulty = document.createElement("p");
				pDifficulty.setAttribute("id", "resultDifficulty");
				pDifficulty.textContent = "Difficulty : " + difficulty + "/10";
				pDiv.appendChild(pDifficulty);

				let pHoursPlayed = document.createElement("p");
				pHoursPlayed.setAttribute("id", "resultHoursPlayed");
				pHoursPlayed.textContent = "Hours Played : " + hoursPlayed + " Hours";
				pDiv.appendChild(pHoursPlayed);

				let pRecommend = document.createElement("p");
				pRecommend.setAttribute("id", "resultRecommend");
				pRecommend.textContent = "Recommend : " + recommend;
				pDiv.appendChild(pRecommend);

				let pTags = document.createElement("p");
				pTags.setAttribute("id", "resultTags");
				pTags.textContent = "Tags : " + tags;
				pDiv.appendChild(pTags);

				let pSummary = document.createElement("p");
				pSummary.setAttribute("id", "resultSummary");
				pSummary.textContent = "Summary : " + summary;
				pDiv.appendChild(pSummary);

				let pReview = document.createElement("p");
				pReview.setAttribute("id", "resultReview");
				//pReview.setAttribute("class", "hide");
				pReview.textContent = "Review : " + review;
				pDiv.appendChild(pReview);

				let pNumComments = document.createElement("p");
				pNumComments.setAttribute("id", "resultNumComments");
				pNumComments.textContent = "Number of Comments : " + numComments;
				pDiv.appendChild(pNumComments);

				let pComments = document.createElement("p");
				pComments.setAttribute("id", "resultComments");
				pComments.textContent = "Comments : " + comment1;
				pDiv.appendChild(pComments);

				/*let pCommentDiv = document.createElement("div");
				pCommentDiv.setAttribute("id", "commentDiv");
				//pCommentDiv.setAttribute("class", "looks");
				let pCommentForm = document.createElement("form");
				pCommentForm.setAttribute("id", "commentForm");
				//pCommentForm.setAttribute("class", "looks");
				let pCommentLabelRL = document.createElement("label");
				pCommentLabelRL.setAttribute("for", "reviewID");
				let pCommentLabelRI = document.createElement("input");
				pCommentLabelRI.setAttribute("type", "text");
				pCommentLabelRI.setAttribute("id", "reviewID");
				pCommentLabelRI.setAttribute("name", "reviewID");
				pCommentLabelRI.setAttribute("value", reviewID);

				let pCommentLabelUL = document.createElement("label");
				pCommentLabelUL.setAttribute("for", "username");
				let pCommentLabelUI = document.createElement("input");
				pCommentLabelUI.setAttribute("type", "text");
				pCommentLabelUI.setAttribute("id", "username");
				pCommentLabelUI.setAttribute("name", "username");
	
				let pCommentLabelCL = document.createElement("label");
				pCommentLabelCL.setAttribute("for", "comment");
				let pCommentLabelCI = document.createElement("input");
				pCommentLabelCI.setAttribute("type", "text");
				pCommentLabelCI.setAttribute("id", "comment");
				pCommentLabelCI.setAttribute("name", "comment");

				let pGetComments = document.createElement("button");
				pGetComments.setAttribute("type", "submit");
				pGetComments.setAttribute("id", ("sendComments"+i));
				pGetComments.textContent = "Send Comment";
				pCommentForm.appendChild(pCommentLabelRL);
				pCommentForm.appendChild(pCommentLabelRI);
				pCommentForm.appendChild(pCommentLabelUL);
				pCommentForm.appendChild(pCommentLabelUI);
				pCommentForm.appendChild(pCommentLabelCL);
				pCommentForm.appendChild(pCommentLabelCI);
				pCommentForm.appendChild(pGetComments);
				pCommentDiv.appendChild(pCommentForm);
				pDiv.appendChild(pCommentDiv);*/
				

  				/*this allows the div that is made dynamically to be added
  				to the existing results div in the html file*/
				let mainDiv = document.querySelector("#searchReviewResults"); 
  				mainDiv.appendChild(pDiv); 
  				document.querySelector("#searchReviewResults1").classList.remove("hide");

			}
			/*this is the code needed to allow the user to know if what 
			they have typed is not a value in the database
			i have to first creat a paragragh element in the results div 
			and then input the data that needs to be displayed and then it
			is appended to the div. */
			if (results.reView.length == 0){
				let errorCheck = document.querySelector("#searchReviewResults");
				let msgError = document.createElement("p");
				let msgError2 = document.createElement("p");
				msgError.innerText = "Sorry, this doesn't match any existing reviews.";
				msgError2.innerText= "Please try a seperate search term."
				errorCheck.appendChild(msgError);
				errorCheck.appendChild(msgError2);
			}
		}else{
			/*if there is an error with the webpage a message will be displayed 
			showing the status error code to the user*/
			let errorCheck = document.querySelector("#results");
			let msgError = document.createElement("p");
			switch(xhr.status){
				case 204:
				msgError.textContent = "Sorry, no review found with this name, please try another review.";
				break;
				case 400:
				msgError.textContent = "Sorry, somthing doesn't seem right, please try again.";
				break;
				default:
				msgError.textContent = "Sorry, please try again."; 
			}
			/*errorCheck.appendChild(msgError);*/
			/*when the response has been set the appropriate divs are hidden and shown*/
			/*document.querySelector("#loading").classList.add("hide");
			document.querySelector("#results").classList.remove("hide");
			document.querySelector("#searchResults").classList.remove("hide");
			document.querySelector("#search").value = "";*/
		}
		
		});
		xhr.open("GET", url, true);
		xhr.send();
		}
	}

	/*this is the main function for sending a review to the database*/
	function sendReviewForm(evt){
		/*prevents the browser form submitting so it can be checked*/
		evt.preventDefault();
		/*if a uplaod was made before this part will remove the results if the input is incorerct the second time */
		document.querySelector("#sendResults").classList.add("hide");
		document.querySelector("#results").classList.add("hide");
		
		/*used to test field values*/
		let review_ok = true;
		let check_ok = true;
		/*variables set to check if values are set and correct data type*/
		let usernameCheck = document.querySelector("#username").value.trim();
		let reviewTitleCheck = document.querySelector("#reviewTitle").value.trim();
		let platformCheck = document.querySelector("#platform").value.trim();
		let gameTitleCheck = document.querySelector("#gameTitle").value.trim();
		let ratingCheck = parseInt(document.querySelector("#rating").value.trim());
		let difficultyCheck = parseInt(document.querySelector("#difficulty").value.trim());
		let hoursPlayedCheck = parseInt(document.querySelector("#hoursPlayed").value.trim());
		let recommendCheck = document.querySelector("#recommend").value.trim();
		let tagsCheck = document.querySelector("#FPS").value.trim();
		let summaryCheck = document.querySelector("#summary").value.trim();
		let reviewCheck = document.querySelector("#review").value.trim();

		if ((usernameCheck.length > 0) && (reviewTitleCheck.length > 0) &&
			(platformCheck.length > 0) &&(gameTitleCheck.length > 0) &&
			(Number.isInteger(ratingCheck)) && (Number.isInteger(difficultyCheck)) && 
			(Number.isInteger(hoursPlayedCheck)) && (recommendCheck.length > 0) &&
			(tagsCheck.length > 0) && (summaryCheck.length > 0) &&
			(reviewCheck.length > 0)){

			//set the values for the body for the POST to send
			let username = 'username=' + encodeURIComponent(document.querySelector("#username").value.trim());
			let reviewTitle = 'reviewTitle=' + encodeURIComponent(document.querySelector("#reviewTitle").value.trim());
			let platform = 'platform=' + encodeURIComponent(document.querySelector("#platform").value.trim());
			let gameTitle = 'gameTitle=' + encodeURIComponent(document.querySelector("#gameTitle").value.trim());
			let rating = 'rating=' + encodeURIComponent(document.querySelector("#rating").value.trim());
			let difficulty = 'difficulty=' + encodeURIComponent(document.querySelector("#difficulty").value.trim());
			let hoursPlayed = 'hoursPlayed=' + encodeURIComponent(document.querySelector("#hoursPlayed").value.trim());
			let recommend = 'recommend=' + encodeURIComponent(document.querySelector("#recommend").value.trim());
			let tags = 'tags=' + encodeURIComponent(document.querySelector("#FPS").value.trim());
			let summary = 'summary=' + encodeURIComponent(document.querySelector("#summary").value.trim());
			let review = 'review=' + encodeURIComponent(document.querySelector("#review").value.trim());
			/*var used for global scope otherwise send cannot send undefined*/
			var givenReview = username+"&"+reviewTitle+"&"+platform+"&"+gameTitle+"&"+rating+"&"+difficulty+
			"&"+hoursPlayed+"&"+recommend+"&"+tags+"&"+summary+"&"+review;
		} else {
			/*if checks not ok then false is set*/
			check_ok = false;
		}
		/*gets field error message if the input is invalid*/
		//let email_hint = document.querySelector("#email_error");
		/*if the input values that are entered are not valid then a 
		hint/error message is dispayed to the user */
		if (check_ok == false){
			//send_error.classList.remove("hide");
			review_ok = false;
		}else {
			//send_error.classList.add("hide");
		}
		/*used to see if the input values are valid and able to be sent*/
		if (review_ok == true) {
			/*used to hide the results when a new search value is entered*/
			//document.querySelector("#results").classList.add("hide");
			/*used to hide the results message when a new search value is entered*/
			document.querySelector("#searchResults").classList.add("hide");
			/*used to show the loading gif when a new/search item has been entered*/
			document.querySelector("#loading").classList.remove("hide");
			/*this clears the results div content so the new search is the 
			first content in the results*/
			document.querySelector("#results").innerHTML = "";
		
		/*this is where the xmlhttprequest starts and then the POST 
		url is created using the code below*/
		let xhr = new XMLHttpRequest();
		let url = "https://ob273.brighton.domains/CI601Project/server/api.php?var1=1"
		xhr.addEventListener("load", function(){
		/*this section is used to check if the POST is valid and able 
		to send the body to the api and then the responses are then displayed and shown to the 
		user*/
		if (xhr.status == 201 && xhr.readyState == 4) {

			let reviewID = xhr.responseText;
			document.querySelector("#loading").classList.add("hide");
			//document.querySelector("#results").classList.remove("hide");
			document.querySelector("#sendResults").classList.remove("hide");

			/*creates a div for the response to be put inside and class
			for the contents to be styled*/
			let pDiv = document.createElement("div");
			pDiv.setAttribute("id", "resultDiv");
			pDiv.setAttribute("class", "looks");

			/*this is where the paragraph elements are made dynamically 
			with the corresponding attribute for the data of each field for the review*/

			let pUsername = document.createElement("p");
			pUsername.setAttribute("id", "resultUsername");
			pUsername.textContent = "Username : " + document.querySelector("#username").value.trim();
			pDiv.appendChild(pUsername);

			let pReviewTitle = document.createElement("p");
			pReviewTitle.setAttribute("id", "resultReviewTitle");
			pReviewTitle.textContent = "Review Title : " + document.querySelector("#reviewTitle").value.trim();
			pDiv.appendChild(pReviewTitle);

			let pPlatform = document.createElement("p");
			pPlatform.setAttribute("id", "resultPlatform");
			pPlatform.textContent = "Platform : " + document.querySelector("#platform").value.trim();
			pDiv.appendChild(pPlatform);

			let pGameTitle = document.createElement("p");
			pGameTitle.setAttribute("id", "resultGameTitle");
			pGameTitle.textContent = "Game Title : " + document.querySelector("#gameTitle").value.trim();
			pDiv.appendChild(pGameTitle);

			let pRating = document.createElement("p");
			pRating.setAttribute("id", "resultRatinge");
			pRating.textContent = "Rating : " + document.querySelector("#rating").value.trim() + "/10";
			pDiv.appendChild(pRating);

			let pDifficulty = document.createElement("p");
			pDifficulty.setAttribute("id", "resultDifficulty");
			pDifficulty.textContent = "Difficulty : " + document.querySelector("#difficulty").value.trim() + "/10";
			pDiv.appendChild(pDifficulty);

			let pHoursPlayed = document.createElement("p");
			pHoursPlayed.setAttribute("id", "resultHoursPlayed");
			pHoursPlayed.textContent = "Hours Played : " + document.querySelector("#hoursPlayed").value.trim() + " Hours";
			pDiv.appendChild(pHoursPlayed);

			let pRecommend = document.createElement("p");
			pRecommend.setAttribute("id", "resultRecommend");
			pRecommend.textContent = "Recommend : " + document.querySelector("#recommend").value.trim();
			pDiv.appendChild(pRecommend);

			let pTags = document.createElement("p");
			pTags.setAttribute("id", "resultTags");
			pTags.textContent = "Tags : " + document.querySelector("#FPS").value.trim();
			pDiv.appendChild(pTags);

			let pSummary = document.createElement("p");
			pSummary.setAttribute("id", "resultSummary");
			pSummary.textContent = "Summary : " + document.querySelector("#summary").value.trim();
			pDiv.appendChild(pSummary);

			let pReview = document.createElement("p");
			pReview.setAttribute("id", "resultReview");
			pReview.textContent = "Review : " + document.querySelector("#review").value.trim();
			pDiv.appendChild(pReview);
			
			/*this allows the div that is made dynamically to be added
			to the existing results div in the html file*/
			let mainDiv = document.querySelector("#sendResults"); 
			mainDiv.appendChild(pDiv); 
			/*reset the form so that user can enter more data without erasing the previous set*/
			document.getElementById("writenReviewForm").reset();

		}else{
			/*if there is an error with the webpage a message will be displayed 
			showing the status error code to the user*/
			let errorCheck = document.querySelector("#sendResults");
			let msgError = document.createElement("p");
			msgError.innerText = "Sorry, Somthing doesn't seem corerct, please try again.";
			errorCheck.appendChild(msgError);
			document.querySelector("#sendResults").classList.add("hide");
			document.querySelector("#loading").classList.add("hide");
			document.querySelector("#sendResults").classList.remove("hide");
			document.getElementById("sendForm").reset();
		}
		
		});
		/*this is where the body of the POST is sent to the API*/
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(givenReview);
		}
	}

	/*this is the main function to write a comment to the database for a review*/
	function sendCommentForm(evt){
		/*prevents the browser form submitting so it can be checked*/
		evt.preventDefault();
		check_ok = true;
		comment_ok = true;
		/*given data is trimed to get it ready to check against the database*/
		let reviewIDCheck = document.querySelector("#reviewID").value.trim();
		let usernameCheck = document.querySelector("#username").value.trim();
		let comemntCheck = document.querySelector("#comment").value.trim();

		if ((reviewIDCheck.length > 0) && (usernameCheck.length > 0) &&
			(comemntCheck.length > 0) ){
			//&&(Number.isInteger(reviewIDCheck))

			//set the values for the body for the POST to send
			let reviewID = 'reviewID=' + encodeURIComponent(document.querySelector("#reviewID").value.trim());
			let username = 'username=' + encodeURIComponent(document.querySelector("#username").value.trim());
			let comment = 'comment=' + encodeURIComponent(document.querySelector("#comment").value.trim());
			/*var used for global scope otherwise send cannot send undefined*/
			var givenComment = reviewID+"&"+username+"&"+comment;
		} else {
			/*if checks not ok then false is set*/
			check_ok = false;
		}
		if (check_ok == false){
			//send_error.classList.remove("hide");
			comment_ok = false;
		}else {
			//send_error.classList.add("hide");
		}
		/*used to see if the input values are valid and able to be sent*/
		if (comment_ok == true) {
			/*used to hide the results when a new search value is entered*/
			//document.querySelector("#results").classList.add("hide");
			/*used to hide the results message when a new search value is entered*/
			//document.querySelector("#searchResults").classList.add("hide");
			/*used to show the loading gif when a new/search item has been entered*/
			//document.querySelector("#loading").classList.remove("hide");
			/*this clears the results div content so the new search is the 
			first content in the results*/
			//document.querySelector("#results").innerHTML = "";
		
		/*this is where the xmlhttprequest starts and then the POST 
		url is created using the code below*/
		let xhr = new XMLHttpRequest();
		let url = "https://ob273.brighton.domains/CI601Project/server/api.php?var1=4"
		xhr.addEventListener("load", function(){
		/*this section is used to check if the POST is valid and able 
		to send the body to the api and then the responses are then displayed and shown to the 
		user*/
		if (xhr.status == 201 && xhr.readyState == 4) {

			let commentID = xhr.responseText;
			/*reset the form so that user can enter more data without erasing the previous set*/
			document.getElementById("commentForm").reset();

			let sendStatusCheck = document.getElementById("sendResults");
			let sendStatusMsg = document.createElement("p");
			sendStatusMsg.textContent = "Your Comment has been Uploaded, Thank you for your input.";
			sendStatusCheck.appendChild(sendStatusMsg);


		}else{
			/*if there is an error with the webpage a message will be displayed 
			showing the status error code to the user*/
			let errorCheck = document.getElementById("sendResults");
			let msgError = document.createElement("p");
			msgError.innerText = "Sorry, Somthing doesn't seem corerct, please try again.";
			errorCheck.appendChild(msgError);
			document.querySelector("#sendResults").classList.add("hide");
			document.querySelector("#loading").classList.add("hide");
			document.querySelector("#sendResults").classList.remove("hide");
			document.getElementById("sendForm").reset();
		}
		
		});
		/*this is where the body of the POST is sent to the API*/
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(givenComment);
		}
	}

	/*this is the main function to login into the website*/
	function loginForm(evt){
		/*prevents the browser form submitting so it can be checked*/
		evt.preventDefault();
		loggedin = false;
		username_ok = false;
		password_ok = false;
		/*trim values to check against values stored in database*/
		let usernameCheck = document.querySelector("#username").value.trim();
		let passwordCheck = document.querySelector("#password").value.trim();
		if ((usernameCheck.length > 0) && (passwordCheck.length > 0)){
			let username = 'username=' + encodeURIComponent(document.querySelector("#username").value.trim());
			let password = 'password=' + encodeURIComponent(document.querySelector("#password").value.trim());
			username_ok = true;
			password_ok = true;
			var givenLogin = username+"&"+password;
		}
		if (username_ok == true & password_ok == true){
			let xhr = new XMLHttpRequest();
			let url = "https://ob273.brighton.domains/CI601Project/server/api.php?case=2"


			/*this is where the body of the POST is sent to the API*/
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(givenLogin);
		}
	}

	/*this is the main function to write a comment to the database for a review*/
	function signupForm(evt){
		/*prevents the browser form submitting so it can be checked*/
		evt.preventDefault();
		username_ok = false;
		password_ok = false;
		reconfirm_password_ok = false;

	}