import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from 'recipebase/src/RootStoreContext';
import {
    Wrapper,
    TagView,
    Label,
    TagsWrapper,
    TagNameInput,
    DropdownWrapper,
    InputWithDropdownWrapper,
    DropdownRow,
    TagNameText,
    TagRecipeCountText,
} from './TagCreator.styles';

export const TagCreator: React.FC = observer(() => {
    const { tags } = useRootStore();
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [newTagName, setNewTagName] = useState<string>('');

    const showTagInputOrAddNewTag = () => {
        setIsInputVisible(true);

        if (newTagName)
            tags.addDraftTag(newTagName);

        setNewTagName('');
    };

    const addNewTag = () => {
        if (newTagName)
            tags.addDraftTag(newTagName);

        setIsInputVisible(false);
        setNewTagName('');
    };

    const addExistingTagToDrafts = (tagId: number) => () => {
        tags.copyTagToDraftTags(tagId);
        setIsInputVisible(false);
        setNewTagName('');
    };

    const editTag = (id: number) => () => {
        setIsInputVisible(true);
        setNewTagName(tags.draftTags.find(t => t.id === id)?.name ?? '');
        tags.removeDraftTagById(id);
    };

    return (
        <Wrapper>
            <Label>Tags</Label>
            <TagsWrapper>
                {tags.draftTags.map(tag => (
                    <TagView
                        key={tag.id}
                        name={tag.name}
                        onPress={editTag(tag.id)}
                        noMinWidth
                    />
                ))}
                {isInputVisible && (
                    <InputWithDropdownWrapper>
                        <TagNameInput
                            onChangeText={setNewTagName}
                            value={newTagName}
                            onEndEditing={addNewTag}
                            autoFocus
                            blurOnSubmit={false}
                            autoCapitalize="none"
                        />
                        <DropdownWrapper>
                            {tags.filterByName(newTagName).map(tag => (
                                <DropdownRow key={tag.id} onPress={addExistingTagToDrafts(tag.id)}>
                                    <TagNameText>{tag.name}</TagNameText>
                                    <TagRecipeCountText>{tag.recipeCount}</TagRecipeCountText>
                                </DropdownRow>
                            ))}
                        </DropdownWrapper>
                    </InputWithDropdownWrapper>
                )}
                <TagView onPress={showTagInputOrAddNewTag} name="+" isSelected noMinWidth isLastChild />
            </TagsWrapper>
        </Wrapper>
    );
});

