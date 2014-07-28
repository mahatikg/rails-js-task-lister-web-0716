// List Model

function List (title) {
  this.title = title;
  this.tasks = [];
  this.id = this.constructor.count++;
  this.constructor.all[this.id] = this;
}

List.count = 0;
List.all = {};
/*
  {
    0: list,
    1: list,
    2: list
  }
*/

List.delete = function(id){
  var deletedList = this.all[id];
  delete this.all[id];
  return deletedList;
};


List.prototype.div = function(){
  var div = '<div class="list"><h2><button class="destroy-list"' +
   'data-id="' + this.id + '">' +
   'x</button>' + this.title + '</h2><ul id="list-' + this.id +
   '" data-id="' + this.id + '"></ul></div>';
  return div;
};

List.prototype.option = function(){
  var option = '<option value="' + this.id +
    '">' + this.title + '</option>';
  return option;
};
