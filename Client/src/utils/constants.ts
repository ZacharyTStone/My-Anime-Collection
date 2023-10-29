import {
  pegasus,
  pikachu,
  shinji,
  vegeta,
  kaneki,
  light,
  erwin,
} from "../assets/images/testimonials/index";

export const SMALL_MOBILE = 320;
export const MEDIUM_MOBILE = 375;
export const LARGE_MOBILE = 425;
export const TABLET = 768;
export const DESKTOP = 1024;
export const LARGE_DESKTOP = 1440;
export const EXTRA_LARGE_DESKTOP = 2560;

export const VIEWPORTS = {
  SMALL_MOBILE,
  MEDIUM_MOBILE,
  LARGE_MOBILE,
  TABLET,
  DESKTOP,
  LARGE_DESKTOP,
  EXTRA_LARGE_DESKTOP,
};

export interface TESTIMONIALS_TYPE {
  nameKey: string;
  img: string;
  textKey: string;
}
export const TESTIMONIALS: TESTIMONIALS_TYPE[] = [
  {
    nameKey: "vegeta",
    img: vegeta,
    textKey: "landing.testimonials.vegeta.description",
  },
  {
    nameKey: "pikachu",
    img: pikachu,
    textKey: "landing.testimonials.pikachu.description",
  },
  {
    nameKey: "shinji",
    img: shinji,
    textKey: "landing.testimonials.shinji.description",
  },
  {
    nameKey: "pegasus",
    img: pegasus,
    textKey: "landing.testimonials.pegasus.description",
  },
  {
    nameKey: "kaneki",
    img: kaneki,
    textKey: "landing.testimonials.kaneki.description",
  },
  {
    nameKey: "light",
    img: light,
    textKey: "landing.testimonials.light.description",
  },
  {
    nameKey: "erwin",
    img: erwin,
    textKey: "landing.testimonials.erwin.description",
  },
];
