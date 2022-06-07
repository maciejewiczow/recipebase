import 'styled-components';

declare module 'styled-components' {
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
