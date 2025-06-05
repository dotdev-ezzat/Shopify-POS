import React from 'react';
import { Text, Screen, ScrollView, Navigator, reactExtension } from '@shopify/ui-extensions-react/point-of-sale';
import { CustomerProvider, useCustomer } from './context/CustomerContext';

const ModalContent = () => {
  const { customer, isLoading } = useCustomer();

  if (isLoading) {
    return (
      <Navigator>
        <Screen name="Loading" title="Loading Customer Details">
          <Text>Loading customer details...</Text>
        </Screen>
      </Navigator>
    );
  }

  return (
    <Navigator>
      <Screen name="HelloWorld" title="Ezzat X POS Extension">
        <ScrollView>
          <Text>Ezzat X POS Extension</Text>
          {customer ? (
            <>
              <Text>Name: {customer?.firstName} {customer?.lastName}</Text>
              <Text>Email: {customer?.defaultEmailAddress?.emailAddress}</Text>
              <Text>Phone: {customer?.defaultPhoneNumber?.phoneNumber}</Text>
              <Text>Tags: {customer?.tags?.join(', ')}</Text>
              <Text>Total Spent: {customer?.amountSpent?.amount}</Text>
              <Text>Address: {customer?.defaultAddress?.address1}, {customer?.defaultAddress?.city}, {customer?.defaultAddress?.country}</Text>
            </>
          ) : (
            <Text>Loading customer details...</Text>
          )}
        </ScrollView>
      </Screen>
    </Navigator>
  );
};

const Modal = () => (
  <CustomerProvider>
    <ModalContent />
  </CustomerProvider>
);

export default reactExtension('pos.home.modal.render', () => <Modal />);