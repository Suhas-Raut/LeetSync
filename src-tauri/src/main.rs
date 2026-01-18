#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::{Command, Stdio};
use std::io::{BufReader, BufRead};

use tauri::{Window};
use tauri::Emitter; // <-- THIS IS REQUIRED

#[tauri::command]
async fn run_leetsync(window: Window, input: String, lang: String, code: String) -> Result<(), String> {
    let mut cmd = Command::new("node");

    cmd.arg("index.js")
        .arg(&input)
        .arg(&lang)
        .arg(&code)
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());

    let mut child = cmd.spawn().map_err(|e| format!("Failed to spawn Node: {}", e))?;

    if let Some(stdout) = child.stdout.take() {
        let reader = BufReader::new(stdout);
        for line in reader.lines() {
            if let Ok(line) = line {
                let _ = window.emit("log", line.clone());
            }
        }
    }

    let output = child.wait().map_err(|e| format!("Node process failed: {}", e))?;
    if !output.success() {
        return Err(format!("Node exited with code {:?}", output.code()));
    }

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![run_leetsync])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
