use actix_web::{HttpRequest, HttpResponse};

use crate::models::todo::TodoList;

pub fn all_todos(_req: HttpRequest) -> HttpResponse {
    HttpResponse::Ok().json(TodoList::get_all())
}