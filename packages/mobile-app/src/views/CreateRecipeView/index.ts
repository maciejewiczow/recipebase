import Icon from 'react-native-vector-icons/Ionicons';
import { createViewIcon } from '../HomeNavigationView/createViewIcon';

export const CreateIcon = createViewIcon(Icon, 'add-circle')``;

export * from './AddIngredientView';
export * from './AddStepIngredientView';
export * from './AddStepView';
export * from './CreateRecipeView';
export * from './ImportRecipeView';
