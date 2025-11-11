#ifndef SERVER_HPP
#define SERVER_HPP

#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>

AsyncWebServer server(80);

void InitServer() {
  if (!SPIFFS.begin(true)) {
    Serial.println("❌ Error al montar SPIFFS");
    return;
  }

  Serial.println("✅ SPIFFS montado correctamente");

  // Página principal simple
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(200, "text/plain", "Servidor ESP32 funcionando correctamente 🚀");
  });

  // Endpoint para comprobar estado
  server.on("/status", HTTP_GET, [](AsyncWebServerRequest *request){
    String json = "{\"status\":\"ok\",\"ip\":\"" + WiFi.localIP().toString() + "\"}";
    request->send(200, "application/json", json);
  });

  server.begin();
  Serial.println("🌐 Servidor HTTP iniciado en el puerto 80");
}

#endif
