import sys
import json
import h5py
import numpy as np

path=sys.argv[1]

cnt = 0
dsets = {}

file = h5py.File(path,'r')
def print_attrs(name, obj):
    if isinstance(obj, h5py.Dataset):
        global cnt
        dsets['info'+str(cnt)] = {}
        dsets['info'+str(cnt)]['path'] = name
        dsets['info'+str(cnt)]['shape'] = list(obj.shape)
        dsets['info'+str(cnt)]['size'] = obj.size
        dsets['info'+str(cnt)]['dimnumber'] = len(obj.dims)
        for i in range(0,len(obj.dims)):
            if not obj.dims[i].label:
                dsets['info'+str(cnt)]['dim'+str(i)] = 'empty'
            else: dsets['info'+str(cnt)]['dim'+str(i)] = obj.dims[i].label
        cnt= cnt+1



file.visititems(print_attrs)
print (dsets)
file.close()
# myjson=json.dumps(dsets)