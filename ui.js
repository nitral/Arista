/* Page State Variable
 * 0 = Cover Page
 * 1 = Rose Day
 * 2 = Propose Day
 * 3 = Chocolate Day
 * 4 = Teddy Day
 * 5 = Promise Day
 * 6 = Hug Day
 * 7 = Kiss Day
 * 8 = Valentine's Day
*/

var currentActivePage = 0;
var totalPages = 9;
var roseAdvice, proposeAdvice, chocolateAdvice, teddyAdvice, promiseAdvice, hugAdvice, kissAdvice, valentineAdvice;
var roseAdviceID, proposeAdviceID, chocolateAdviceID, teddyAdviceID, promiseAdviceID, hugAdviceID, kissAdviceID, valentineAdviceID;
var roseAdviceAuthor, proposeAdviceAuthor, chocolateAdviceAuthor, teddyAdviceAuthor, promiseAdviceAuthor, hugAdviceAuthor, kissAdviceAuthor, valentineAdviceAuthor;
var prevButton = document.getElementById("prev-page-button");
var nextButton = document.getElementById("next-page-button");
var adviceSpace = document.getElementById("day-advice");
var adviceShareButton = document.getElementById("request-share-button");

// Add Event Listeners
prevButton.addEventListener("click", changePrevPage, false);
nextButton.addEventListener("click", changeNextPage, false);
adviceShareButton.addEventListener("click", showAdviceSubmitForm, false);
document.getElementById("adviser-anonymous").addEventListener("change", toggleAdviserNameField, false);

function getPageName(pageID) {
        switch (pageID) {
                case 0:
                        return "cover";
                case 1:
                        return "rose";
                case 2:
                        return "propose";
                case 3:
                        return "chocolate";
                case 4:
                        return "teddy";
                case 5:
                        return "promise";
                case 6:
                        return "hug";
                case 7:
                        return "kiss";
                case 8:
                        return "valentine";
                default:
                        return "Invalid ID!";
        }
}

function changePrevPage() {
        unloadCurrentPage();
        currentActivePage = (currentActivePage - 1) % 9;
        loadCurrentPage();
}

function changeNextPage() {
        unloadCurrentPage();
        currentActivePage = (currentActivePage + 1) % 9;
        loadCurrentPage();
}

