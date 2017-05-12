import sys
import json
import h5py
import numpy as np
np.set_printoptions(threshold=np.inf)

def pretty_print(arr):
    print(np.flipud(np.transpose(arr)))

path=sys.argv[1]
array_path= sys.argv[2]
direction=str(sys.argv[3])
xstart=int(sys.argv[4])
xend = int(sys.argv[5])
ystart = int(sys.argv[6])
yend = int(sys.argv[7])
MAX = 5

file = h5py.File(path,'r')

dset = file[array_path]

print (list(dset.shape))
print (len(dset.dims))
pretty_print(dset)


if len(dset.dims) == 1:
    if direction == 'right':
        if len(dset[index1:]) > MAX:
            print (dset[index1:index1+MAX])
        else:
            print(dset[index1:])
    else:
        if len(dset[:index1]) > MAX:
            print (dset[index1- MAX :index1])
        else:
            print(dset[:index1])

print(dset[:,0])
print(dset[0,:])

if len(dset.dims) == 2:

    if xstart == xend == ystart == yend == 0:
        if len(dset[0:]) > MAX:
             if len(dset[0,0:]) > MAX:
                pretty_print(dset[0:0+MAX,0:0+MAX])
             else:
                pretty_print(dset[0:0+MAX,0:])
        else:
             if len(dset[0:]) > MAX:
                pretty_print(dset[0:,0:0+MAX])
             else:
                pretty_print(dset[0:,0:])

    elif direction == 'right':
        if len(dset[xend:]) > MAX:
            pretty_print(dset[xend:xend+MAX,ystart:yend])
        else:
            pretty_print(dset[xend:,ystart:yend])
    elif direction == 'left':
        if len(dset[:xstart]) > MAX:
            pretty_print(dset[xstart-MAX:xstart,ystart:yend])
        else:
            pretty_print(dset[:xstart,ystart:yend])
    elif direction == 'up':
        if len(dset[0,yend:]) > MAX:
            pretty_print(dset[xstart:xend,yend:yend+MAX])
        else:
            pretty_print(dset[xstart:xend,yend:])
    elif direction == 'down':
        if len(dset[0,:ystart]) > MAX:
            pretty_print(dset[xstart:xend,ystart-MAX:ystart])
        else:
            pretty_print(dset[xstart:xend,:ystart])


file.close()
# myjson=json.dumps(dsets)
