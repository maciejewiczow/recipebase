import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    useColorScheme,
    View,
} from 'react-native';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components/native';

const SectionContainer = styled.View`
    margin-top: 32px;
    padding: 0 24px;
`;

const SectionTitle = styled.Text<{ isDarkMode?: boolean }>`
    font-size: 24px;
    font-weight: 600;
    color: ${({ isDarkMode }) => (isDarkMode ? Colors.white : Colors.black)};
`;

const SectionDescription = styled.Text<{ isDarkMode?: boolean }>`
    margin-top: 8px;
    font-size: 18px;
    font-weight: 400;
    color: ${({ isDarkMode }) => (isDarkMode ? Colors.white : Colors.black)};
`;

const Highlight = styled.Text`
    font-weight: 700;
`;

const Section: React.FC<{
    title: string;
    children: any;
}> = ({ children, title }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <SectionContainer>
            <SectionTitle isDarkMode={isDarkMode}>{title}</SectionTitle>
            <SectionDescription isDarkMode={isDarkMode}>{children}</SectionDescription>
        </SectionContainer>
    );
};

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <Header />
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <Section title="Step One">
                        Edit <Highlight>App.tsx</Highlight> to change this
                        screen and then come back to see your edits.
                    </Section>
                    <Section title="See Your Changes">
                        <ReloadInstructions />
                    </Section>
                    <Section title="Debug">
                        <DebugInstructions />
                    </Section>
                    <Section title="Learn More">
                        Read the docs to discover what to do next:
                    </Section>
                    <LearnMoreLinks />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;
