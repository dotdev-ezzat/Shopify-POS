import {
  Text,
  useApi,
  reactExtension,
  POSBlock,
  POSBlockRow,
} from '@shopify/ui-extensions-react/point-of-sale';
import { CustomerProvider, useCustomer } from './context/CustomerContext';

const BlockContent = () => {
  const api = useApi<'pos.customer-details.block.render'>();
  const { customer, isLoading } = useCustomer();

  return (
    <POSBlock action={{ title: 'View Details', onPress: api.action.presentModal }}>
      <POSBlockRow>
        {isLoading ? (
          <Text>Loading customer details...</Text>
        ) : customer ? (
          <>
            <Text>{`${customer.firstName} ${customer.lastName}`}</Text>
            <Text>{customer.defaultEmailAddress?.emailAddress || 'No email'}</Text>
          </>
        ) : (
          <Text>No customer details available</Text>
        )}
      </POSBlockRow>
    </POSBlock>
  );
};

const Block = () => (
  <CustomerProvider>
    <BlockContent />
  </CustomerProvider>
);

export default reactExtension('pos.customer-details.block.render', () => (
  <Block />
));
