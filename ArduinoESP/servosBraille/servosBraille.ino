#include <Servo.h>

Servo servos[6];
int servoPins[6] = {2, 3, 4, 5, 6, 7};
int posLevantado = 90;
int posBajado = 0;

const byte brailleAlphabet[27] = {
  B100000, B110000, B100100, B100110, B100010, B110100,
  B110110, B110010, B010100, B010110, B101000, B111000,
  B101100, B101110, B101010, B111100, B111110, B111010,
  B011100, B011110, B101001, B111001, B010111, B101101,
  B101111, B101011, B000000
};

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 6; i++) {
    servos[i].attach(servoPins[i]);
    servos[i].write(posBajado);
  }
  Serial.println("Arduino listo para recibir comandos Braille.");
}

void loop() {
  if (Serial.available()) {
    String texto = Serial.readStringUntil('\n');
    texto.trim();
    Serial.println("Recibido: " + texto);
    mostrarTexto(texto);
  }
}

void mostrarTexto(String texto) {
  for (int i = 0; i < texto.length(); i++) {
    mostrarBraille(tolower(texto[i]));
    delay(1500);
  }
}

void mostrarBraille(char letra) {
  int index = (letra >= 'a' && letra <= 'z') ? letra - 'a' : 26;
  byte pattern = brailleAlphabet[index];
  for (int i = 0; i < 6; i++) {
    if (bitRead(pattern, 5 - i))
      servos[i].write(posLevantado);
    else
      servos[i].write(posBajado);
  }
}
