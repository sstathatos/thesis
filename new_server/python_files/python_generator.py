import h5py
import numpy as np
import random


x=2600
y=14
z=3

numpy3d=np.random.randint(100,size=(x,y,z))
numpy2d=np.random.randint(100,size=(x,y))
numpy1d=np.random.randint(100,size=(x))

file = h5py.File('h5examples/asdf.h5','w')
# d3dset = file.create_dataset("d3dset",(x,y,z), h5py.h5t.STD_I32BE)
# d3dset=numpy3d
file['d3dset']=numpy3d
file['d3dset'].dims[0].label = 'x'
file['d3dset'].dims[1].label = 'y'
file['d3dset'].dims[2].label = 'z'
# file['d3dset'].dims[2].label = 'z'

subg1 = file.create_group("subgroup1")
# d2dset = subg1.create_dataset("d2dset",(x,y), h5py.h5t.STD_I32BE)
# d2dset=numpy2d
subg1['d2dset']=numpy2d
subg1['d2dset'].dims[0].label = 'x'
subg1['d2dset'].dims[1].label = 'y'


subg2 = subg1.create_group("subgroup2")
# d1dset = subg2.create_dataset("d1dset",(x,), h5py.h5t.STD_I32BE)
# d1dset=numpy1d
subg2['d1dset']=numpy1d
subg2['d1dset'].dims[0].label = 'x'

# print('start sorting...')
# print(np.sort(file['d3dset']))
# print('sort done')


# print (file.name)#
# print (list(file.values()))
# print (list(file.keys()))#
# print (list(file.items()))
# print (list(d3dset.shape))#
# print (d3dset.size) #
file.close()