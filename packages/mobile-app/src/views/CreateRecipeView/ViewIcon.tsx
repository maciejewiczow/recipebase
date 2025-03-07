import { CreateRecipeIconSvg } from '~/components/Svg/CreateRecipeIconSvg';
import { createViewIcon, ViewIconProps } from '../HomeNavigationView/createViewIcon';
import { Wrapper } from './ViewIcon.styles';

const Icon = createViewIcon(CreateRecipeIconSvg)`
    position: relative;
    bottom: 120%;
`;

export const CreateIcon: React.FC<ViewIconProps> = props => (
    <Wrapper>
        <Icon {...props} />
    </Wrapper>
);
