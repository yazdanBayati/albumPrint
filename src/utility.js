export const convertIncheToPixel = (item) => {
  return window.devicePixelRatio * 160 * item;
};

export const convertPixelToInche = (item) => {
  return Math.floor(item / (window.devicePixelRatio * 160));
};
