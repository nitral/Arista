var firstAdviceButton = document.getElementById("main-refresh-button");
var refreshAdvice = document.getElementById("refresh-advice");
var likeAdviceButton = document.getElementById("like-advice");

// Add Event Listeners
firstAdviceButton.addEventListener("click", pullFirstAdvice, false);
refreshAdvice.addEventListener("click", pullAdvice, false);
likeAdviceButton.addEventListener("click", likeAdvice, false);

function pullFirstAdvice() {
    document.getElementById("day-advice-refresh").style.display = "none";
    
    document.getElementById("notification").style.display = "block";
    document.getElementById("ajax-loading").style.display = "block";
    document.getElementById("fetch-message").style.display = "block";
    
    sendAJAXCallAndUpdate(currentActivePage);
}

function pullAdvice() {
    document.getElementById("day-advice-header").style.display = "none";
    document.getElementById("day-advice").style.display = "none";
    
    document.getElementById("notification").style.display = "block";
    document.getElementById("ajax-loading").style.display = "block";
    document.getElementById("fetch-message").style.display = "block";
    
    sendAJAXCallAndUpdate(currentActivePage);
}

function sendAJAXCallAndUpdate(pageID) {
    var adviceFetchXMLHttpRequest = new XMLHttpRequest({
	    mozSystem: true
    });
    
    var requestURL = "http://arista.netai.net/src/randadvice.php?q=" + getPageName(pageID) + "-day";
    
    adviceFetchXMLHttpRequest.onreadystatechange = function() {
	if (adviceFetchXMLHttpRequest.readyState == 4 && adviceFetchXMLHttpRequest.status == 200) {
		parseAndSetAdvice(pageID, adviceFetchXMLHttpRequest.responseText);
		
		document.getElementById("notification").style.display = "none";
		document.getElementById("ajax-loading").style.display = "none";
		document.getElementById("fetch-message").style.display = "none";
		
		updateAdviceSpace();
	}
    }
	
    adviceFetchXMLHttpRequest.open("GET", requestURL, true);
	
    adviceFetchXMLHttpRequest.send();
}

function parseAndSetAdvice(pageID, response) {
    var fieldSeparator = "^";
    var separatorIndex = -1;
    var secondSeparatorIndex = -1;
    
    for(i = 0; i < response.length; i++) {
	if (response.charAt(i) == '^') {
	    if (separatorIndex == -1) {
		separatorIndex = i;
	    } else if (secondSeparatorIndex == -1) {
		secondSeparatorIndex = i;
	    } else {
		break;
	    }
	}
    }
    
    var adviceID = response.substring(0, separatorIndex);
    var author = response.substring(separatorIndex + 1, secondSeparatorIndex);
    var advice = response.substring(secondSeparatorIndex + 1, response.length);
    
    switch (pageID) {
	case 1:
	    roseAdviceID = adviceID;
	    roseAdviceAuthor = author;
	    roseAdvice = advice;
	    break;
	case 2:
	    proposeAdviceID = adviceID;
	    proposeAdviceAuthor = author;
	    proposeAdvice = advice;
	    break;
	case 3:
	    chocolateAdviceID = adviceID;
	    chocolateAdviceAuthor = author;
	    chocolateAdvice = advice;
	    break;
	case 4:
	    teddyAdviceID = adviceID;
	    teddyAdviceAuthor = author;
	    teddyAdvice = advice;
	    break;
	case 5:
	    promiseAdviceID = adviceID;
	    promiseAdviceAuthor = author;
	    promiseAdvice = advice;
	    break;
	case 6:
	    hugAdviceID = adviceID;
	    hugAdviceAuthor = author;
	    hugAdvice = advice;
	    break;
	case 7:
	    kissAdviceID = adviceID;
	    kissAdviceAuthor = author;
	    kissAdvice = advice;
	    break;
	case 8:
	    valentineAdviceID = adviceID;
	    valentineAdviceAuthor = author;
	    valentineAdvice = advice;
	    break;
	default:
	    valentineAdviceID = adviceID;
	    valentineAdviceAuthor = author;
	    valentineAdvice = advice;
	    break;
    }
}

function likeAdvice() {
    switch (currentActivePage) {
	case 1:
	    sendLike(roseAdviceID);
	    break;
	case 2:
	    sendLike(proposeAdviceID);
	    break;
	case 3:
	    sendLike(chocolateAdviceID);
	    break;
	case 4:
	    sendLike(teddyAdviceID);
	    break;
	case 5:
	    sendLike(promiseAdviceID);
	    break;
	case 6:
	    sendLike(hugAdviceID);
	    break;
	case 7:
	    sendLike(kissAdviceID);
	    break;
	case 8:
	    sendLike(valentineAdviceID);
	    break;
	default:
	    sendLike(valentineAdviceID);
	    break;
	
    }
}

function sendLike(adviceID) {
    document.getElementById("day-advice-header").style.display = "none";
    document.getElementById("day-advice").style.display = "none";
    
    document.getElementById("notification").style.display = "block";
    document.getElementById("ajax-loading").style.display = "block";
    document.getElementById("like-message").style.display = "block";
    
    var adviceLikeXMLHttpRequest = new XMLHttpRequest({
	    mozSystem: true
    });

    var requestURL = "http://arista.netai.net/src/likeincrement.php?advice_id=" + adviceID;
    
    adviceLikeXMLHttpRequest.onreadystatechange = function() {
	if (adviceLikeXMLHttpRequest.readyState == 4 && adviceLikeXMLHttpRequest.status == 200) {
	    document.getElementById("notification").style.display = "none";
	    document.getElementById("ajax-loading").style.display = "none";
	    document.getElementById("like-message").style.display = "none";
	    loadCurrentPage();
	}
    }
	
    adviceLikeXMLHttpRequest.open("GET", requestURL, true);
	
    adviceLikeXMLHttpRequest.send();
}