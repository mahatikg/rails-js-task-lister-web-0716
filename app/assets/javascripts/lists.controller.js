// Lists Controller

function ListsController (argument) {

}

ListsController.prototype.createList = function(){
  var $listInputs = $("#add_list").find("input"),
      $submitListButton = $listInputs.last(),
      $lists = $("#lists"),
      $taskForm = $("#add_task"),
      $selectList = $("#select_list");

  $submitListButton.on("click", function(e){
    e.preventDefault();
    var newList = new List($listInputs.first().val());
    $listInputs.first().val("")
    // appending the list div to the lists section
    $lists.append(newList.div());
    // add our list to the select box
    $selectList.append(newList.option());
    $taskForm.show();
  });
};

ListsController.prototype.deleteList = function(){
  var $listSection = $('#lists');

  $listSection.on("click", ".destroy-list", function(){
    var listId = parseInt($(this).data("id"));
    $(this).closest(".list").remove();
    List.delete(listId);
  });
};

ListsController.prototype.init = function(){
  this.createList();
  this.deleteList();
};