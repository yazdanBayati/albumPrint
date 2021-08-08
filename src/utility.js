export const convertIncheToPixel = (item) => {
  return window.devicePixelRatio * 160 * item;
};

export const convertPixelToInche = (item) => {
  return item / (window.devicePixelRatio * 160);
};
