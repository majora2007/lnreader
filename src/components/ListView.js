import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

import FastImage from 'react-native-fast-image';
import {defaultCoverUri} from '../sources/helpers/constants';

const ListView = ({
  item,
  downloadBadge,
  unreadBadge,
  inLibraryBadge,
  theme,
  onPress,
  isSelected,
  onLongPress,
}) => {
  const uri =
    item.novelCover && !item.novelCover.startsWith('/')
      ? item.novelCover
      : defaultCoverUri;

  return (
    <Pressable
      android_ripple={{color: theme.rippleColor}}
      style={[
        styles.listView,
        isSelected && {backgroundColor: theme.rippleColor},
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <FastImage
        source={{
          uri,
        }}
        style={[styles.extensionIcon, inLibraryBadge && {opacity: 0.5}]}
      />
      <Text
        style={[{color: theme.textColorPrimary}, styles.novelName]}
        numberOfLines={1}
      >
        {item.novelName}
      </Text>
      <View style={styles.badgeContainer}>
        {downloadBadge}
        {unreadBadge}
        {inLibraryBadge}
      </View>
    </Pressable>
  );
};

export default ListView;

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  extensionIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  novelName: {
    flex: 1,
    marginLeft: 16,
    fontSize: 15,
    paddingRight: 8,
    flexWrap: 'wrap',
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
