use actix_web::{web, HttpRequest, HttpResponse};

use crate::models::todo::{TodoList, NewTodo};

pub fn all_todos(_req: HttpRequest) -> HttpResponse {
    HttpResponse::Ok().json(TodoList::get_all())
}

pub fn create_todo(new_todo: web::Json<NewTodo>) -> Result<HttpResponse, HttpResponse> {
    new_todo
        .create()
        .map(|todo| HttpResponse::Ok().json(todo))
        .map_err(|e| {
            HttpResponse::InternalServerError().json(e.to_string())
        })
}