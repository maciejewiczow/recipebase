import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import {
    DropdownRow,
    DropdownWrapper,
    InputWithDropdownWrapper,
    TagNameInput,
    TagNameText,
    TagRecipeCountText,
    TagsWrapper,
    TagView,
} from './TagCreator.styles';

export const TagCreator: React.FC = observer(() => {
    const { tags } = useRootStore();
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [newTagName, setNewTagName] = useState<string>('');

    const showTagInputOrAddNewTag = () => {
        setIsInputVisible(true);

        if (newTagName) {
            const added = tags.addDraftTag(newTagName);
            if (!added) {
                ToastAndroid.show('Tags have to be unique', ToastAndroid.LONG);
            }
        }

        setNewTagName('');
    };

    const addExistingTagToDrafts = (tagId: number) => () => {
        tags.copyTagToDraftTags(tagId);
        setIsInputVisible(false);
        setNewTagName('');
    };

    const editTag = (id: number) => () => {
        setIsInputVisible(true);
        showTagInputOrAddNewTag();
        setNewTagName(tags.draftTags.find(t => t.id === id)?.name ?? '');
        tags.removeDraftTagById(id);
    };

    return (
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
                        onEndEditing={showTagInputOrAddNewTag}
                        onSubmitEditing={showTagInputOrAddNewTag}
                        onBlur={showTagInputOrAddNewTag}
                        autoFocus
                        blurOnSubmit={false}
                        autoCapitalize="none"
                    />
                    <DropdownWrapper>
                        {tags.filterByName(newTagName).map(tag => (
                            <DropdownRow
                                key={tag.id}
                                onPress={addExistingTagToDrafts(tag.id)}
                            >
                                <TagNameText>{tag.name}</TagNameText>
                                <TagRecipeCountText>{tag.recipeCount}</TagRecipeCountText>
                            </DropdownRow>
                        ))}
                    </DropdownWrapper>
                </InputWithDropdownWrapper>
            )}
            <TagView
                onPress={showTagInputOrAddNewTag}
                name="+"
                isSelected
                noMinWidth
                isLastChild
            />
        </TagsWrapper>
    );
});
