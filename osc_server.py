from liblo import *
from threading import Timer
import sys
import time
import serial
import rails

class MuseServer(ServerThread):

    def __init__(self):
       ServerThread.__init__(self, 5000)
       self.blink = 0

    #receive blink data
    @make_method('/muse/elements/blink', 'i')
    def eeg_callback(self, path, args):
        if not self.blink == args[0]:
          rails.post_request(args[0])
          self.blink = args[0]

try:
    server = MuseServer()
except ServerError:
    sys.exit()

server.start()

if __name__ == "__main__":
    while 1:
        time.sleep(1)