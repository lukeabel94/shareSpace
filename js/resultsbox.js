//Get the box
var modal = document.getElementById('resultsModal');

//The button/results list
var btn = document.getElementById("resultsdatabase");

//Get <span> element to close modal box
var span = document.getElementsByClassName("close")[0];

//CLick on result open modal
div.onclick = function(){
	modal.style.display = "block";
}

//WHen user clicks <span> (x) modal closed
span.onclick = function(){
	modal.style.display ="none";
}

//When user clicks outside modal it closes
window.onlick = function(event){
	if(event.target==modal){
		modal.style.display = "none"
	}
}