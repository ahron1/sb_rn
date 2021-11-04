import React, {useContext, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import AppModal from '../common/AppModal';
// import CustomButton from '../common/CustomButton';
import CustomButtonMedium from '../common/CustomButtonMedium';
import AppTextInput from '../common/AppTextInput';
import addOrderItem from '../../context/actions/addOrderItem';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';
import colors from '../../assets/theme/colors';
import CustomButtonSmall from '../common/CustomButtonSmall';
import {Avatar} from '../common/Avatar';

const AddItem = ({orderId, modalVisibleAddItem, setModalVisibleAddItem}) => {
  const {orderItemsDispatch, orderItemsState} = useContext(GlobalContext);
  const [formAddItem, setFormAddItem] = useState({});
  const [formErrorsAddItem, setFormErrorsAddItem] = useState({});
  var imageSource = '../../assets/images/logo3.png';

  const onAvatarChange = (image: ImageOrVideo) => {
    console.log('in add item component, image uploaded ', image);
    // upload image to server here
  };

  const onSubmitAddItem = ({name, value, isRequired}) => {
    if (!formAddItem.itemName) {
      setFormErrorsAddItem(prev => {
        return {
          ...prev,
          itemName:
            'Please enter the item name and details (brand, model, etc.)',
        };
      });
    }
    if (!formAddItem.itemQuantity) {
      setFormErrorsAddItem(prev => {
        return {...prev, itemQuantity: 'Please enter the item quantity'};
      });
    }

    if (
      Object.values(formAddItem).length >= 2 &&
      Object.values(formAddItem).every(x => x.trim().length > 0)
    ) {
      // console.log('A OK, will create new item');
      addOrderItem({orderId, formAddItem})(orderItemsDispatch)(() => {
        setFormErrorsAddItem({});
        setFormAddItem({});
        setModalVisibleAddItem(false);
      });
    } else {
      // console.log('New item cannot add -errors');
    }
  };

  const onChangeAddItem = ({name, value, isRequired}) => {
    setFormAddItem({...formAddItem, [name]: value});

    if (value === '') {
      if (isRequired) {
        setFormErrorsAddItem(prev => {
          return {...prev, [name]: 'This field is required'};
        });
      }
    } else {
      setFormErrorsAddItem(prev => {
        return {...prev, [name]: null};
      });
    }
  };

  const uploadPic = () => {
    console.log('in add item component. upload pic func');
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <AppModal
      modalVisible={modalVisibleAddItem}
      setModalVisible={setModalVisibleAddItem}
      modalTitle={'Add item'}
      modalFooter={<></>}
      // onShow={() => console.log('modal shown')}
      // onDismiss={() => console.log('modal closed')}
      onModalClose={() => {
        // console.log('modal closed');
        setFormErrorsAddItem({});
        setFormAddItem({});
      }}
      modalBody={
        <View>
          <View style={styles.introSection}>
            <Text style={styles.introText}>
              Enter the item and quantity you want to order:
            </Text>
          </View>

          <View style={styles.userRow}>
            <Avatar
              onChange={onAvatarChange}
              // source={require('../../assets/images/logo3.png')}
              source={require(imageSource)}
            />
          </View>

          <View>
            <AppTextInput
              label="Item Name (brand, model, etc.): "
              placeholder="Example: India Gate Tibar Rice"
              maxLength={40}
              value={formAddItem.itemName || ''}
              onChangeText={value => {
                onChangeAddItem({name: 'itemName', value, isRequired: true});
              }}
              error={formErrorsAddItem.itemName}
            />
            <AppTextInput
              label="Item Quantity: "
              placeholder="Example: 1 kg"
              value={formAddItem.itemQuantity || ''}
              maxLength={15}
              onChangeText={value => {
                onChangeAddItem({
                  name: 'itemQuantity',
                  value,
                  isRequired: true,
                });
              }}
              error={formErrorsAddItem.itemQuantity}
            />
            {/*
            <AppTextInput
              label="Comments or notes:"
              placeholder="Send alternative if not available,..."
              value={formAddItem.itemCustomerComment || ''}
              onChangeText={value => {
                onChangeAddItem({name: 'itemCustomerComment', value});
              }}
              error={formErrorsAddItem.itemCustomerComment}
            />
            */}
          </View>

          <CustomButtonMedium
            title="OK"
            onPress={onSubmitAddItem}
            loading={orderItemsState.addOrderItem.loading}
            disabled={orderItemsState.addOrderItem.loading}
            style={styles.buttonSection}
            backgroundColor={colors.color1_4}
          />
        </View>
      }
    />
  );
};

export default AddItem;
