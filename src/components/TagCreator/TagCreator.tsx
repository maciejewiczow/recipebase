import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { TagWithCount } from 'backend-logic/store/Tags';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/RootStoreContext';
import { useIsKeyboardOpen } from '~/utils/useIsKeyoardOpen';
import { TagPlusIconSvg } from '../Svg/TagPlusIconSvg';
import {
    DropdownList,
    DropdownRow,
    DropdownSeparator,
    DropdownWrapper,
    InputErrorText,
    InputErrorWrapper,
    TagNameInput,
    TagNameText,
    TagRecipeCountText,
    TagsWrapper,
    TagView,
} from './TagCreator.styles';

export const TagCreator: React.FC = observer(() => {
    const { tags } = useRootStore();
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [tagSelectedForDeletionId, setTagSelectedForDeletionId] = useState<number>();
    const isKeyboardOpen = useIsKeyboardOpen();

    useEffect(() => {
        if (!isKeyboardOpen) {
            setTagSelectedForDeletionId(undefined);
        }
    }, [isKeyboardOpen]);

    const isNameValid = useMemo(() => {
        if (newTagName.length) {
            return tags.isTagNameValid(newTagName);
        }

        return true;
    }, [newTagName, tags]);

    const showTagInputOrAddNewTag = () => {
        setIsInputVisible(true);
        setTagSelectedForDeletionId(undefined);

        if (newTagName && isNameValid) {
            tags.addDraftTag(newTagName);
            setNewTagName('');
        }
    };

    const addExistingTagToDrafts = (tag: TagWithCount) => () => {
        tags.copyTagToDraftTags(tag.id);
        setNewTagName('');
    };

    const editTag = (id: number) => () => {
        setIsInputVisible(true);
        showTagInputOrAddNewTag();
        setNewTagName(tags.draftTags.find(t => t.id === id)?.name ?? '');
        tags.removeDraftTagById(id);
    };

    const matchingTags = tags.filterByNameWithoutDrafts(newTagName);

    return (
        <TagsWrapper>
            {tags.draftTags.map(tag => (
                <TagView
                    key={tag.id}
                    name={tag.name}
                    isSelected={tag.id === tagSelectedForDeletionId}
                    onPress={editTag(tag.id)}
                    noMinWidth
                />
            ))}
            {isInputVisible && (
                <View>
                    <TagNameInput
                        hasAutocompletionItems={!!matchingTags.length}
                        onChangeText={setNewTagName}
                        value={newTagName}
                        onKeyPress={e => {
                            if (e.nativeEvent.key === 'Backspace' && newTagName.length === 0) {
                                if (tagSelectedForDeletionId !== undefined) {
                                    tags.removeDraftTagById(tagSelectedForDeletionId);
                                    setTagSelectedForDeletionId(undefined);
                                } else {
                                    setTagSelectedForDeletionId(tags.draftTags.at(-1)?.id);
                                }
                            }

                            if (e.nativeEvent.key !== 'Backspace') {
                                setTagSelectedForDeletionId(undefined);
                            }
                        }}
                        onEndEditing={showTagInputOrAddNewTag}
                        onSubmitEditing={showTagInputOrAddNewTag}
                        onBlur={() => {
                            setIsInputVisible(false);
                            setNewTagName('');
                        }}
                        autoFocus
                        submitBehavior="submit"
                        autoCapitalize="none"
                    />
                    {!isNameValid && (
                        <View>
                            <InputErrorWrapper>
                                <InputErrorText>Tags must be unique</InputErrorText>
                            </InputErrorWrapper>
                        </View>
                    )}
                    {isNameValid && !!matchingTags.length && (
                        <View>
                            <DropdownWrapper>
                                <DropdownSeparator />
                                <DropdownList
                                    keyboardShouldPersistTaps="handled"
                                    data={matchingTags}
                                    keyExtractor={tag => tag.id.toString()}
                                    renderItem={({ item: tag }) => (
                                        <DropdownRow onPress={addExistingTagToDrafts(tag)}>
                                            <TagNameText>{tag.name}</TagNameText>
                                            <TagRecipeCountText>{tag.recipeCount}</TagRecipeCountText>
                                        </DropdownRow>
                                    )}
                                />
                            </DropdownWrapper>
                        </View>
                    )}
                </View>
            )}
            <TagView
                onPress={showTagInputOrAddNewTag}
                name={<TagPlusIconSvg />}
                isSelected
                noMinWidth
            />
        </TagsWrapper>
    );
});
