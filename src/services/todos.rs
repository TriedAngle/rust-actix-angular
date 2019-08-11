use actix_web::{web, HttpRequest, HttpResponse};

use crate::models::todo::{Todo, NewTodo ,TodoList};

pub fn get_all(_req: HttpRequest) -> HttpResponse {
    HttpResponse::Ok().json(TodoList::get_all())
}

pub fn create(mut new_todo: web::Json<NewTodo>) -> Result<HttpResponse, HttpResponse> {
    let chrono_current_time: chrono::NaiveDateTime = chrono::Local::now().naive_local();
    let current_time: String = chrono_current_time.to_string();
    new_todo.time_added = current_time;
    new_todo
        .create()
        .map(|todo| HttpResponse::Created().json(todo))
        .map_err(|e| {
            HttpResponse::InternalServerError().json(e.to_string())
        })
}

pub fn get_by_id(id: web::Path<i32>) -> Result<HttpResponse, HttpResponse> {
    Todo::get_by_id(&id)
        .map(|todo| HttpResponse::Ok().json(todo))
        .map_err(|e| {
            HttpResponse::InternalServerError().json(e.to_string())
        })
}

pub fn delete_by_id(id: web::Path<i32>) -> Result<HttpResponse, HttpResponse> {
    Todo::delete_by_id(&id)
        .map(|_| HttpResponse::Ok().json(()))
        .map_err(|e| {
            HttpResponse::InternalServerError().json(e.to_string())
        })
}

pub fn update_by_id(id: web::Path<i32>, new_todo: web::Json<NewTodo>) -> Result<HttpResponse, HttpResponse> {
    Todo::update_by_id(&id, &new_todo).unwrap();
    get_by_id(id)
}