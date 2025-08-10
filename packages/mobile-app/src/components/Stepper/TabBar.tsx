import { useContext } from 'react';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { TabBarHiddenContext } from './context';
import { TabBarProgressStep, TabBarWrapper } from './Stepper.styles';

export const TabBar: React.FC<MaterialTopTabBarProps> = ({ state, descriptors }) => {
    const isHiddenOnFirstStep = useContext(TabBarHiddenContext);

    const isFirstStep = state.index === 0;

    return (
        <TabBarWrapper>
            {!(isHiddenOnFirstStep && isFirstStep) &&
                (isHiddenOnFirstStep ? state.routes.slice(1) : state.routes).map((route, index) => {
                    const { options } = descriptors[route.key];

                    const isCompleted = isHiddenOnFirstStep ? state.index >= index + 1 : state.index >= index;

                    return (
                        <TabBarProgressStep
                            key={route.key}
                            isCompleted={isCompleted}
                            completedTintColor={options.tabBarActiveTintColor}
                            accessibilityState={{ selected: isCompleted }}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                        />
                    );
                })}
        </TabBarWrapper>
    );
};
