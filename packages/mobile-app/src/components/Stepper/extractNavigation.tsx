import { ComponentProps, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StepperNavigation, Tab } from './Tab';

type ScreenProps = ComponentProps<typeof Tab.Screen>;

export type ScreenComponent = Defined<ScreenProps['component']>;

type ScreenComponentProps = ComponentProps<ScreenComponent>;

export const extractNavigation =
    (
        navigationRef: React.MutableRefObject<StepperNavigation | undefined>,
        Component: ScreenComponent,
        // eslint-disable-next-line react/display-name
    ): React.FC<ScreenComponentProps> => props => {
        const navigation = useNavigation<StepperNavigation>();

        useEffect(() => {
            navigationRef.current = navigation;
        }, [navigation]);

        // @ts-expect-error idk something is wrong with typing I think
        return <Component {...props} />;
    };
