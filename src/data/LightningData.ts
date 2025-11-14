import jan from "../lightning/month_01.json";
import feb from "../lightning/month_02.json";
import mar from "../lightning/month_03.json";
import apr from "../lightning/month_04.json";
import may from "../lightning/month_05.json";
import jun from "../lightning/month_06.json";
import jul from "../lightning/month_07.json";
import aug from "../lightning/month_08.json";
import sep from "../lightning/month_09.json";
import oct from "../lightning/month_10.json";
import nov from "../lightning/month_11.json";
import dec from "../lightning/month_12.json";

export type LightningPoint = {
  lat: number;
  lon: number;
  value: number; // or flash_rate, depending on your JSON
};

// If your JSON keys are {lat, lon, flash_rate}, adapt here:
const normalise = (arr: any[]): LightningPoint[] =>
  arr.map((d) => ({
    lat: Number(d.lat),
    lon: Number(d.lon),
    value: Number(d.value),
  }));

export const monthlyLightning: LightningPoint[][] = [
  normalise(jan as any),
  normalise(feb as any),
  normalise(mar as any),
  normalise(apr as any),
  normalise(may as any),
  normalise(jun as any),
  normalise(jul as any),
  normalise(aug as any),
  normalise(sep as any),
  normalise(oct as any),
  normalise(nov as any),
  normalise(dec as any),
];
