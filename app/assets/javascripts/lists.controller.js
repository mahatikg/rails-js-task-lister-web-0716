// Lists Controller

function ListsController (argument) {

}

ListsController.prototype.createFormListener = function(){
  var $listInputs = $("#add_list").find("input"),
      $submitListButton = $listInputs.last(),
      $lists = $("#lists"),
      $taskForm = $("#add_task"),
      $selectList = $("#select_list"),
      that = this;

  $submitListButton.on("click", function(e){
    e.preventDefault();
    $.ajax({
      url: '/lists',
      type: "POST",
      dataType: "JSON",
      data: {list: {title: $listInputs.first().val()}},
      success: function(response){that.createList(response)},
      error: function(){alert("failure!");}
    });
  });
};

//{id: 9, title: "something", created_at: "2014-07-28T21:07:25.154Z", updated_at: "2014-07-28T21:07:25.154Z"}
ListsController.prototype.createList = function(response){
  var $listInputs = $("#add_list").find("input").first(),
      $lists = $("#lists"),
      $taskForm = $("#add_task"),
      $selectList = $("#select_list"),
      newList = new List(response);
  // appending the list div to the lists section
  $lists.append(newList.div());
  // add our list to the select box
  $selectList.append(newList.option());
  //clears the form fields
  $listInputs.val("");
  $taskForm.show();
};

ListsController.prototype.deleteList = function(){
  var $listSection = $('#lists');

  $listSection.on("click", ".destroy-list", function(){
    var listId = parseInt($(this).data("id")),
        $deletedList = $(this);
    $.ajax({
      url: "/lists/" + listId,
      type: "DELETE",
      dataType: "JSON",
      data: {list: {id: listId}},
      success: function(){
        $deletedList.closest(".list").remove();
        List.delete(listId);
      },
      error: function(){alert("failure!");}
    });
  });
};

// [{"id":1,"title":"something"}]
ListsController.prototype.displayLists = function(){
  var that = this;
  $.ajax({
    url: "/lists.json",
    dataType: "JSON",
    success: function(response){
      response.forEach(function(obj){
        that.createList(obj);
      });
    },
    error: function(){alert("failure!");}
  });
};

ListsController.prototype.init = function(){
  this.displayLists();
  this.createFormListener();
  this.deleteList();
};