#[macro_use]
extern crate diesel;
extern crate actix;
extern crate actix_web;
extern crate serde;
extern crate serde_json;
#[macro_use]
extern crate serde_derive;
extern crate dotenv;
extern crate chrono;
extern crate futures;

use actix_web::{HttpServer, App, web};

mod schema;
mod models;
mod services;
mod db_handler;

fn main() {
    let sys = actix::System::new("todo-api");

    HttpServer::new(|| App::new().service(
        web::resource("/todos").route(web::get().to_async(services::todos::all_todos))))
            .bind("127.0.0.1:8080").unwrap()
            .start();
    
    let _ = sys.run();
}

fn get_current_time_rfc3339() -> String {
    use chrono::prelude::*;
    let current_time: DateTime<Utc> = Utc::now();
    String::from(current_time.to_rfc3339())
}
