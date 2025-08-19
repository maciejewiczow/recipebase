import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { GradientBackground } from '~/components/GradientBackground';
import { HeadingBase, TextBase } from '~/components/Text';
import { SmallTagList } from '../HomeNavigationView/HomeView/SmallTagList';
import { iconSize } from './MoreIconSvg';

const contentVerticalPadding = 24;
const contentHorizontalPadding = 16;

export const Wrapper = styled.View`
    flex: 1;
`;

export const RecipeImage = styled.Image`
    width: 100%;
    height: 100%;
    resize-mode: cover;
`;

export const ImageGradientOverlay = styled(LinearGradient).attrs({
    colors: ['#00000088', '#00000000'],
    end: {
        x: 0.5,
        y: 0.6,
    },
})`
    z-index: 120;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
` as React.FC<Omit<LinearGradientProps, 'colors'>>;

export const BackIconWrapper = styled.Pressable`
    padding: 18px;
    padding-top: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 40;
`;

export const MoreIconPlaceholder = styled.View`
    width: ${iconSize}px;
    height: ${iconSize}px;
`;

export const MenuWrapper = styled(Animated.View)<{ headerMaxHeight: number }>`
    position: absolute;
    top: ${({ headerMaxHeight }) => headerMaxHeight + contentVerticalPadding + 5}px;
    right: ${contentHorizontalPadding}px;
    z-index: 50;
`;

export const MenuItemWrapper = styled.View`
    padding: 6px 12px;
`;

export const MenuItemText = styled(TextBase).attrs({
    size: 'sm',
})``;

export const Text = styled.Text`
    color: #666;
`;

export const SectionTitle = styled(TextBase)<{ isFirstChild?: boolean }>`
    margin-bottom: 8px;
    margin-top: 12px;
    padding-left: 6px;
`;

export const Content = styled(GradientBackground)<{ bottomInset: number }>`
    flex: 1;
    padding: ${contentVerticalPadding}px ${contentHorizontalPadding}px;
    position: relative;
    top: -${({ theme }) => theme.border.radiusGigantic};
    padding-top: ${({ theme }) => parseInt(theme.border.radiusGigantic) + contentVerticalPadding}px;
    padding-bottom: ${({ bottomInset }) => bottomInset + 20}px;
`;

export const RecipeNameRow = styled.View`
    flex-direction: row;
    gap: 8px;
`;

export const RecipeName = styled(HeadingBase).attrs({
    size: '2xl',
    fontWeight: 'regular',
})`
    flex: 1;
`;

export const TagList = styled(SmallTagList).attrs({
    contentContainerStyle: {
        paddingHorizontal: contentHorizontalPadding,
    },
})`
    margin: 10px -${contentHorizontalPadding}px;
    margin-bottom: 24px;
`;

export const Description = styled(TextBase).attrs({
    size: 'md',
    fontWeight: 'medium',
})`
    text-align: justify;
`;

export const Separator = styled.View`
    border: 0 solid ${({ theme }) => theme.palette.text[0]};
    border-bottom-width: 1px;
    margin: 32px 0;
`;

export const IngredientsHeaderRow = styled.View`
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
`;

export const SectionHeader = styled(TextBase).attrs({
    size: 'sm',
    fontWeight: 'semiBold',
})`
    color: ${({ theme }) => theme.palette.primary[0]};
`;

export const MethodSectionHeader = styled(SectionHeader)`
    margin-bottom: 12px;
`;

export const SubHeaderText = styled.Text`
    font-size: 20px;
    color: black;
    flex: 3;
`;

export const Ingredients = styled.View`
    margin-top: 12px;
    margin-bottom: 18px;

    padding: 4px 12px;
    padding-right: 16px;
    background: ${({ theme }) => theme.palette.background[3]};
    border-radius: ${({ theme }) => theme.border.radiusBig};
`;

export const IngredientRow = styled.View`
    flex-flow: row nowrap;
    padding: 12px 0;
    padding-left: 10px;
    align-items: center;
    gap: 14px;
    border: 0 solid rgba(0, 0, 0, 0.03);
    border-bottom-width: 1px;
`;

export const IngredientText = styled(TextBase).attrs({
    size: 'md',
    fontWeight: 'bold',
})`
    max-width: 70%;
    flex: 1;
`;

export const QuanitityText = styled(TextBase).attrs({
    size: 'md',
    fontWeight: 'medium',
})`
    text-align: right;
    min-width: 20%;
`;

export const StepsHeaderText = styled.Text`
    color: black;
    font-size: 19px;
    margin-bottom: 12px;
`;

export const RecipeStepRow = styled.View`
    flex-direction: row;
    gap: 12px;
`;

export const RecipeStepText = styled(TextBase).attrs({
    fontWeight: 'medium',
})`
    margin-bottom: 54px;
    flex: 1;
`;

export const StartButtonWrapper = styled(SafeAreaView).attrs({
    edges: ['left', 'right', 'bottom'],
    mode: 'margin',
})`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`;
