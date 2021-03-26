$(document).ready(function(){
    $("p").click(function(){
      alert("The paragraph was clicked.");
      $(this).css("color", "red");
    });
    $("#Title").click(function(){
        var sendInfo = {
            Name: "name",
            Address: "address",
            Phone: "phone"
        };
        $(this).css("background-color", "red");
        $.ajax({
            url: "/cardapi",
            method:"POST",
            data: JSON.stringify({
                name: 'Olaf ',
                nachname: 'schwede',
                c: 33
            }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',

    }).done(function() {
            alert( "second success" );
          })
      });
  });