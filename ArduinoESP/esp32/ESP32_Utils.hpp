#ifndef ESP32_UTILS_HPP
#define ESP32_UTILS_HPP

#include <WiFi.h>
#include "config.h"

void ConnectWiFi_STA() {
  Serial.println("\nConectando a WiFi...");
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ WiFi conectado");
  Serial.print("📶 IP asignada: ");
  Serial.println(WiFi.localIP());
}

#endif
