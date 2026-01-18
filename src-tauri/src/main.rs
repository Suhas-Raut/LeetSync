#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Emitter, Manager};
use std::process::Command;

#[tauri::command]
fn run_leetsync(window: tauri::Window, input: String, lang: String, code: String) {
    window.emit("log", "📩 Request received").unwrap();

    let output = Command::new("node")
        .arg("index.js")
        .arg(input)
        .arg(lang)
        .arg(code)
        .output()
        .expect("failed to execute node");

    let stdout = String::from_utf8_lossy(&output.stdout);
    for line in stdout.lines() {
        window.emit("log", line).unwrap();
    }

    window.emit("log", "✅ Done").unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_leetsync])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
