pub mod mqtt_client;

#[macro_export]
macro_rules! all_commands {
  () => {
    tauri::generate_handler![
      commands::mqtt_client::mqtt_client_connect,
      commands::mqtt_client::mqtt_client_subscribe,
      commands::mqtt_client::mqtt_client_publish,
    ]
  };
}
