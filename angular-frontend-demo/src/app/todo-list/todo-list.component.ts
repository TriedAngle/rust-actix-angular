import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../services/todo-service.service';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.styl']
})
export class TodoListComponent implements OnInit {

  public todos = Array<Todo>();
  public selected_todo: Todo;
  
  constructor(private todo_service: TodoServiceService) {
    this.todo_service = todo_service;
    this.selected_todo = {id: -1, todo_text: '', is_finished: false, time_added: '', time_finished: ''};
   }

  ngOnInit() {
    this.getTodos()
  }

  getTodos = () => {
    this.todo_service.getTodos().toPromise().then(
      data => {
        this.todos = data;
      },
      error => {
        console.log(error);
      })
  }

  todoClicked = (todo: Todo) => {
    this.todo_service.getTodoById(todo.id).subscribe(
      data => {
        this.selected_todo = data;
        if(this.selected_todo.time_finished === ""){
          this.selected_todo.time_finished= "Not finished yet!"
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  todoUpdate = () => {
    this.todo_service.updateTodo(this.selected_todo).subscribe(
      data => {
        this.selected_todo = data;
        this.getTodos();
      },
      error => {
        console.log(error);
      }
    )
  }
  
  todoCreate = () => {
    this.todo_service.createTodo(this.selected_todo).subscribe(
      data => {
        this.todos.push(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  todoDelete = () => {
    this.todo_service.deleteTodo(this.selected_todo.id).subscribe(
      data => {
        this.getTodos();
      },
      error => {
        console.log(error);
      }
    )
  }

}
