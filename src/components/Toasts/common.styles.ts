import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const ToastBody = styled.View`
    width: 322px;
    border-radius: ${({ theme }) => theme.border.radius};
    padding: 12px 20px;
    margin-bottom: 120px;
`;

export const shadowStyles = StyleSheet.create({
    shadow: {
        boxShadow: [
            {
                offsetX: 0,
                offsetY: 4,
                blurRadius: 22,
                color: 'rgba(0,0,0,0.1)',
                spreadDistance: 3,
            },
        ],
    },
});
