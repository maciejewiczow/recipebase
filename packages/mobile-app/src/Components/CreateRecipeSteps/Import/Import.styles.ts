import styled from 'styled-components/native';

export const LineWrapper = styled.View`
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin: 24px 0;
`;

export const HorizontalLine = styled.View`
    height: 0;
    border-bottom-color: #ccc;
    border-bottom-width: 1px;
    flex-grow: 1;
    flex-shrink: 0;
    margin: 0 24px;
    margin-top: 5px;
`;

export const OrText = styled.Text`
    font-size: 24px;
    color: #717171;
`;

export const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    padding: 12px;
`;
