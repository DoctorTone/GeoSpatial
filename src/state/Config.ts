import { Vector3 } from "three";

export const RESOLUTIONS = {
  SMALL: 600,
  MEDIUM: 900,
  LARGE: 1200,
  X_LARGE: 1536,
};

export const INTERACTIONS = {
  PAN: true,
  ROTATE: true,
};

export const TARGET_POSITION = {
  X: 0,
  Y: 0,
  Z: 0,
};

export const CONFIGURATIONS = {
  phone_portrait: new Vector3(0, 0, 30),
  phone_landscape: new Vector3(0, 0, 20),
  ipad_portrait: new Vector3(0, 0, 25),
  ipad_landscape: new Vector3(0, 0, 20),
  tablet: new Vector3(0, 0, 25),
  large: new Vector3(0, 0.5, 3),
  extraLarge: new Vector3(0, 0, 20),
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const EARTH = {
  RADIUS: 10,
  HEIGHT: 0.01,
  SEGMENTS: 64,
};

export const LIGHTNING = {
  SIZE: 0.05,
  SEGMENTS: 16,
};

export type ScreenSize = {
  width: number;
  height: number;
};
