import styled from 'styled-components/native';
import bgSource from '~/../assets/splash-bg.jpg';
import LinearGradient from 'react-native-linear-gradient';

export const Background = styled.ImageBackground.attrs({ source: bgSource })`
    flex: 1;
`;

export const Gradient = styled(LinearGradient).attrs({
    colors: ['#00000000', '#000000ee'],
})`
    flex: 1;
    align-items: stretch;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    padding: 0 40px;
`;

export const AppTitle = styled.Text`
    color: white;
    font-size: 40px;
    margin-top: 70px;
    margin-bottom: 50px;
    text-align: center;
`;

export const Loader = styled.ActivityIndicator.attrs({
    size: 68,
    color: 'white',
})``;
