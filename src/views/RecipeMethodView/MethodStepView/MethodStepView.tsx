import { StepperStepViewComponent } from '~/components/Stepper/types';
import { useRootStore } from '~/RootStoreContext';
import { StepParams } from '../types';
import {
    IngredientListWrapper,
    IngredientName,
    IngredientWrapper,
    SectionName,
    StepPhoto,
    StepText,
    TextWrapper,
    UnitText,
    Wrapper,
} from './MethodStepView.styles';

export const MethodStepView: StepperStepViewComponent<string, StepParams> = ({
    route: {
        params: { sectionId, stepId },
    },
}) => {
    const { currentRecipe } = useRootStore();

    const section = currentRecipe.recipe?.sections?.find(({ id }) => id === sectionId);

    const step = section?.recipeSteps?.find(({ id }) => id === stepId);

    if (!step || !section) {
        return null;
    }

    return (
        <Wrapper hasSectionName={!!section.name}>
            {!!section.name && <SectionName>{section.name}</SectionName>}
            {!!step.photo && <StepPhoto source={{ uri: step.photo }} />}
            {(step.referencedIngredients?.length ?? 0) > 0 && (
                <IngredientListWrapper>
                    {step.referencedIngredients?.map(ingredient => (
                        <IngredientWrapper key={ingredient.id}>
                            <TextWrapper>
                                {!!ingredient.quantityFrom && (
                                    <UnitText>
                                        {ingredient.quantityFrom * currentRecipe.ingredientMultiplier}
                                        {!!ingredient.quantityTo && (
                                            <>
                                                {' '}
                                                - {ingredient.quantityTo * currentRecipe.ingredientMultiplier}
                                            </>
                                        )}
                                        &nbsp;{ingredient.unit?.name}&nbsp;&nbsp;&nbsp;
                                    </UnitText>
                                )}
                                <IngredientName>{ingredient.ingredient?.name}</IngredientName>
                            </TextWrapper>
                        </IngredientWrapper>
                    ))}
                </IngredientListWrapper>
            )}
            <StepText>{step.content}</StepText>
        </Wrapper>
    );
};
