import React from 'react';
import { Text, Screen, ScrollView, Navigator, reactExtension } from '@shopify/ui-extensions-react/point-of-sale';

const Modal = () => {
  return (
    <Navigator>
      <Screen name="ModalContent" title="Modal Content">
        <ScrollView>
          <Text>Modal Content</Text>
        </ScrollView>
      </Screen>
    </Navigator>
  );
};

export default reactExtension('pos.home.modal.render', () => <Modal />);