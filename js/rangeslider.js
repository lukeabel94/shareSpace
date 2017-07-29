function changeValue(value){
    $('#season').val(value);

    if (document.getElementById("submitButton").style.visibility == "hidden"){
         search();
         scroll();
       }
}

