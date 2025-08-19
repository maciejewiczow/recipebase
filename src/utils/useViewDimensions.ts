import { useCallback, useState } from 'react';
import { LayoutRectangle } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

type Dimensions = LayoutRectangle;

type Result = [Dimensions, Required<ViewProps>['onLayout']];

export const useViewDimensions = (): Result => {
    const [dimensions, setDimensions] = useState<Dimensions>({
        height: 1,
        width: 1,
        x: 0,
        y: 0,
    });

    const onLayout = useCallback<Required<ViewProps>['onLayout']>(e => {
        setDimensions({
            ...e.nativeEvent.layout,
        });
    }, []);

    return [dimensions, onLayout];
};
