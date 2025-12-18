// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use rumqttc::tokio_rustls::rustls::crypto::{ring::default_provider, CryptoProvider};
use rumqttc::AsyncClient;
use std::sync::{Arc, Mutex};

mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  CryptoProvider::install_default(default_provider())
    .expect("error while set default crypto provider");
  tauri::Builder::default()
    .plugin(tauri_plugin_process::init())
    .plugin(tauri_plugin_updater::Builder::new().build())
    .plugin(tauri_plugin_store::Builder::new().build())
    .plugin(tauri_plugin_opener::init())
    .manage(Arc::new(Mutex::new(None::<AsyncClient>)))
    .invoke_handler(all_commands!())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
