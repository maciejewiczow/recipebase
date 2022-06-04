import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        palette: {
            text: string;
            background: string;
            primaryAccent: string;
        };
    }
}
