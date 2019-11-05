#include <WiFi.h>
#include <FirebaseESP32.h>

void connectWifi();

void setup() {
  Serial.begin(9600);   //Open serial connection
  connectWifi();        //Connect to WiFi network
  Firebase.begin("firebase_url", "your_firebase_API_key");
}

void loop() {
  // put your main code here, to run repeatedly:

}


void connectWifi() {
  const char* ssid = "Fontys WiFi";
  const char* password = "MyPassword";

  // Let us connect to WiFi
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("......");
  Serial.println("WiFi Connected....IP Address:");
  Serial.println(WiFi.localIP());
}
