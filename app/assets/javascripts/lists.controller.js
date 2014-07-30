function ListsController (argument) {
  this.constructor.all.push(this);
}
// in case we ever need to access the instance of the controller
// we will store it in an array
ListsController.all = [];

ListsController.prototype.createFormListener = function(){
  var $listInputs = $("#add_list").find("input"),
      $submitListButton = $listInputs.last(),
      $lists = $("#lists"),
      $taskForm = $("#add_task"),
      $selectList = $("#select_list"),
      that = this;

  $submitListButton.on("click", function(e){
    e.preventDefault();
    // get user input into a structure to send it
    var userData = {list: {title: $listInputs.first().val()}};
    // our custom AJAX method
    that.ajax('/lists', "POST", that.createList, userData);
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
        removeList = function(){
          $deletedList.closest(".list").remove();
          // List.delete(listId);
        };

    that.ajax(aUrl, "DELETE", removeList);
  });
};

// Our JSON response from the sever looks like this...
// [{"id":1,"title":"something"}]
ListsController.prototype.displayLists = function(){
  var that = this,
      appendLists = function(response){
        response.forEach(function(obj){
          that.createList(obj);
          that.displayListsTasks(obj);
        });
      };

  that.ajax("/lists.json", "GET", appendLists);
};

// Once all our lists are loaded we need to display all their tasks if they have any
ListsController.prototype.displayListsTasks = function(obj){
  var that = this,
      aUrl = "/lists/" + obj.id + "/tasks",
      createTasks = function(response){
        // our server returns an array of tasks to create
        response.forEach(function(obj){
          // grab the instance of the task controller to create new tasks
          TasksController.all[0].createTask(obj);
        });
      };

  that.ajax(aUrl, "GET", createTasks);

};

// This method will allow us to dry out our JS controllers when doing AJAX
ListsController.prototype.ajax = function(aUrl, HttpVerb, callBack, userData) {
  // In case the list instance is needed
  var that = this;
  $.ajax({
    url: aUrl,
    type: HttpVerb,
    // data is optional and will default to undefined if not passed in
    data: userData,
    dataType: "JSON",
    success: function(response){ 
      callBack(response);
    },
    error: function(){alert("failure!");}
  });
};


ListsController.prototype.init = function(){
  this.displayLists();
  this.createFormListener();
  this.deleteList();
};