import React, { useState, useRef } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';

import { Text } from '../typography';

const MENU_HEIGHT = 100; // TEMP

function DropDownMenu() {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('select from list');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [w, setWidth] = useState(0);
  const holder = useRef<View>(null);

  const handleSelectItem = (selectedLabel: string) => {
    setLabel(selectedLabel);
    setActive(false);
  };

  const handleShowMenu = () => {
    const { height } = Dimensions.get('window');
    holder.current?.measure((x, y, w, h, px, py) => {
      let menuY = py + h;
      const areaY = menuY + MENU_HEIGHT;
      if (areaY > height) {
        menuY = py - MENU_HEIGHT;
      }
      setY(menuY);
      setX(px);
      setWidth(w);
      setActive(true);
    });
  };

  return (
    <View ref={holder}>
      <Pressable onPress={handleShowMenu}>
        <Text style={{ padding: 8, backgroundColor: 'white' }}>{label}</Text>
      </Pressable>
      {active && (
        <Modal transparent visible>
          <TouchableWithoutFeedback onPress={() => setActive(false)} accessible={false}>
            <View style={{ flexGrow: 1 }} accessible={false}>
              <View style={[styles.dropdown, { left: x, top: y, width: w }]} accessible={false}>
                <ScrollView>
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
                  <Pressable onPress={() => handleSelectItem('Menu item five')}>
                    <Text>Menu item five</Text>
                  </Pressable>
                </ScrollView>
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
    backgroundColor: 'white',
    borderColor: 'pink',
    borderWidth: 1,
    height: MENU_HEIGHT,
    overflow: 'hidden',
    padding: 8,
    position: 'absolute',
  },
});

export default DropDownMenu;
