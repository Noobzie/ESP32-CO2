"""Example usage basic driver CCS811.py"""

import machine
import time
import driver
import pycom
import socket
import ssl
#import urequests
from network import WLAN


#def main():
#    print('Starting application...')
#    wifi()
    #i2c = I2C(scl=Pin(14), sda=Pin(13))
    # Adafruit sensor breakout has i2c addr: 90; Sparkfun: 91
    # s = CCS811.CCS811(i2c=i2c, addr=90)
    # time.sleep(1)
    # while True:
    #     if s.data_ready():
    #         print('eCO2: %d ppm, TVOC: %d ppb' % (s.eCO2, s.tVOC))
    #         time.sleep(1)
    
def main():
    wlan = WLAN()
    wlan = WLAN(mode=WLAN.STA)
    nets = wlan.scan()
    for net in nets:
        print(net.ssid)
        if net.ssid == 'lopyNet':
            print('Network found!')
            wlan.connect(net.ssid, auth=(net.sec, '12345678'), timeout=5000)
            while not wlan.isconnected():
                machine.idle() # save power while waiting
            print('WLAN connection succeeded!')
            print(wlan.ifconfig())
            break

    # url = '192.168.43.175'
    # res = urequests.post(url, headers={"Content-Type": "application/json", "Accept": "application/json"}, data="")
    # res.close()
    #Damn python

main()