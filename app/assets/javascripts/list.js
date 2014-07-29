// List Model

function List (dataObj) {
  this.title = dataObj.title;
  this.tasks = [];
  this.id = dataObj.id;
  this.constructor.all[this.id] = this;
}

List.all = {};

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
