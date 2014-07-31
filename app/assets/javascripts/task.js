// Task Model

function Task (dataObj) {
  this.description = dataObj.description;
  this.priority = dataObj.priority;
  this.id = dataObj.id;
  this.list = List.all[dataObj.list_id];
  this.constructor.all[this.id] = this;
}


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