import React from 'react'

import { Text, Screen, ScrollView, Navigator, reactExtension, useApi } from '@shopify/ui-extensions-react/point-of-sale'

const Modal = () => {
  const api = useApi<'pos.customer-details.action.render'>();

  const customerId = api.customer.id;

  console.log(api.customer);

  return (
    <Navigator>
      <Screen name="HelloWorld" title="Ezzat X POS Extension">
        <ScrollView>
          <Text>Ezzat X POS Extension</Text>

          <Text>Some text to test the modalx</Text>
        </ScrollView>
      </Screen>
    </Navigator>
  )
}

export default reactExtension('pos.home.modal.render', () => <Modal />);