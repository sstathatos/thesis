import sys
import json
import h5py
import numpy as np
import math
np.set_printoptions(threshold=np.inf)
np.set_printoptions(suppress=True)

final_arr={}

path=str(sys.argv[1])
array_path= str(sys.argv[2])
dim1=int(sys.argv[3])
dim2=int(sys.argv[4])
dim2Value = int(sys.argv[5]) #i timi tou kathorizei ti thewroume orizontio aksona
currystart = int(sys.argv[6])
curryend = int(sys.argv[7])
zoomstart = float(sys.argv[8])
zoomend = float(sys.argv[9])
direction = str(sys.argv[10])


def convertFloat2DArray(my_arr):
    return list(map(lambda subset: list(map(lambda value:'%.2f' % value,subset)),my_arr))

def convertFloat1DArray(my_arr):
    return list(map(lambda value:'%.2f' % value,my_arr))

def full_print(arr,x,y):
#     print('final arr: ')
#     print(np.transpose(arr))
#     print('final arr dimentions: ',list(arr.shape))
#     print('final arr y axis limits: ',[x,y])

    my_arr = np.transpose(arr).tolist()
    final_arr['arr']= convertFloat2DArray(my_arr)
    final_arr['arr_dims']=list(arr.shape)
    final_arr['arr_y_limits']=[x,y]

def formatZoom(sorted_arr,dim2Value,zoomstart,zoomend):
    zoomed_arr =sorted_arr[sorted_arr[:,dim2Value]>=zoomstart]
    zoomed_arr =zoomed_arr[zoomed_arr[:,dim2Value]<=zoomend]
#     print('zoomed 2D: ')
#     print(np.transpose(zoomed_arr))
#     print('zoomed 2D dimensions: ',list(zoomed_arr.shape))
    return zoomed_arr



def format_3Ddset(dset,dim1,dim2,dim3Value):
    final_arr['dim_names']=[dset.dims[dim1-1].label,dset.dims[dim2-1].label]
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

def format_2Ddset(dset,dim1,dim2):
    if dim1 ==1 and dim2 ==2:
        return dset[:,:]
    else:
        return np.transpose(dset[:,:])

def remove_duplicates(sampled_sor,dim2Value):
    my_x = sampled_sor[:,dim2Value]
    copy_arr = sampled_sor
    previous = None
    todelete = []

    for x in range(0, len(my_x)):
        if my_x[x] == previous:
#             print(sampled_sor[x-1,:])
#             print(sampled_sor[x,:])
            mean = (sampled_sor[x-1,:]+sampled_sor[x,:])/2
            copy_arr[x-1,:] = mean
            todelete.append(x)

        previous = my_x[x]

    copy_arr = np.delete(copy_arr,np.s_[todelete], axis=0)
    return copy_arr


MAX_horizontal = 80
MAX_vertical = 8


file = h5py.File(path,'r')
dset = file[array_path]

# print('Whole dataset: ')
# print(np.transpose(dset[()]))
# print('Whole dataset dimensions: ',list(dset.shape))

#OI UPOLOGISMOI OLOI PREPEI NA GINONTAI XWRIS TO TRANSPOSE, STO TELOS TUPWNOUME ME TRANSPOSE

if len(dset.shape) == 3:
    dim3Value = int(sys.argv[11])
    arr = format_3Ddset(dset,dim1,dim2,dim3Value)
    final_arr['2d_arr_dims'] = list(arr.shape)
elif len(dset.shape) ==2:
    final_arr['dim_names']=[dset.dims[dim1-1].label,dset.dims[dim2-1].label]
    arr= format_2Ddset(dset,dim1,dim2)
    final_arr['2d_arr_dims'] = list(arr.shape)

# print('2D slice of dataset: ')
# print(np.transpose(arr))
# print('2D slice dimentions: ',list(arr.shape))

sorted_arr= arr[np.argsort(arr[:,dim2Value])]
# print('Sorted 2D: ')
# print(np.transpose(sorted_arr))
# print('Sorted 2D dimentions: ',list(sorted_arr.shape))

# final_arr['whole_2D']=np.transpose(sorted_arr).tolist()
# final_arr['whole_2D_dims']=list(sorted_arr.shape)

if zoomstart!=0 or zoomend!=0:
    #zoom
    sorted_arr= formatZoom(sorted_arr,dim2Value,zoomstart,zoomend)

step= math.ceil(len(sorted_arr)/MAX_horizontal)
# print(step)

sampled_sor= sorted_arr[::step,:]
# print('Sampled 2D: ')
# print(len(sampled_sor[:,0]))
# print('Sampled 2D dimentions: ',list(sampled_sor.shape))

sampled_sor = remove_duplicates(sampled_sor,dim2Value)
# print(len(sampled_sor[:,0]))

sorted_xaxis = np.copy(sampled_sor[:,dim2Value])

sampled_sor = np.delete(sampled_sor,(dim2Value), axis=1)

# dset.dims[dim1-1].label
sampled_xaxis = list(sorted_xaxis)
# dset.dims[dim1-1].label
sampled_xaxis =convertFloat1DArray(sampled_xaxis)
# print(sampled_xaxis)
final_arr['xaxis']=sampled_xaxis

if direction == 'init' and zoomstart == 0 and zoomend == 0:
    #init
    if len(sampled_sor[0,:]) > MAX_vertical :
        sort_sampled_maxed=sampled_sor[:,0:MAX_vertical]
        full_print(sort_sampled_maxed,0,MAX_vertical)
    else:
        sort_sampled_maxed=sampled_sor[:,0:]
        full_print(sort_sampled_maxed,0,len(sampled_sor[0,:]))


if direction == 'up':
    #moved up on vertical axis

    if len(sampled_sor[0,curryend:]) > MAX_vertical :
        sort_sampled_maxed=sampled_sor[:,curryend:MAX_vertical+curryend]
        full_print(sort_sampled_maxed,curryend,curryend+MAX_vertical)
    else:
        sort_sampled_maxed=sampled_sor[:,curryend:]
        full_print(sort_sampled_maxed,curryend,curryend+len(sampled_sor[0,curryend:]))


if direction == 'down':
    #moved down on vertical axis

    if len(sampled_sor[0,:currystart]) > MAX_vertical :
        sort_sampled_maxed=sampled_sor[:,currystart-MAX_vertical:currystart]
        full_print(sort_sampled_maxed,currystart-MAX_vertical,currystart)
    else:
        sort_sampled_maxed=sampled_sor[:,:currystart]
        full_print(sort_sampled_maxed,currystart-len(sampled_sor[0,:currystart]),currystart)


if direction == 'static':
    #didnt move on vertical axis

    sort_sampled_maxed=sampled_sor[:,currystart:curryend]
    full_print(sort_sampled_maxed,currystart,curryend)


print(final_arr)
