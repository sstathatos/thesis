import sys
import json
import h5py
import numpy as np
import math
np.set_printoptions(threshold=np.inf)

path=sys.argv[1]
array_path= sys.argv[2]
dim1=int(sys.argv[3])
dim2=int(sys.argv[4])
dim3Value = int(sys.argv[5])
dim2Value = int(sys.argv[6])
state = str(sys.argv[7])
ystart = int(sys.argv[8])
yend = int(sys.argv[9])
zoomstart = int(sys.argv[10])
zoomend = int(sys.argv[11])

def formatZoom(sorted_arr,dim2Value,zoomstart,zoomend):
    zoomed_arr =sorted_arr[sorted_arr[:,dim2Value]>=zoomstart]
    zoomed_arr =zoomed_arr[zoomed_arr[:,dim2Value]<=zoomend]
    print('zoomed in slice: ')
    print(np.transpose(zoomed_arr))
    return zoomed_arr

def format_3Ddset(dset,dim1,dim2,dim3Value):
    if dim1 == 1 and dim2 == 2:
        return dset[:,:,dim3Value]
    if dim1 == 2 and dim2==1:
        return np.transpose(dset[:,:,dim3Value])
    if dim1 == 2 and dim2 ==3:
        return dset[dim3Value,:,:]
    if dim1 == 3 and dim2 ==2:
        return np.transpose(dset[dim3Value,:,:])
    if dim1 == 1 and dim2 ==3:
        return dset[:,dim3Value,:]
    if dim1 == 3 and dim2 ==1:
        return np.transpose(dset[:,dim3Value,:])

MAX_horizontal = 25
MAX_vertical = 7

file = h5py.File(path,'r')
dset = file[array_path]

print('Whole dataset dimensions: ',list(dset.shape))
print('Whole dataset: ')
print(np.transpose(dset[()]))


# np.flipud(np.transpose(arr[xstart:xend,ystart:yend])).tolist()
#OI UPOLOGISMOI OLOI PREPEI NA GINONTAI XWRIS TO TRANSPOSE, STO TELOS TUPWNOUME ME TRANSPOSE


arr = format_3Ddset(dset,dim1,dim2,dim3Value);

print('A slice of the dataset: ')
print(np.transpose(arr))
print('Slice dimentions: ',list(arr.shape))
print('An 1Darray slice: ',arr[:,dim2Value])

sorted_arr= arr[np.argsort(arr[:,dim2Value])]
print('Sorted slice: ')
print(np.transpose(sorted_arr))

if state == 'zoomin':
    sorted_arr= formatZoom(sorted_arr,dim2Value,zoomstart,zoomend)

step= math.ceil(len(sorted_arr)/MAX_horizontal)
print(step)

sampled_sor= sorted_arr[::step,:]
print('Sampled sorted arr: ')
print(np.transpose(sampled_sor))
print('Sampled sorted arr dimentions: ',list(sampled_sor.shape))

if len(sampled_sor[0,:]) > MAX_vertical :
    sort_sampled_maxed=sampled_sor[:,0:MAX_vertical]
    print('Sampled sorted arr with max vertical: ')
    print(np.transpose(sort_sampled_maxed))
    print('Sampled sorted arr dimentions: ',list(sort_sampled_maxed.shape))
else
    sort_sampled_maxed=sampled_sor[:,0:]
    print('Sampled sorted arr without max: ')
    print(np.transpose(sort_sampled_maxed))
    print('Sampled sorted arr dimentions: ',list(sort_sampled_maxed.shape))

