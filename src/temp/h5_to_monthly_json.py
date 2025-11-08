# h5_to_monthly_json.py
import h5py, numpy as np, json, sys, math, os

in_path  = sys.argv[1] if len(sys.argv) > 1 else "lightning.h5"
out_dir  = sys.argv[2] if len(sys.argv) > 2 else "lightning_json"
dataset  = sys.argv[3] if len(sys.argv) > 3 else "HRMC_COM_FR"
THRESH   = float(sys.argv[4]) if len(sys.argv) > 4 else 0.05

os.makedirs(out_dir, exist_ok=True)

with h5py.File(in_path, "r") as f:
    lat = np.asarray(f["Latitude"][:], dtype=float)
    lon = np.asarray(f["Longitude"][:], dtype=float)
    fr  = np.asarray(f[dataset][:], dtype=float)   # (Ny, Nx, 12)

Ny, Nx, Nm = fr.shape

for im in range(Nm):
    arr = []
    slab = fr[:, :, im]  # (Ny, Nx)
    for iy in range(Ny):
        la = float(lat[iy])
        row = slab[iy]
        for ix in range(Nx):
            v = float(row[ix])
            if math.isfinite(v) and v > THRESH:
                arr.append({"lat": la, "lon": float(lon[ix]), "value": v})
    out_path = os.path.join(out_dir, f"month_{im+1:02d}.json")
    with open(out_path, "w") as f:
        json.dump(arr, f, separators=(",", ":"))
    print(f"✅ {out_path}  ({len(arr)} points)")
