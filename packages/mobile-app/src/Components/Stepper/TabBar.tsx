import { TabBarProgressStep, TabBarWrapper } from './Stepper.styles';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

export const TabBar: React.FC<MaterialTopTabBarProps> = ({ state, descriptors }) => (
    <TabBarWrapper>
        {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];



            const isCompleted = state.index >= index;

            return (
                <TabBarProgressStep
                    key={route.key}
                    isCompleted={isCompleted}
                    completedTintColor={options.tabBarActiveTintColor}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isCompleted }}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                />
            );
        })}
    </TabBarWrapper>
);
