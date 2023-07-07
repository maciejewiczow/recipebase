import { cloneDeep } from 'lodash';
import { DefaultTheme } from 'styled-components/native';

const common: DefaultTheme = {
    palette: {
        primaryAccent: '#D86B0B',
        background: '',
        text: '',
    },
    border: {
        radiusGigantic: '30px',
        radiusBig: '14px',
        radius: '10px',
        radiusSmall: '8px',
    },
};

export const lightTheme = cloneDeep(common) as DefaultTheme;

lightTheme.palette.background = '#fff';
lightTheme.palette.text = '#333';

export const darkTheme = cloneDeep(common) as DefaultTheme;

darkTheme.palette.background = '#000';
darkTheme.palette.text = '#fff';

