import { MathUtils, Vector3 } from "three";
import { RESOLUTIONS, CONFIGURATIONS } from "../state/Config";

export const getScreenConfiguration = (width: number, height: number) => {
  // Small screens
  if (width <= RESOLUTIONS.SMALL) {
    return CONFIGURATIONS["phone_portrait"];
  }

  // Phone in landscape
  if (width <= RESOLUTIONS.MEDIUM && width > height) {
    return CONFIGURATIONS["phone_landscape"];
  }

  if (width <= RESOLUTIONS.LARGE && width > height) {
    return CONFIGURATIONS["large"];
  }

  // if (width <= RESOLUTIONS.LARGE) {
  //   return CONFIGURATIONS["large"];
  // }

  // if (width <= RESOLUTIONS.X_LARGE) {
  //   return CONFIGURATIONS[CONFIG_TYPE.TABLET];
  // }

  if (width >= RESOLUTIONS.X_LARGE) {
    return CONFIGURATIONS["extraLarge"];
  }

  return CONFIGURATIONS["extraLarge"];
};

export const latlonToVec3 = (
  lat: number,
  lon: number,
  radius = 10,
  altitude = 0
) => {
  const phi = MathUtils.degToRad(90 - lat); // from +Y (north pole)
  const theta = MathUtils.degToRad(lon + 180); // around Y

  const r = radius + altitude;
  return new Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)), // X
    r * Math.cos(phi), // Y
    r * Math.sin(phi) * Math.sin(theta) // Z
  );
};
