// Task Model

function Task (description, priority, list) {
  this.description = description;
  this.priority = priority;
  this.list = list;
  this.id = this.constructor.count++;
  this.constructor.all[this.id] = this;
}

Task.count = 0;
Task.all = {};

Task.delete = function(id){
  var deletedTask = this.all[id];
  delete this.all[id];
  return deletedTask;
};

Task.prototype.li = function() {
  var li = '<li data-id="' + this.id + '">' + 
      '<button class="destroy-task" data-id="' +
      this.id + '">x</button>' + 
      this.description + ', ' + this.priority + '</li>';

  return li;
};