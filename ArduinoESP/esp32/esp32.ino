#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <AsyncTCP.h>
#include "config.h"
#include "ESP32_Utils.hpp"

AsyncWebServer server(80);
AsyncWebSocket ws("/"); // WebSocket raíz
HardwareSerial SerialToArduino(2); // UART2 (TX2=17, RX2=16)

// 🟢 Manejador de mensajes WebSocket
void onWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
    String msg = "";
    for (size_t i = 0; i < len; i++) msg += (char)data[i];
    Serial.println("📩 Texto recibido del navegador: " + msg);
    SerialToArduino.println(msg); // se envía al Arduino físico
  }
}

// 🟢 Evento WebSocket (conexión/desconexión)
void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
  if (type == WS_EVT_CONNECT) {
    Serial.println("✅ Cliente WebSocket conectado");
  } else if (type == WS_EVT_DISCONNECT) {
    Serial.println("❌ Cliente WebSocket desconectado");
  } else if (type == WS_EVT_DATA) {
    onWebSocketMessage(arg, data, len);
  }
}

void setup() {
  Serial.begin(115200);
  SerialToArduino.begin(9600, SERIAL_8N1, 16, 17); // RX=16, TX=17

  ConnectWiFi_STA();

  ws.onEvent(onEvent);
  server.addHandler(&ws);

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(200, "text/plain", "Servidor WebSocket Braille activo 🚀");
  });

  server.begin();
  Serial.println("🌐 Servidor WebSocket Braille iniciado en puerto 80");
}

void loop() {
  ws.cleanupClients(); // Mantiene clientes activos
}
