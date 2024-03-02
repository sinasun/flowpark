#include <ESP8266WiFi.h>
#include <WiFiClient.h>

const char* ssid = "sina";
const char* password = "haha2020hehe";
const char* host = "192.168.205.16"; // Change this to your server's IP address
const int port = 5000;

WiFiClient client;

const char* site = "parking1";
const int slot = 2;

bool previous_status = false;

void setup() {
  Serial.begin(9600);
  delay(10);

  // Connect to Wi-Fi
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

}

float get_distance() {
  int sensorValue = analogRead(A0);
  float voltage = sensorValue * (3.3 / 1023.0);
  float inches = voltage * 51.8;

  Serial.print("Distance: ");
  Serial.print(inches);
  Serial.println(" inches");

  return inches;
}

void send_message(bool status) {
  // Construct HTTP POST request
  String url = "/publish";
  String postData = "{\"topic\": \"" + String(site) + "\", \"message\": " + "\"" + String(slot) + ":" + String(status) + "\"}";

  Serial.print("Requesting URL: ");
  Serial.println(url);

  client.print("POST " + url + " HTTP/1.1\r\n");
  client.print("Host: " + String(host) + ":" + String(port) + "\r\n");
  client.print("Content-Type: application/json\r\n");
  client.print("Content-Length: ");
  client.print(postData.length());
  client.print("\r\n\r\n");
  client.print(postData);

  Serial.println("Request sent");
}

void connect() {
  Serial.print("Connecting to ");
  Serial.print(host);
  Serial.print(":");
  Serial.println(port);

  while (!client.connect(host, port)) {
    Serial.println("Connection failed!");
  }
}

bool check_parking_slot (float threshold = 10.0) {
  float distance = get_distance();
  if (previous_status == true && threshold < distance) {
    return true;
  } else if (previous_status == false && distance <= threshold) {
    return true;
  }
  return false;
}

void loop() {
  if (check_parking_slot()) {
  	connect();
    send_message(!previous_status);
    previous_status = !previous_status;
  }

  delay(100);
}

