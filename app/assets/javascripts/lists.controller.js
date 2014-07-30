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
    // our custom AJAX method
    that.ajax('/lists', "POST", createList);
  });

};

// The objects from our server that we use to create list instances...
//{id: 9, title: "something", created_at: "2014-07-28T21:07:25.154Z", updated_at: "2014-07-28T21:07:25.154Z"}
ListsController.prototype.createList = function(dataObj){
  var $listInputs = $("#add_list").find("input").first(),
      $lists = $("#lists"),
      $taskForm = $("#add_task"),
      $selectList = $("#select_list"),
      newList = new List(dataObj);

  // appending the list div to the lists section
  $lists.append(newList.div());

  // add our list to the select box
  $selectList.append(newList.option());

  //clears the form fields
  $listInputs.val("");
  $taskForm.show();
};

ListsController.prototype.deleteList = function(){
  var $listSection = $('#lists')
      that = this;

  $listSection.on("click", ".destroy-list", function(){

    var $deletedList = $(this),
        listId = parseInt($deletedList.data("id"), 10),
        aUrl = "/lists/" + listId,
        // saving our function to make our ajax call more readable
        removeLists = function(){
        debugger 
          $deletedList.closest(".list").remove();
          // List.delete(listId);
        };

    that.ajax(aUrl, "DELETE", removeLists);
  });
};

// Our JSON response from the sever looks like this...
// [{"id":1,"title":"something"}]
ListsController.prototype.displayLists = function(){
  var that = this,
      appendLists = function(response){
        response.forEach(function(obj){
          that.createList(obj);
        });
      };

  that.ajax("/lists.json", "GET", appendLists);

};

// Once all our lists are loaded we need to display all their tasks if they have any
// ListsController.prototype.displayTasks = function(){
//   var that = this;

//   for(var id in List.all){
//     var list = List.all[id];
//     $.ajax({
//       url: "/lists/" + list.id + "/tasks.json",
//       type: "GET",
//       dataType: "JSON",
//       success: function(response){
//         response.forEach(function(obj){
//           // who should make this??
//           that.createTask(obj);
//         });
//       },
//       error: function(){alert("failure!");}
//     });
    
//   }

// };

// This method will allow us to dry out our JS controllers when doing AJAX
ListsController.prototype.ajax = function(aUrl, HttpVerb, callBack) {
  // In case the list instance is needed
  var that = this;

  $.ajax({
    url: aUrl,
    type: HttpVerb,
    dataType: "JSON",
    success: function(response){ 
      try {
          // default to calling our callback as a mehtod on our list
          that.callBack(response);
      } catch(e) {
          // call it the callback as a regular function
          callBack(response);
      } 
    },
    error: function(){alert("failure!");}
  });
};


ListsController.prototype.init = function(){
  this.displayLists();
  this.createFormListener();
  this.deleteList();
};