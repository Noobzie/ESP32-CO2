#include <Adafruit_CCS811.h>

Adafruit_CCS811 ccs;


void setup() {
  //Open serial connection
  Serial.begin(9600);

  //Print "CCS811 test" through the serial bus to confirm working serial connection
  Serial.println("CCS811 test");

  //If the sensor is not working print warning until it works
  if(!ccs.begin()){
    Serial.println("Failed to start sensor! Please check your wiring.");
    while(1);
  }

  //Wait for the sensor to be ready
  while(!ccs.available());

}

//Main loop for reading sensor data
void loop() {
  //Check if sensor is available
  if(ccs.available()){
    //If there is data to read go ahead
    if(!ccs.readData()){
      //Print ifno to serial monitor
      Serial.print("CO2: ");
      Serial.print(ccs.geteCO2());
      Serial.print("ppm, TVOC: ");
      Serial.print(ccs.getTVOC());
      Serial.println();
    }
    else {
      Serial.println("ERROR!");
      while(1);
    }
  }
  delay(500);
}
