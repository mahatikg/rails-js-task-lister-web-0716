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


TasksController.prototype.createTask = function(){
  var $taskForm = $("#add_task"),
      $selectList = $("#select_list"),
      $taskDescription = $("#task_description"),
      $taskPriority = $("#task_priority"),
      $addTaskButton = $taskForm.find("[type='submit']");
  
  $taskForm.hide();
  $addTaskButton.click(function(e){
    e.preventDefault();
    var listId = $selectList.val(),
        list = List.all[listId],
        $description = $taskDescription,
        $priority = $taskPriority,
        $listUl = $("#list-" + list.id);

    var task = new Task($description.val(), $priority.val(), list);

    $listUl.append(task.li());
    $description.val("");
    $priority.val("");
  });
}

TasksController.prototype.init = function() {
  this.createTask();
  this.deleteTask();
};