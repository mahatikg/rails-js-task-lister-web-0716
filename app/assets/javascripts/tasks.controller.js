function TasksController (argument) {
  this.constructor.all.push(this);
}
// in case we ever need to access the instance of the controller
// we will store it in an array
TasksController.all = [];

TasksController.prototype.deleteTask = function(){
  var $listSection = $('#lists');

  $listSection.on("click", ".destroy-task", function(){
    var taskId = parseInt($(this).data("id"));
    $(this).parent().remove();
    Task.delete(taskId);
  });
};

TasksController.prototype.createTask = function(dataObj){
  var task = new Task(dataObj),
      $taskPriority = $("#task_priority"),
      $taskDescription = $("#task_description"),
      $listUl = $("#list-" + task.list.id);

  $listUl.append(task.li());
  $taskDescription.val("");
  $taskPriority.val("");
};

TasksController.prototype.createTaskListener = function(){
  var $taskForm = $("#add_task"),
      $selectList = $("#select_list"),
      $taskDescription = $("#task_description"),
      $taskPriority = $("#task_priority"),
      $addTaskButton = $taskForm.find("[type='submit']"),
      that = this;
  
  $taskForm.hide();
  $addTaskButton.click(function(e){
    e.preventDefault();
    var listId = $selectList.val(),
        list = List.all[listId],
        $description = $taskDescription,
        $priority = $taskPriority,
        $listUl = $("#list-" + list.id),
        aUrl = "/lists/" + listId + "/tasks",
        userData = { 
          task: {
            description: $description.val(),
            priority: $priority.val(),
            list_id: listId 
          }
        };

    that.ajax(aUrl, "POST", that.createTask, userData)

  });
}

// This method will allow us to dry out our JS controllers when doing AJAX
TasksController.prototype.ajax = function(aUrl, HttpVerb, callBack, userData) {
  // In case the list instance is needed
  var that = this;
  debugger
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

TasksController.prototype.init = function() {
  this.createTaskListener();
  this.deleteTask();
};