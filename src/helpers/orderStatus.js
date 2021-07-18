import colors from '../assets/theme/colors';
const getOrderStatus = order => {
  const {
    status_100_customer_started,
    status_200_customer_sent,
    status_300_store_checked,
    status_400_store_fulfilled,
    status_500_customer_received,
    status_600_payment_made,
    status_700_payment_received,
    // status_800_order_rated,
    status_900_order_complete,
  } = order;

  const {
    orderStatusText,
    orderStatusNext,
    orderColorCode,
    orderStatusCode,
    orderColorText,
  } =
    status_900_order_complete === true
      ? {
          orderStatusText: 'Order complete. Payment done.',
          orderStatusNext: 'Now earn rewards',
          orderColorCode: colors.color2_4,
          orderStatusCode: 'status_900_order_complete',
        }
      : // : status_800_order_rated === true
      // ? {
      // orderStatusText: 'Order Complete',
      // orderStatusNext: 'All done',
      // orderColorCode: 'lightblue',
      // orderStatusCode: 'status_800_order_rated,
      // }
      status_700_payment_received === true
      ? {
          orderStatusText: 'Order complete. Payment done.',
          orderStatusNext: 'Now earn rewards',
          orderColorCode: colors.color2_4,
          orderStatusCode: 'status_700_payment_received',
        }
      : status_600_payment_made === true
      ? {
          orderStatusText: 'Customer made payment',
          orderStatusNext: 'Wait for store to confirm payment',
          orderColorCode: colors.color2_2,
          orderStatusCode: 'status_600_payment_made',
        }
      : status_500_customer_received === true
      ? {
          orderStatusText: 'Store fulfilled the order',
          orderStatusNext: 'Make payment after receiving items',
          orderColorCode: colors.color2_2_4,
          orderStatusCode: 'status_500_customer_received',
        }
      : status_400_store_fulfilled === true
      ? {
          orderStatusText: 'Store fulfilled the order',
          orderStatusNext: 'Make payment after receiving items',
          orderColorCode: colors.color2_2_4,
          orderStatusCode: 'status_400_store_fulfilled',
        }
      : status_300_store_checked === true
      ? {
          orderStatusText:
            'Store checked availability and will fulfil order soon',
          orderStatusNext: 'Make payment after receiving items',
          orderColorCode: colors.color2_2_4,
          orderStatusCode: 'status_300_store_checked',
        }
      : status_200_customer_sent === true
      ? {
          orderStatusText: 'Order sent to store',
          orderStatusNext: 'Wait for store to check prices and availability',
          orderColorCode: colors.color2_2,
          orderStatusCode: 'status_200_customer_sent',
          orderColorText: colors.color1_0,
        }
      : status_100_customer_started === true
      ? {
          orderStatusText: 'You started a new order',
          orderStatusNext: 'Add items to order and send to store',
          orderColorCode: colors.color4_2,
          orderStatusCode: 'status_100_customer_started',
          orderColorText: colors.color2_4,
        }
      : {
          orderStatusText: 'Customer has yet to start',
          orderStatusNext: 'Customer has to start writing the new order',
          orderColorCode: 'black',
          orderStatusCode: 'status_000_order_not_started',
        };

  return {
    orderStatusText: orderStatusText,
    orderStatusNext: orderStatusNext,
    orderColorCode: orderColorCode,
    orderStatusCode: orderStatusCode,
    orderColorText: orderColorText,
  };
};

const foo = () => {
  return 2;
};

export default getOrderStatus;
export {foo};
