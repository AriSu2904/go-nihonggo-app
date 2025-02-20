import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375; 
const guidelineBaseHeight = 812;

const scaleWidth = (size: number) => (width / guidelineBaseWidth) * size;

const scaleHeight = (size: number) => (height / guidelineBaseHeight) * size;

const scaleFont = (size: number) => {
  const scaleFactor = Math.min(width / guidelineBaseWidth, height / guidelineBaseHeight);
  return Math.round(PixelRatio.roundToNearestPixel(size * scaleFactor));
};

export { width, height, scaleWidth, scaleHeight, scaleFont };
