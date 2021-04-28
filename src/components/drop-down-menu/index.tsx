import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';

import { Text } from '../typography';

function DropDownMenu() {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('select from list');

  const handleSelectItem = (selectedLabel: string) => {
    setLabel(selectedLabel);
    setActive(false);
  };

  return (
    <View>
      {console.log('active: ', active)}
      <Pressable onPress={() => setActive(!active)}>
        <Text>{label}</Text>
      </Pressable>
      {active && (
        <Modal transparent visible>
          <TouchableWithoutFeedback onPress={() => setActive(false)} accessible={false}>
            <View style={{ flexGrow: 1 }} accessible={false}>
              <View style={styles.dropdown} accessible={false}>
                <Pressable onPress={() => handleSelectItem('Menu item one')} accessible>
                  <Text>Menu item one</Text>
                </Pressable>
                <Pressable onPress={() => handleSelectItem('Menu item two')}>
                  <Text>Menu item two</Text>
                </Pressable>
                <Pressable onPress={() => handleSelectItem('Menu item three')}>
                  <Text>Menu item three</Text>
                </Pressable>
                <Pressable onPress={() => handleSelectItem('Menu item four')}>
                  <Text>Menu item four</Text>
                </Pressable>
                <Pressable onPress={() => handleSelectItem('Menu item five')} accessible>
                  <Text>Menu item five</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: 'pink',
    position: 'absolute',
    top: 16,
  },
  dropdown: {
    position: 'absolute',
    height: (33 + StyleSheet.hairlineWidth) * 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    borderRadius: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 8,
  },
});

export default DropDownMenu;
