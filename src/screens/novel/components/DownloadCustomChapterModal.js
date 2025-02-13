import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

import {IconButton, Modal, Portal} from 'react-native-paper';
import {downloadAllChaptersAction} from '../../../redux/novel/novel.actions';

const DownloadCustomChapterModal = ({
  theme,
  hideModal,
  modalVisible,
  novel,
  chapters,
  dispatch,
}) => {
  const [text, setText] = useState(0);

  const onDismiss = () => {
    hideModal();
    setText(0);
  };

  const onSubmit = () => {
    dispatch(
      downloadAllChaptersAction(
        novel.sourceId,
        novel.novelUrl,
        chapters
          .filter(
            chapter =>
              !!chapter.read === false && !!chapter.downloaded === false,
          )
          .slice(0, text.toString()),
      ),
    );
    hideModal();
  };

  const onChangeText = txt => {
    if (Number(txt) >= 0) {
      setText(Number(txt));
    }
  };

  return (
    <Portal>
      <Modal
        visible={modalVisible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modalContainer,
          {backgroundColor: theme.colorPrimary},
        ]}
      >
        <Text style={[styles.modalTitle, {color: theme.textColorPrimary}]}>
          Download custom amount
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <IconButton
            icon="chevron-double-left"
            animated
            size={24}
            color={theme.colorAccent}
            onPress={() => text > 9 && setText(prevState => prevState - 10)}
          />
          <IconButton
            icon="chevron-left"
            animated
            size={24}
            color={theme.colorAccent}
            onPress={() => text > 0 && setText(prevState => prevState - 1)}
          />
          <TextInput
            value={text.toString()}
            style={{color: theme.textColorPrimary, marginHorizontal: 4}}
            keyboardType="numeric"
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
          />
          <IconButton
            icon="chevron-right"
            animated
            size={24}
            color={theme.colorAccent}
            onPress={() => setText(prevState => prevState + 1)}
          />
          <IconButton
            icon="chevron-double-right"
            animated
            size={24}
            color={theme.colorAccent}
            onPress={() => setText(prevState => prevState + 10)}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default DownloadCustomChapterModal;

const styles = StyleSheet.create({
  modalContainer: {
    margin: 30,
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  errorText: {
    color: '#FF0033',
    paddingTop: 8,
  },
});
