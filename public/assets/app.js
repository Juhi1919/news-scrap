<script src="jquery.min.js">
<script src="<%=ResolveUrl("~/Scripts/jquery-1.3.2.js" type="text/javascript"></script>

$(document).ready(function() {
  
    $(".scrape").click(function(event) {
        event.preventDefault();
        $.get("/api/fetch").then(function(data) {
            $(".articles").remove();
            $.get("/").then(function(){
                bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>", function(result) {
                  location.reload()
                });
            });
            });
    });
  
    // Saving the aricle.
    $(".savearticle").click(function() {
        var articleSave = {};
        articleSave.id = $(this).data("id");
        articleSave.saved = true;
        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleSave
        }).then(function(data) {
            location.reload();
        });
    });
   $(".deletesave").click(function() {
        var articleremove = {};
        articledelete.id = $(this).data("id");
        articledelete.saved = false;
        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articledelete
        }).then(function(data) {
            location.reload();
        });
    });
  
    $('.saved').on('click',  function () {
        // the NEWS article id
        var thisId = $(this).attr("data-value");
  
        //attach news article _id to the save button in the modal for use in save post
        $("#savebtn").attr({"data-value": thisId});
  
        //make an ajax call for the notes attached to this article
        $.get("/notes/" + thisId, function(data){
            console.log(data);
            //empty modal title, textarea and notes
            $('#notelabel').empty();
            $('#notes').empty();
            $('#note').val('');
  
             $('#notelabel').append(' ' + thisId);
            //add notes to body of modal
            for(var i = 0; i<data.note.length; i++) {
                var button = ' <a href=/deleteNote/' + data.note[i]._id + '><i class="pull-right fa fa-times fa-2x deletex" aria-hidden="true"></i></a>';
                $('#notes').append('<div class="panel panel-default"><div class="noteText panel-body">' + data.note[i].body + '  ' + button + '</div></div>');
            }
        });
    });
  
    $(".savenote").click(function() {
    var thisId = $(this).attr("data-value");
  
  $.ajax({
        method: "POST",
        url: "/notes/" + thisId,
        data: {
          body: $("#notestext").val().trim()
        }
      })
  
      .done(function(data) {
          $('#savenoteModal').modal('hide');
  
      });
    });
  });
