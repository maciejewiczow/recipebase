import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { ErrorToast } from './ErrorToast';
import { RecipeCreatedToast, RecipeCreatedToastParams } from './RecipeCreatedToast';

const config: ToastConfig = {
    error: params => <ErrorToast {...params} />,
    recipeCreated: params => <RecipeCreatedToast {...params} />,
};

declare module 'react-native-toast-message' {
    export interface CustomToastParamTypes {
        recipeCreated: RecipeCreatedToastParams;
    }
}

export const ToastRoot: React.FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <Toast
            config={config}
            position="bottom"
            visibilityTime={10000}
            bottomOffset={insets.bottom}
        />
    );
};
