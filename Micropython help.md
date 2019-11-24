## Micropython help

When using urequests from https://github.com/micropython/micropython-lib/tree/master/urequests

and a request gives error: File "/flash/lib/urequests.py", line 53, in request
TypeError: function takes 2 positional arguments but 4 were given

Replace line 53 : ai = usocket.getaddrinfo(host, port, 0, usocket.SOCK_STREAM)

with: ai = usocket.getaddrinfo(host, port)