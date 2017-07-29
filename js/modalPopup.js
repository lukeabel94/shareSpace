var btn = document.getElementById("testBtn");
console.log("load");
btn.addEventListener("click", function(e){
  console.log("hi");
  showBSModal({
    title: "Do you want to logo out?",
    body: "You will loose all unsaved work, press 'Cancel' to return to page or 'Confirm' to log out",
    actions: [{
        label: 'Cancel',
        cssClass: 'btn-success',
        onClick: function(e){
            $(e.target).parents('.modal').modal('hide');
        }
    },{
        label: 'Confirm',
        cssClass: 'btn-danger',
        onClick: function(e){
            alert('confirm button clicked');
        }
    }]
      });

});
