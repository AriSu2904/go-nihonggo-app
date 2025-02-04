import { height, width } from "@/utils/sizeContext"
import { FC } from "react";
import { Image, View } from "react-native"

type BackgrounImageProps = {
    screenWidth?: number;
    height?: number;
    opacity?: number;
    top?: number;
}
const screenHeight = height;

const BackgroundImage: FC<BackgrounImageProps> = ({
    screenWidth = 1,
    height = screenHeight,
    opacity = 0.7,
    top = 0
}) => {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require('../assets/images/dottedBg.png')}
          style={{
            width: width * screenWidth,
            height: height * 0.25,
            zIndex: 2,
            position: 'absolute',
            opacity: opacity,
            top: top,
          }}
          resizeMode={'contain'}
        />
      </View>
    );
  };

export default BackgroundImage;