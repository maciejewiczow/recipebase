/* eslint-disable @typescript-eslint/no-non-null-assertion */
import cloneDeep from 'lodash.clonedeep';
import { DefaultTheme } from 'styled-components/native';
import { DeepPartial } from 'typeorm';

const common: DeepPartial<DefaultTheme> = {
    palette: {
        primaryAccent: '#D86B0B',
    },
    border: {
        radiusGigantic: '30px',
        radiusBig: '14px',
        radius: '10px',
        radiusSmall: '8px',
    },
};

export const lightTheme = cloneDeep(common) as DefaultTheme;

lightTheme!.palette!.background = '#fff';
lightTheme!.palette!.text = '#333';

export const darkTheme = cloneDeep(common) as DefaultTheme;

darkTheme!.palette!.background = '#000';
darkTheme!.palette!.text = '#fff';

