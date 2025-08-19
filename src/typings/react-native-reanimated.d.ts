import { LayoutAnimation } from 'react-native-reanimated';

declare module 'react-native-reanimated' {
    type LayoutAnimationValues = CurrentLayoutAnimationsValues &
        TargetLayoutAnimationsValues &
        WindowDimensions;

    interface CurrentLayoutAnimationsValues {
        currentOriginX: number;
        currentOriginY: number;
        currentWidth: number;
        currentHeight: number;
        currentBorderRadius: number;
        currentGlobalOriginX: number;
        currentGlobalOriginY: number;
    }

    type TargetLayoutAnimationsValues = {
        targetOriginX: number;
        targetOriginY: number;
        targetWidth: number;
        targetHeight: number;
        targetBorderRadius: number;
        targetGlobalOriginX: number;
        targetGlobalOriginY: number;
    };

    interface WindowDimensions {
        windowWidth: number;
        windowHeight: number;
    }

    type CustomLayoutTransition = (values: LayoutAnimationValues) => LayoutAnimation;
}
