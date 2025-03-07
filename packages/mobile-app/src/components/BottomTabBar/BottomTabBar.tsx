import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { ViewIconProps } from '~/views/HomeNavigationView/createViewIcon';
import { IconWrapper, Text, Wrapper } from './BottomTabBar.styles';

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => (
    <Wrapper>
        {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel ?? options.title ?? route.name;

            const Icon = options.tabBarIcon as React.FC<ViewIconProps>;
            const isFocused = state.index === index;

            const onPress = () => {
                const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                    // @ts-expect-error The `merge: true` option makes sure that the params inside the tab screen are preserved, but is not typed properly
                    navigation.navigate({ name: route.name, merge: true });
                }
            };

            const onLongPress = () => {
                navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                });
            };

            return (
                <IconWrapper
                    key={route.key}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                >
                    <Icon focused={isFocused} />
                    <Text focused={isFocused}>{label as string}</Text>
                </IconWrapper>
            );
        })}
    </Wrapper>
);
