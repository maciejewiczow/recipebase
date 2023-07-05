import 'styled-components/native';

declare module 'styled-components/native' {
    export interface DefaultTheme {
        palette: {
            text: string;
            background: string;
            primaryAccent: string;
        };
        border: {
            radiusGigantic: string;
            radiusBig: string;
            radius: string;
            radiusSmall: string;
        };
    }
}
