var submitButton = document.getElementById("advice-submit-button");
var successBackButton = document.getElementById("success-back-button");

// Add Event Listeners
submitButton.addEventListener("click", submitAdvice, false);
successBackButton.addEventListener("click", submitSuccessBack, false);

function submitAdvice() {
        var advicePage = getPageName(currentActivePage);
        var adviserName;
        if (document.getElementById("adviser-anonymous").checked) {
                adviserName = "Anonymous";
        } else {
                adviserName = document.getElementById("adviser-name").value;
        }
        var advice = document.getElementById("advice").value;

        if (advice == "" || adviserName == "") {
                alert("Please fill the required fields.");
        } else {
                sendAdvice(advicePage, adviserName, advice);
        }
}

function sendAdvice(advicePage, adviserName, adviceShareButton) {
        document.getElementById("submit-advice-form").style.display = "none";
        
        document.getElementById("notification").style.display = "block";
        document.getElementById("ajax-loading").style.display = "block";
        document.getElementById("submit-message").style.display = "block";


        var submitURL = "http://arista.netai.net/src/submitadvice.php?advice_type=" + advicePage + "-day&description=" + advice.value.replace(/\n/g, "%0A%0D") + "&adviser=" + adviserName;

        var adviceSubmitXMLHttpRequest = new XMLHttpRequest({
		mozSystem: true
	});
        
        adviceSubmitXMLHttpRequest.onreadystatechange = function() {
                if (adviceSubmitXMLHttpRequest.readyState == 4 && adviceSubmitXMLHttpRequest.status == 200) {
                        document.getElementById("ajax-loading").style.display = "none";
                        document.getElementById("submit-message").style.display = "none";
                        document.getElementById("success").style.display = "inline-block";
                        submitButton.style.display = "none";
                        document.getElementById("footer").style.display = "none";
                }
        }
        
        adviceSubmitXMLHttpRequest.open("GET", submitURL, true);
        
        adviceSubmitXMLHttpRequest.send();
}

function submitSuccessBack() {
        document.getElementById("success").style.display = "none";
        document.getElementById("notification").style.display = "none";
        loadCurrentPage();
}