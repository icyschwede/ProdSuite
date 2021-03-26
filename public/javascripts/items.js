$(document).ready(function(){
    $("p").click(function(){
      $(this).css("color", "red");
    });
    $("#title").bind("change paste keyup", function() {
        alert($(this).val()); 
     });
});

function newItem(card,itemType){
    var cardId=card.attr('name');
    var item = {
        'cardid': cardId,
        'type': itemType
        }
    $.ajax({
        url: "itemsapi",
        method:"POST",
        data: JSON.stringify(item),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            //window.location.assign("cards");
            addItemToDom(cardId,data,itemType)
        },
        error: function (err) {
            alert(err);
        }
    })
};

function saveitem(item){
    var data = {
        'content':item.val(),
        'id': item.attr("data-id")
        }
    $.ajax({
        url: "itemsapi",
        method:"PUT",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            //console.log('entry updated');
        },
        error: function (err) {
            alert(err);
        }
    })
}

function deleteitem(item){
    var data = {
        'id': item.attr("data-id")
    }
    $.ajax({
        url: "itemsapi",
        method:"DELETE",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            removeItem(item.id);
        },
        error: function (err) {
            alert(err);
        }
    })    
};

function addItemToDom(cardId,data,itemType){
    switch(itemType){
        case"1":
            $("#card"+cardId + " .content").append('<div class="item type1">' + 
            '<div class="textarea"><textarea placeholder="Enter item text" id="item' + data.id+'" onblur="saveitem(' + data.id + ')"></textarea></div>' + 
            '<div class="submenu"><img class="drop-menu-button" src="/images/delete.svg" title="Menu" onclick="deleteitem(' + data.id +')"/></div>');
            break;
        case"2":
            $("#card"+cardId + " .content").append('<div class="item type2"><div class="checkarea">' +
            '<input class="checkbox" type="checkbox" id="check' + data.id + ' onclick="itemChecked($(this))"><input class="text" placeholder="Enter item text" id="item' + data.id + 
            ' onblur="saveitem(item' + data.id + ')" value="Expense save button"><img class="delete-button" src="/images/delete.svg" title="Menu" onclick="deleteitem(' + data.id + ')"></div></div>');
            break;
        }

    
 }

function itemChecked(item){
    if($(item).is(':checked')){
        var checked='checked'
    }
    else{
        var checked=""
    }
    var data = {
    'action': 'itemChecked',
    'check':$(item).is(':checked'),
    'id': $(item).attr('data-id')
    }
    $.ajax({
        url: "itemsapi",
        method:"PUT",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            console.log("item checked " + $(item).attr('id') + " value");
        },
        error: function (err) {
            alert(err);
        }

    });
}


 function removeItem(id){
   $('#item' + id).remove();
 };
