import { cloneDeep } from 'lodash';

const common = {
    palette: {
        primary: ['#B52D4F', '#AF5564', '#E8002E'],
        secondary: ['#FFBF8D'],
        background: ['#FCF1E0', '#FEF4E4', '#FFF8EC', '#F2E8D8', '#FFF7E9', '#F2E7D0', '#DCBFAE', '#D7C3AE'],
        text: ['#202121', '#D7C4AF', '#A29187', '#A63B4C', '#7D6A5B', '#FFF6EB'],
        error: ['#94031b'],
        success: ['#A2BC93'],
    },
    text: {
        heading: {
            font: 'OranienbaumRegular',
            fontSize: {
                // sm: '20px',
                md: '24px',
                lg: '32px',
                xl: '36px',
                '2xl': '48px',
                '4xl': '90px',
            },
            lineHeight: {
                // sm: '',
                md: '24px',
                lg: '32px',
                xl: '36px',
                '2xl': '44px',
                '4xl': '90px',
            },
        },
        normal: {
            font: {
                bold: 'PlusJakartaSansBold',
                boldItalic: 'PlusJakartaSansBoldItalic',
                extraBold: 'PlusJakartaSansExtraBold',
                extraBoldItalic: 'PlusJakartaSansExtraBoldItalic',
                extraLight: 'PlusJakartaSansExtraLight',
                extraLightItalic: 'PlusJakartaSansExtraLightItalic',
                italic: 'PlusJakartaSansItalic',
                light: 'PlusJakartaSansLight',
                lightItalic: 'PlusJakartaSansLightItalic',
                medium: 'PlusJakartaSansMedium',
                mediumItalic: 'PlusJakartaSansMediumItalic',
                regular: 'PlusJakartaSansRegular',
                semiBold: 'PlusJakartaSansSemiBold',
                semiBoldItalic: 'PlusJakartaSansSemiBoldItalic',
            },
            fontSize: {
                '2xs': '10px',
                xs: '12px',
                sm: '14px',
                md: '16px',
            },
            lineHeight: {
                '2xs': '16px',
                xs: '18px',
                sm: '21px',
                md: '24px',
            },
        },
    },
    border: {
        radiusGigantic: '32px',
        radiusBig: '16px',
        radius: '10px',
        radiusSmall: '8px',
    },
} as const;

export type Theme = typeof common;

export const lightTheme = cloneDeep(common);

// export const darkTheme = cloneDeep(common);

// darkTheme.palette.background = '#000';
// darkTheme.palette.text = '#fff';
