import { RecipeStep } from 'backend-logic';
import { observer } from 'mobx-react-lite';
import { DragIcon, RecipeStepInput, RecipeStepWrapper } from './Steps.styles';

interface RecipeStepViewProps {
    isLast: boolean;
    step: RecipeStep;
    addRecipeStep: () => any;
    setStepContent: (content: string) => any;
    noDragIcon?: boolean;
}

export const RecipeStepView: React.FC<RecipeStepViewProps> = observer(({
    addRecipeStep,
    isLast,
    step,
    setStepContent,
    noDragIcon,
}) => (
    <RecipeStepWrapper>
        {!noDragIcon && <DragIcon />}
        <RecipeStepInput
            numberOfLines={5}
            onEndEditing={isLast ? addRecipeStep : undefined}
            value={step.content}
            onChange={setStepContent}
            multiline
        />
    </RecipeStepWrapper>
));
