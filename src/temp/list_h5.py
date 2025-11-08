# list_h5.py
import h5py, sys
def walk(name, obj):
    if isinstance(obj, h5py.Dataset):
        print("DATASET:", name, "shape=", obj.shape, "dtype=", obj.dtype)
    elif isinstance(obj, h5py.Group):
        print("GROUP   :", name)
with h5py.File(sys.argv[1], "r") as f:
    f.visititems(walk)
