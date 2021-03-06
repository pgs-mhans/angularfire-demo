export class TodoController {
  constructor(Firebase, FirebaseUrl, $firebaseArray, AuthService) {
    'ngInject';

    var todoRef = new Firebase(FirebaseUrl + "/apps/todo");

    // download the data into a local object
    this.list = $firebaseArray(todoRef);
    this.AuthService = AuthService;
  }

  addItem(newItemName) {
    this.list.$add({name: newItemName});
    this.newItemField = '';
  }

  removeItem(index) {
    this.list.$remove(index, 1);
  }

  editItem(index) {
    this.list[index].edit = true;
    this.list[index].original = angular.copy(this.list[index].name);
  }

  restoreItem(index) {
    this.list[index].name = this.list[index].original;
    delete this.list[index].edit;
  }

  updateItem(index) {
    delete this.list[index].edit;
    delete this.list[index].original;
    this.list.$save(this.list[index]);
  }
}
