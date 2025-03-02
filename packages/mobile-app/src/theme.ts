import { cloneDeep } from 'lodash';

const common = {
    palette: {
        primary: ['#B52D4F', '#AF5564', '#E8002E'],
        secondary: ['#FFBF8D'],
        background: ['#FCF1E0', '#FEF4E4', '#FFF8EC', '#F2E8D8', '#FFF7E9', '#F2E7D0', '#DCBFAE', '#D7C3AE'],
        text: ['#202121', '#D7C4AF'],
        error: ['#94031b'],
        success: ['#A2BC93'],
    },
    text: {
        heading: {
            font: 'Oranienbaum-Regular',
        },
        normal: {
            font: 'PlusJakartaSans-Regular',
        },
    },
    border: {
        radiusGigantic: '30px',
        radiusBig: '14px',
        radius: '10px',
        radiusSmall: '8px',
    },
} as const;

export type Theme = typeof common;

export const lightTheme = cloneDeep(common);

// export const darkTheme = cloneDeep(common);

// darkTheme.palette.background = '#000';
// darkTheme.palette.text = '#fff';
