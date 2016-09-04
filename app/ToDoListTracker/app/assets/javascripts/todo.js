// js actions for todo

function Todo (dataObj) {


  this.description = dataObj.description;
  this.priority = dataObj.priority;


  this.id = dataObj.id;


  this.list = List.all[dataObj.list_id];
  this.constructor.all[this.id] = this;
  // got the above lines from google unsure how exactly they work


}


Todo.all = {};

Todo.delete = function(id){
  var deletedTodo = this.all[id];
  delete this.all[id];
  return deletedTodo;
};

Todo.prototype.li = function() {

  var li = '<li data-id="' + this.id + '">' +
      '<button class="destroy-todo" data-id="' +
      this.id + '">x</button>' +
      this.description + ', ' + this.priority + '</li>';

  return li;
};