function unloadCurrentPage() {
        
        // Unload Prev Button
        prevButton.style.visibility = "hidden";
        
        // Unload Next Button
        nextButton.style.visibility = "hidden";
        
        // Unload Notifications
        document.getElementById("notification").style.display = "none";
	document.getElementById("ajax-loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("fetch-message").style.display = "none";
        document.getElementById("submit-message").style.display = "none";
        document.getElementById("like-message").style.display = "none";
        
        if (currentActivePage == 0) {
                // Unload Cover
                document.getElementById("cover-body").style.display = "none";
                document.getElementById("cover-page-heading").style.display = "none";
        } else {
                document.getElementById(getPageName(currentActivePage) + "-day-page-heading").style.display = "none";
                
                // Unload Current Page description and Advice.
                document.getElementById(getPageName(currentActivePage) + "-day-description").style.display = "none";
                document.getElementById("day-body").style.display = "none";
                
                // Unload Footer
                document.getElementById("footer").style.display = "none";
                
                // Unload Submit Form
                unloadAdviceSubmitForm();
        }
}

function loadCurrentPage() {
        if (currentActivePage == 0) {
                document.getElementById("cover-page-heading").style.display = "block";
                document.getElementById("cover-body").style.display = "block";
                nextButton.style.visibility = "visible";
        } else if (currentActivePage <= 7) {
                prevButton.style.visibility = "visible";
                nextButton.style.visibility = "visible";
                document.getElementById(getPageName(currentActivePage) + "-day-page-heading").style.display = "inline-block";
                document.getElementById("day-body").style.display = "block";
                document.getElementById(getPageName(currentActivePage) + "-day-description").style.display = "block";
                document.getElementById("request-share-button").style.display = "inline-block";
                document.getElementById("footer").style.display = "block";
                updateAdviceSpace();
        } else {
                prevButton.style.visibility = "visible";
                document.getElementById(getPageName(currentActivePage) + "-day-page-heading").style.display = "inline-block";
                document.getElementById("day-body").style.display = "block";
                document.getElementById(getPageName(currentActivePage) + "-day-description").style.display = "block";
                document.getElementById("footer").style.display = "block";
                document.getElementById("request-share-button").style.display = "inline-block";
                updateAdviceSpace();
        }
}

function showAdviceRefresh() {
        document.getElementById("day-advice-header").style.display = "none";
        document.getElementById("day-advice").style.display = "none";
        document.getElementById("day-advice-refresh").style.display = "block";
}

function showAdviceSpace() {
        document.getElementById("day-advice-refresh").style.display = "none";
        document.getElementById("day-advice-header").style.display = "block";
        document.getElementById("day-advice").style.display = "block";
}

function updateAdviceSpace() {
        switch (currentActivePage) {
                case 1:
                        if (!roseAdvice) {
                                showAdviceRefresh();
                        } else {
                                showAdviceSpace();
                                document.getElementById("day-advice-author-name").innerHTML = roseAdviceAuthor;
                                adviceSpace.innerHTML = roseAdvice;
                        }
                        break;
                case 2:
                        if (!proposeAdvice) {
                                showAdviceRefresh();
                        } else {
                                showAdviceSpace();
                                document.getElementById("day-advice-author-name").innerHTML = proposeAdviceAuthor;
                                adviceSpace.innerHTML = proposeAdvice;
                        }
                        break;
                case 3:
                        if (!chocolateAdvice) {
                                showAdviceRefresh();
                        } else {
                                showAdviceSpace();
                                document.getElementById("day-advice-author-name").innerHTML = chocolateAdviceAuthor;
                                adviceSpace.innerHTML = chocolateAdvice;
                        }
                        break;
                case 4:
                        if (!teddyAdvice) {
                                showAdviceRefresh();
                        } else {
                                showAdviceSpace();
                                document.getElementById("day-advice-author-name").innerHTML = teddyAdviceAuthor;
                                adviceSpace.innerHTML = teddyAdvice;
                        }
                        break;
                case 5:
                        if (!promiseAdvice) {
                                showAdviceRefresh();
                        } else {
                                showAdviceSpace();
                                document.getElementById("day-advice-author-name").innerHTML = promiseAdviceAuthor;
                                adviceSpace.innerHTML = promiseAdvice;
                        }
                        break;
                case 6:
                        if (!hugAdvice) {
                                showAdviceRefresh();
                        } else {
                                showAdviceSpace();
                                document.getElementById("day-advice-author-name").innerHTML = hugAdviceAuthor;
                                adviceSpace.innerHTML = hugAdvice;
                        }
                        break;
                case 7:
                        if (!kissAdvice) {
                                showAdviceRefresh();
                        } else {
                                showAdviceSpace();
                                document.getElementById("day-advice-author-name").innerHTML = kissAdviceAuthor;
                                adviceSpace.innerHTML = kissAdvice;
                        }
                        break;
                case 8:
                        if (!valentineAdvice) {
                                showAdviceRefresh();
                        } else {
                                showAdviceSpace();
                                document.getElementById("day-advice-author-name").innerHTML = valentineAdviceAuthor;
                                adviceSpace.innerHTML = valentineAdvice;
                        }
                        break;
                default:
                        showAdviceRefresh();
        }
        
        adviceSpace.innerHTML = "<pre>" + adviceSpace.innerHTML + "</pre>";
}

function showAdviceSubmitForm() {
        document.getElementById("day-advice-refresh").style.display = "none";
        document.getElementById("day-advice-header").style.display = "none";
        document.getElementById("day-advice").style.display = "none";
        document.getElementById("submit-advice-form").style.display = "block";
        document.getElementById("advice-submit-button").style.display = "inline-block";
        document.getElementById("request-share-button").style.display = "none";
}

function unloadAdviceSubmitForm() {
        document.getElementById("adviser-name").value = "";
        document.getElementById("adviser-anonymous").checked = false;
        document.getElementById("advice").value = "";
        document.getElementById("submit-advice-form").style.display = "none";
        document.getElementById("advice-submit-button").style.display = "none";
        document.getElementById("adviser-name").disabled = false;
}

function toggleAdviserNameField() {
        if (this.checked)
                document.getElementById("adviser-name").disabled = true;
        else
                document.getElementById("adviser-name").disabled = false;
}