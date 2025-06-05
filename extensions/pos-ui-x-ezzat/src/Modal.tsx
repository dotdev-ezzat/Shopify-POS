import React, { useEffect, useState } from 'react';
import { Text, Screen, ScrollView, Navigator, reactExtension, useApi } from '@shopify/ui-extensions-react/point-of-sale';

const Modal = () => {
  const api = useApi<'pos.customer-details.action.render'>();
  const customerId = api.customer.id;
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    async function fetchCustomerDetails() {
      try {
        const response = await fetch('/api/customer-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId
          }),
        });
        
        const result = await response.json();
        if (result.error) {
          console.error('Error fetching customer details:', result.error);
          return;
        }
        
        setCustomer(result.data.customer);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    }

    if (customerId) {
      fetchCustomerDetails();
    }
  }, [customerId]);

  // log customer
  console.log("customer:", customer);

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

export default reactExtension('pos.home.modal.render', () => <Modal />);