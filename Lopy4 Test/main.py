from machine import I2C
import urequests as requests
from network import WLAN
import time
import json
import machine
import ubinascii
from time import sleep
import CCS811

    
def main():
    class reading:
        def __init__(self, id, eCO2, TVOC):
            self.id = id
            self.eCO2 = eCO2
            self.TVOC = TVOC


    connection = connectToWiFi()
    deviceId = getDeviceId()

    index = 1
    while (index > 0):       #Main loop
        index = index - 1
        readings = readSensor()
        x = { "id": deviceId,
              "eCO2" : readings[0],
              "TVOC" : readings[1]}
        readingsJSON = json.dumps(x)
        if (connection.isconnected()):
            print("Connection is OK now sending:")
            print(readingsJSON)
            sendReadings(readingsJSON)
        else:
            connection = connectToWiFi()
            sendReadings(readingsJSON)
    

def connectToWiFi():
    wlan = WLAN()
    wlan = WLAN(mode=WLAN.STA)
    nets = wlan.scan()
    for net in nets:
        print(net.ssid)
        if net.ssid == 'ENTER THE ID':
            print('Network found!')
            wlan.connect(net.ssid, auth=(net.sec, 'ENTER THE PASSWORD'), timeout=5000)
            while not wlan.isconnected():
                machine.idle() # save power while waiting
            print('WLAN connection succeeded!')
            print(wlan.ifconfig())
            return wlan

def readSensor():
    i = 0
    eCO2Readings = []
    TVOCReadings = []
    i2c = I2C(0, pins=('P9','P10'))     # create and use non-default PIN assignments (P10=SDA, P11=SCL)
    i2c.init(I2C.MASTER, baudrate=20000) # init as a master
    
    s = CCS811.CCS811(i2c=i2c, addr=90)
    time.sleep(1)
    counter = 0
    while (counter < 10):
        if s.data_ready():
            print('eCO2: %d ppm, TVOC: %d ppb' % (s.eCO2, s.tVOC))
            eCO2Readings.append(s.eCO2)
            TVOCReadings.append(s.tVOC)
            time.sleep(1)
            counter = counter + 1

    i2c.deinit()                         # turn off the peripheral
    readings = [eCO2Readings, TVOCReadings]
    return readings

def getHardwareId():
    return ubinascii.hexlify(machine.unique_id()).decode('utf-8')

def getDeviceId():
    print("Y U NO WORK")
    hardWareId = {"hardwareId": getHardwareId()}
    hardwareIdJson = json.dumps(hardWareId)
    print(hardwareIdJson)
    r = requests.post('http://192.168.1.159:4040/getNewId', headers = {'content-type': 'application/json'}, data = hardwareIdJson).json()
    #r = requests.request("POST", 'http://192.168.1.159:4040/getNewId', hardwareIdJson, True, json=hardwareIdJson)
    print(r)
    deviceId = r
    return deviceId

def sendReadings(readings):
    r = requests.post('http://192.168.1.159:4040/sendMeasurements', headers = {'content-type': 'application/json'}, data = readings)
    


main()