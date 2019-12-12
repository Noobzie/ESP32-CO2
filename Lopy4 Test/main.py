#from machine import I2C
import urequests as requests
from network import WLAN
import RandomNumbers
import time
import json
import machine
import ubinascii
#import adafruit_ccs811

    
def main():
    class reading:
        def __init__(self, id, eCO2, TVOC):
            self.id = id
            self.eCO2 = eCO2
            self.TVOC = TVOC


    eCO2Readings = readSensor()
    TVOCReadings = readSensor()
    reading = reading(getHardwareId(), eCO2Readings, TVOCReadings)
    print(json.dumps(reading.__dict__))
    # i2c = I2C(0, pins=('P9','P10'))     # create and use non-default PIN assignments (P10=SDA, P11=SCL)
    # i2c.init(I2C.MASTER, baudrate=20000) # init as a master
    
    # print(i2c.scan())
    # i2c.deinit()                         # turn off the peripheral
    # wlan = WLAN()
    # wlan = WLAN(mode=WLAN.STA)
    # nets = wlan.scan()
    # for net in nets:
    #     print(net.ssid)
    #     if net.ssid == 'LoraNet':
    #         print('Network found!')
    #         wlan.connect(net.ssid, auth=(net.sec, '12345678'), timeout=5000)
    #         while not wlan.isconnected():
    #             machine.idle() # save power while waiting
    #         print('WLAN connection succeeded!')
    #         print(wlan.ifconfig())
    #         break

    # r = requests.request("GET", 'http://192.168.1.87:4040/OpenDB')
    # print(r)
    # print(r.content)
    # print(r.text)
    # r.close()

    

def readSensor():
    i = 0
    eCO2Readings = []
    while(i < 100):
        i = i + 1
        eCO2Readings.append(RandomNumbers.RandomNumbers())
    return eCO2Readings

def getHardwareId():
    return ubinascii.hexlify(machine.unique_id()).decode('utf-8')
    
main()