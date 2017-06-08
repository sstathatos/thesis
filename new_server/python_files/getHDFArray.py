import sys
import json
import h5py
import numpy as np
np.set_printoptions(threshold=np.inf)

json_arr={}

def save_to_json(arr,xstart,xend,ystart,yend):
    if xstart < 0 or xend <0 or ystart <0 or yend <0:
        json_arr["current_array"]=[].tolist()
    else:
        json_arr["current_array_edge_points"]=[xstart,xend,ystart,yend]
        json_arr["current_array"]=np.flipud(np.transpose(arr[xstart:xend,ystart:yend])).tolist()

def save_to_json1D(a,b,c) :
    json_arr["current_array_shape"]=[a,b]
    json_arr["current_array"]=c.tolist()

def format_3Ddset(dset,dim1,dim2,dim3Value):
    if dim1 == 1 and dim2 ==2:
        return dset[:,:,dim3Value]
    if dim1 == 2 and dim2 ==3:
        return dset[dim3Value,:,:]
    if dim1 == 1 and dim2 ==3:
        return dset[:,dim3Value,:]

path=sys.argv[1]
array_path= sys.argv[2]
direction=str(sys.argv[3])
xstart=int(sys.argv[4])
xend = int(sys.argv[5])

if len(sys.argv) == 8:
    ystart = int(sys.argv[6])
    yend = int(sys.argv[7])

elif len(sys.argv) == 11:
    ystart = int(sys.argv[6])
    yend = int(sys.argv[7])
    dim1 = int(sys.argv[8])
    dim2 = int(sys.argv[9])
    dim3Value = int(sys.argv[10])

MAX = 5
file = h5py.File(path,'r')
dset = file[array_path]

if len(dset.dims) == 1:
    json_arr["number_of_dimentions"]=len(dset.dims)
    json_arr["shape_of_array"]=list(dset.shape)
    json_arr["whole_array"]=dset[()].tolist()

    if direction == 'init':
            if len(dset[0:]) > MAX:
                save_to_json1D(0,MAX,dset[0:MAX])
            else:
                save_to_json1D(0,len(dset[0:]),dset[0:])
    elif direction == 'right':
        if len(dset[xend:]) > MAX:
            save_to_json1D(xend,xend+MAX,dset[xend:xend+MAX])
        else:
            save_to_json1D(xend,xend+len(dset[xend:]),dset[xend:])
    else:
        if len(dset[:xstart]) > MAX:
            save_to_json1D(xstart-MAX,xstart,dset[xstart- MAX :xstart])
        else:
            save_to_json1D(xstart-len(dset[:xstart]),xstart,dset[:xstart])

else:

    if len(dset.dims) == 3:
        dset= format_3Ddset(dset,dim1,dim2,dim3Value)

    json_arr["number_of_dimentions"]=len(dset.shape)
    json_arr["shape_of_array"]=list(dset.shape)
#     print(dset[:,0])
#     print(dset[0,:])
    #json_arr["whole_array"]=np.flipud(np.transpose(dset[:,:])).tolist()

    if direction == 'init':
        if len(dset[0:]) > MAX:
             if len(dset[0,0:]) > MAX:
                save_to_json(dset,0,0+MAX,0,0+MAX)
             else:
                save_to_json(dset,0,0+MAX,0,len(dset[0,0:]))
        else:
             if len(dset[0:]) > MAX:
                save_to_json(dset,0,len(dset[0:]),0,0+MAX)
             else:
                save_to_json(dset,0,len(dset[0:]),0,len(dset[0,0:]))

    elif direction == 'right':
        if len(dset[xend:]) > MAX:
            save_to_json(dset,xend,xend+MAX,ystart,yend)
        else:
            save_to_json(dset,xend,xend+len(dset[xend:]),ystart,yend)
    elif direction == 'left':
        if len(dset[:xstart]) > MAX:
            save_to_json(dset,xstart-MAX,xstart,ystart,yend)
        else:
            save_to_json(dset,xstart-len(dset[:xstart]),xstart,ystart,yend)
    elif direction == 'up':
        if len(dset[0,yend:]) > MAX:
            save_to_json(dset,xstart,xend,yend,yend+MAX)
        else:
            save_to_json(dset,xstart,xend,yend,yend+len(dset[0,yend:]))
    elif direction == 'down':
        if len(dset[0,:ystart]) > MAX:
            save_to_json(dset,xstart,xend,ystart-MAX,ystart)
        else:
            save_to_json(dset,xstart,xend,ystart-len(dset[0,:ystart]),ystart)

# arr=json.dumps(json_arr)
print(json_arr)
file.close()