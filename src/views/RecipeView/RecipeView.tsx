import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components/native';
import { CollapsibleHeaderScrollView } from '~/components/CollapsibleHeaderScrollView';
import { RootStackParams } from '~/RootNavigation';
import { useRootStore } from '~/RootStoreContext';
import { useRunCancellablePromise } from '~/utils/useRunCancellablePromise';
import { BackIconSvg } from './BackIconSvg';
import { IngredientList } from './IngredientList';
import { iconSize, MoreIconSvg } from './MoreIconSvg';
import { MultiplierSelect } from './MultiplierSelect';
import { StartButton } from './StartButton';
import { StepsList } from './StepsList';
import {
    BackIconWrapper,
    Content,
    Description,
    ImageGradientOverlay,
    IngredientsHeaderRow,
    MenuItemText,
    MenuItemWrapper,
    MenuWrapper,
    MethodSectionHeader,
    MoreIconPlaceholder,
    RecipeImage,
    RecipeName,
    RecipeNameRow,
    SectionHeader,
    Separator,
    StartButtonWrapper,
    TagList,
    Wrapper,
} from './RecipeView.styles';

const headerMaxHeight = 380;
const headerAnimationEndAt = 250;

export const RecipeView: React.FC<NativeStackScreenProps<RootStackParams, 'Recipe'>> = observer(
    ({ route, navigation }) => {
        const { currentRecipe } = useRootStore();
        const theme = useTheme();
        const insets = useSafeAreaInsets();
        const [isScrollViewAtTheBotttom, setIsScrollViewAtTheBotttom] = useState(false);

        const scrollVerticalOffset = useSharedValue(0);

        useRunCancellablePromise(
            () => currentRecipe.fetchRecipeById(route.params.recipeId),
            [route.params.recipeId],
        );

        const headerMinHeight = 70 + insets.top;

        const menuWrapperTranslationStyle = useAnimatedStyle(() => ({
            transform: [
                {
                    translateY: interpolate(
                        scrollVerticalOffset.value,
                        [0, headerAnimationEndAt],
                        [0, -(headerMaxHeight - headerMinHeight / 2 + iconSize / 2 + 10)],
                        Extrapolation.CLAMP,
                    ),
                },
            ],
        }));

        const editCurrentRecipe = () => {
            // TODO: Edit recipe
            // currentRecipe.makeCurrentRecipeEditable();
            // tags.copyRecipeTagsToDraftTags(currentRecipe.currentRecipe);
            // navigation.navigate('HomeTabNavigator', { screen: 'Create', params: { isEdit: true } });
        };

        const deleteCurrentRecipe = () => {
            Alert.alert(
                'Are you sure?',
                'The deleted recipes list can be found in the settings',
                [
                    {
                        text: 'Ok',
                        onPress: async () => {
                            await currentRecipe.delete();

                            navigation.navigate('HomeTabNavigator', {
                                screen: 'Home',
                            });
                        },
                    },
                    {
                        text: 'Cancel',
                    },
                ],
                { cancelable: true },
            );
        };

        if (!currentRecipe.recipe || currentRecipe.isFetchingCurrentRecipe) {
            return (
                <Wrapper>
                    <ActivityIndicator
                        color="#777"
                        size={60}
                    />
                </Wrapper>
            );
        }

        return (
            <Wrapper>
                <BackIconWrapper onPress={() => navigation.goBack()}>
                    <SafeAreaView>
                        <BackIconSvg />
                    </SafeAreaView>
                </BackIconWrapper>
                <MenuWrapper
                    style={menuWrapperTranslationStyle}
                    headerMaxHeight={headerMaxHeight}
                >
                    <Menu>
                        <MenuTrigger>
                            <MoreIconSvg />
                        </MenuTrigger>
                        <MenuOptions optionsContainerStyle={{ backgroundColor: theme.palette.background[1] }}>
                            <MenuOption onSelect={editCurrentRecipe}>
                                <MenuItemWrapper>
                                    <MenuItemText>Edit</MenuItemText>
                                </MenuItemWrapper>
                            </MenuOption>
                            <MenuOption onSelect={deleteCurrentRecipe}>
                                <MenuItemWrapper>
                                    <MenuItemText>Delete</MenuItemText>
                                </MenuItemWrapper>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </MenuWrapper>
                <CollapsibleHeaderScrollView
                    maxHeight={headerMaxHeight}
                    minHeight={headerMinHeight}
                    anmiationEndAt={headerAnimationEndAt}
                    headerBorderRadius={parseInt(theme.border.radiusGigantic)}
                    headerBlurredContent={
                        <>
                            <ImageGradientOverlay />
                            <RecipeImage source={{ uri: currentRecipe.recipe.coverImage }} />
                        </>
                    }
                    scrollVerticalOffset={scrollVerticalOffset}
                    setIsAtEnd={setIsScrollViewAtTheBotttom}
                >
                    <Content bottomInset={insets.bottom}>
                        <RecipeNameRow>
                            <RecipeName>{currentRecipe.recipe.name}</RecipeName>
                            <MoreIconPlaceholder />
                        </RecipeNameRow>
                        <TagList
                            recipe={currentRecipe.recipe}
                            noHighlightSelected
                        />
                        {!!currentRecipe.recipe.description && (
                            <>
                                <Description>{currentRecipe.recipe.description}</Description>
                                <Separator />
                            </>
                        )}
                        <IngredientsHeaderRow>
                            <SectionHeader>Ingredients</SectionHeader>
                            <MultiplierSelect />
                        </IngredientsHeaderRow>
                        <IngredientList />
                        <MethodSectionHeader>Method</MethodSectionHeader>
                        <StepsList />
                    </Content>
                </CollapsibleHeaderScrollView>
                <StartButtonWrapper>
                    <StartButton
                        isDocked={isScrollViewAtTheBotttom}
                        onPress={() => navigation.navigate('RecipeMethod')}
                    />
                </StartButtonWrapper>
            </Wrapper>
        );
    },
);
