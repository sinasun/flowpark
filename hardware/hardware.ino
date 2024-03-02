#include <ESP8266WiFi.h>
#include <WiFiClient.h>

const char* ssid = "sina";
const char* password = "haha2020hehe";
const char* host = "192.168.205.16"; // Change this to your server's IP address
const int port = 3000;

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

void loop() {
  // Send POST request
  WiFiClient client;

  Serial.print("Connecting to ");
  Serial.print(host);
  Serial.print(":");
  Serial.println(port);

  if (!client.connect(host, port)) {
    Serial.println("Connection failed!");
    return;
  }

  // Construct HTTP POST request
  String url = "/sendPostRequest";
  String postData = "{\"key\": \"value\"}";
  
  Serial.print("Requesting URL: ");
  Serial.println(url);

  client.print("POST " + url + " HTTP/1.1\r\n");
  client.print("Host: " + String(host) + "\r\n");
  client.print("Content-Type: application/json\r\n");
  client.print("Content-Length: ");
  client.print(postData.length());
  client.print("\r\n\r\n");
  client.print(postData);

  Serial.println("Request sent");
  delay(5000); // Send request every 5 seconds
}

