import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export const useIsKeyboardOpen = () => {
    const [isOpen, setIsOpen] = useState(Keyboard.isVisible());

    useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', () => setIsOpen(true));
        const hideListener = Keyboard.addListener('keyboardDidHide', () => setIsOpen(false));

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    return isOpen;
};
