import machine
from machine import Pin,I2C
import time
import driver
import pycom
import socket
import ssl
import urequests as requests
from network import WLAN
import time
import CCS811

    
def main():
    wlan = WLAN()
    wlan = WLAN(mode=WLAN.STA)
    nets = wlan.scan()
    for net in nets:
        print(net.ssid)
        if net.ssid == 'LoraNet':
            print('Network found!')
            wlan.connect(net.ssid, auth=(net.sec, '12345678'), timeout=5000)
            while not wlan.isconnected():
                machine.idle() # save power while waiting
            print('WLAN connection succeeded!')
            print(wlan.ifconfig())
            break

    r =requests.request("GET", 'http://192.168.1.87:4040/OpenDB')
    print(r)
    print(r.content)
    print(r.text)
    r.close()
    readCCS811()

def readCCS811():
    print('Creating i2c')
    i2c = machine.I2C(0, pins=('P13','P14'))
    print('Opening CCS811 lib')
    s = CCS811.CCS811(i2c=i2c, addr=90)
    print('Sleeping for 1 second')
    time.sleep(1)
    print('About to start infinite while loop')
    while True:
        print('Staring infinite while loop')
        if s.data_ready():
            print('eCO2: %d ppm, TVOC: %d ppb' % (s.eCO2, s.tVOC))
            time.sleep(1)
        else:
            print('Data not ready yet')
            time.sleep(2)

main()