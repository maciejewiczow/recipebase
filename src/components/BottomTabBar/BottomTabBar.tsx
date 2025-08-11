import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useIsKeyboardOpen } from '~/utils/useIsKeyoardOpen';
import { ViewIconProps } from '~/views/HomeNavigationView/createViewIcon';
import { IconWrapper, Text, Wrapper } from './BottomTabBar.styles';

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const isKeyboardOpen = useIsKeyboardOpen();
    const insets = useSafeAreaInsets();

    if (isKeyboardOpen) {
        return null;
    }

    return (
        <Wrapper bottomInset={insets.bottom}>
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
};
