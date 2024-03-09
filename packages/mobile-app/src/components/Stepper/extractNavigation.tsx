import { useNavigation } from '@react-navigation/native';
import { StepperNavigation, Tab } from './Tab';
import { ComponentProps, useEffect } from 'react';

type ScreenProps = ComponentProps<typeof Tab.Screen>;

export type ScreenComponent = Defined<ScreenProps['component']>;

type ScreenComponentProps = ComponentProps<ScreenComponent>;

export const extractNavigation =
    (
        setNavigation: React.Dispatch<React.SetStateAction<StepperNavigation | undefined>>,
        Component: ScreenComponent,
    ): React.FC<ScreenComponentProps> =>
    props => {
        const navigation = useNavigation<StepperNavigation>();

        useEffect(() => {
            setNavigation(navigation);
        }, [navigation]);

        // @ts-expect-error idk something is wrong with typing I think
        return <Component {...props} />;
    };
