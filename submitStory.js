document.getElementById("submit-story-submit").addEventListener("click", submitStory, false);

document.getElementById("submit-story-trigger").addEventListener("click", showSubmitStoryForm, false);

document.getElementById("back-sbumit-story").addEventListener("click", backSubmitStory, false);

document.getElementById("submitStory-to-mainMenu").addEventListener("click", hideSubmitStoryForm, false);

var submitBaseURL = "http://www.example.com/somePHP?"

function showSubmitStoryForm() {
        // Hide Menu
        mainMenu.style.display = "none";
        
        // Show Form
        document.getElementById("submit-story").style.display = "block";
}

function hideSubmitStoryForm() {
        // Clean Form
        var inputFields = document.getElementsByTagName("input");
        for(i = 0; i < inputFields.length; i++) {
                inputFields[i].value = "";
        }
        
        // Hide Form
        document.getElementById("submit-story").style.display = "none";
        
        // Show Main Menu
        mainMenu.style.display = "block";
}

function submitStory() {
        // Show AJAX Loader
        showAJAXLoader();
        
        // Show Submission Message
        document.getElementById("submit-story-progress-message").style.display = "block";
        
        var xmlHTTPRequest = new xmlHttpRequest({
                mozSystem: true
        });
        
        // Make Submit URL
        var name = document.getElementById("submit-story-name");
        var category = document.getElementById("submit-story-category").options[document.getElementById("submit-story-category").selectedIndex].value;
        var story = document.getElementById("submit-story-story").value;
        var submitURL = submitBaseURL + "?came=" + name + "&category=" + category + "&story=" + story;
        
        xmlHTTPRequest.onreadystatechange = function() {
                if (xmlHTTPRequest.status == 200 && xmlHTTPRequest.readyState == 4) {
                        // Hide AJAX Loader
                        hideAJAXLoader();
                        
                        // Show Notification Overlay
                        document.getElementById("notification-overlay").style.display = "block";
                        
                        // Show Success Sign
                        document.getElementById("success").style.display = "block";
                        
                        // Hide Submission Progress Message
                        document.getElementById("submit-story-progress-message").style.display = "none";
                        
                        // Show Submission Success Message and Back to Main Menu Button
                        document.getElementById("submit-story-success-message").style.display = "block";
                }
        }
        
        xmlHTTPRequest.open("GET", submitURL, true);
        
        xmlHTTPRequest.send();
}

function backSubmitStory() {
        document.getElementById("success").style.display = "none";
        document.getElementById("submit-story-success-message").style.display = "none";
        document.getElementById("notification-overlay").style.display = "none";
}