import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useCartSubscription } from '@shopify/ui-extensions-react/point-of-sale';
import { useShopifyApi } from '../hooks/useShopifyApi';
import { GET_CUSTOMER_DETAILS } from '../graphql/queries';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  defaultEmailAddress?: {
    emailAddress: string;
    marketingOptInLevel: string;
    marketingState: string;
  };
  defaultPhoneNumber?: {
    phoneNumber: string;
  };
  tags: string[];
  defaultAddress?: {
    address1: string;
    city: string;
    country: string;
  };
  amountSpent: {
    amount: string;
    currencyCode: string;
  };
  orders: {
    edges: Array<{
      node: {
        id: string;
        name: string;
      };
    }>;
  };
}

interface CustomerContextType {
  customer: Customer | null;
  isLoading: boolean;
}

const CustomerContext = createContext<CustomerContextType>({
  customer: null,
  isLoading: false,
});

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cart = useCartSubscription();
  const { shopifyApi } = useShopifyApi();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCustomer = useCallback(async () => {
    if (!cart?.customer?.id) {
      setCustomer(null);
      return;
    }

    try {
      setIsLoading(true);
      const result = await shopifyApi({
        query: GET_CUSTOMER_DETAILS,
        variables: {
          customerId: `gid://shopify/Customer/${cart.customer.id}`,
        },
      });

      if (result.errors) {
        console.error('GraphQL errors:', result.errors);
        return;
      }

      setCustomer(result.data.customer);
    } catch (error) {
      console.error('Error fetching customer:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cart?.customer?.id, shopifyApi]);

  useEffect(() => {
    getCustomer();
  }, [cart.customer, getCustomer]);

  return (
    <CustomerContext.Provider value={{ customer, isLoading }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
