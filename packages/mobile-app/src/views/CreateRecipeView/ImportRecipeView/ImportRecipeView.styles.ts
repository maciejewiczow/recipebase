import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import { Button } from '~/components/Button';
import { createStyledIcon } from '~/utils/createStyledIcon';

export const OuterWrapper = styled.View`
    flex: 1;
    padding: 16px 18px;
`;

export const Wrapper = styled.View`
    gap: 16px;
    flex: 1;
`;

export const MoreInfoIcon = createStyledIcon(Icon, {
    name: 'questioncircleo',
    size: 22,
    color: '#222',
});

export const CheckboxPressable = styled.Pressable`
    flex-direction: row;
    gap: 12px;
    align-items: center;
    flex: 1;
`;

export const CheckboxRow = styled.View`
    flex-direction: row;
    gap: 12px;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
`;

export const CheckboxLabel = styled.Text`
    color: #555;
    font-size: 18px;
`;

export const MainErrorWrapper = styled.View`
    margin-bottom: 8px;
`;

export const MainErrorText = styled.Text`
    color: ${({ theme }) => theme.palette.error[0]};
`;

export const ImportButton = styled(Button).attrs({
    variant: 'primary',
})``;
