// Tasks Controller
function TasksController (argument) {

}

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
  $description.val("");
  $priority.val("");
};

TasksController.prototype.createTaskListener = function(){
  var $taskForm = $("#add_task"),
      $selectList = $("#select_list"),
      $taskDescription = $("#task_description"),
      $taskPriority = $("#task_priority"),
      $addTaskButton = $taskForm.find("[type='submit']")
      that = this;
  
  $taskForm.hide();
  $addTaskButton.click(function(e){
    e.preventDefault();
    var listId = $selectList.val(),
        list = List.all[listId],
        $description = $taskDescription,
        $priority = $taskPriority,
        $listUl = $("#list-" + list.id);

    $.ajax({
      url: "/lists/" + listId + "/tasks",
      type: "POST",
      dataType: "JSON",
      data: {
        task: {
          description: $description.val(),
          priority: $priority.val(),
          list_id: listId 
        }
      },
      success: function(response){that.createTask(response)},
      error: function(){alert("failure!");}
    });
  });
}

TasksController.prototype.init = function() {
  this.createTaskListener();
  this.deleteTask();
};