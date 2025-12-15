use rumqttc::{AsyncClient, Event, MqttOptions, Packet, QoS};
use serde::Serialize;
use std::{
  sync::{Arc, Mutex},
  time::Duration,
};
use tauri::{async_runtime, AppHandle};
use tauri::{Emitter, State};

#[tauri::command]
pub fn mqtt_client_connect(
  app: AppHandle,
  mqtt_client_state: State<'_, Arc<Mutex<Option<AsyncClient>>>>,
  url: String,
  username: String,
  password: String,
) {
  let mut guard = mqtt_client_state.lock().unwrap();

  if guard.is_none() {
    let mut mqtt_options = MqttOptions::parse_url(url).unwrap();
    mqtt_options.set_keep_alive(Duration::from_secs(5));
    mqtt_options.set_credentials(username, password);

    let (client, mut event_loop) = AsyncClient::new(mqtt_options, 10);
    *guard = Some(client);

    async_runtime::spawn(async move {
      while let Ok(notification) = event_loop.poll().await {
        if let Event::Incoming(Packet::Publish(publish)) = notification {
          let topic = publish.topic;
          let payload = String::from_utf8_lossy(&publish.payload);
          app
            .emit(
              "mqtt-client-message",
              MqttMessage {
                topic: &topic,
                payload: &payload,
              },
            )
            .unwrap();
        }
      }
    });
  }
}

#[tauri::command]
pub async fn mqtt_client_subscribe(
  mqtt_client_state: State<'_, Arc<Mutex<Option<AsyncClient>>>>,
  topic: String,
) -> Result<(), ()> {
  let client_opt = {
    let mut guard = mqtt_client_state.lock().unwrap();
    guard.as_mut().cloned()
  };

  if let Some(client) = client_opt {
    let sub = client.subscribe(topic, QoS::AtMostOnce).await;
    if let Err(err) = sub {
      // todo: handle error - display on UI
      println!("{err}");
    }
  }

  Ok(())
}

#[tauri::command]
pub async fn mqtt_client_publish(
  mqtt_client_state: State<'_, Arc<Mutex<Option<AsyncClient>>>>,
  topic: String,
  payload: String,
) -> Result<(), ()> {
  let client_opt = {
    let mut guard = mqtt_client_state.lock().unwrap();
    guard.as_mut().cloned()
  };

  if let Some(client) = client_opt {
    let pub_res = client.publish(topic, QoS::AtMostOnce, false, payload).await;
    if let Err(err) = pub_res {
      // todo: handle error - display on UI
      println!("{err}");
    }
  }

  Ok(())
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct MqttMessage<'a> {
  topic: &'a str,
  payload: &'a str,
}
