import React, {useContext, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import AppModal from '../../common/AppModal';
// import CustomButton from '../common/CustomButton';
import CustomButtonMedium from '../../common/CustomButtonMedium';
import AppTextInput from '../../common/AppTextInput';
import addOrderItem from '../../../context/actions/addOrderItem';
import {GlobalContext} from '../../../context/Provider';
import styles from './styles';
import colors from '../../../assets/theme/colors';
import CustomButtonSmall from '../../common/CustomButtonSmall';
import {Avatar} from '../../common/Avatar';
import axios from 'axios';

const AddItemMedicine = ({
  orderId,
  modalVisibleAddItem,
  setModalVisibleAddItem,
}) => {
  const {orderItemsDispatch, orderItemsState} = useContext(GlobalContext);
  const [uploadPic, setUploadPic] = useState(true);
  const [formAddItem, setFormAddItem] = useState({});
  const [formErrorsAddItem, setFormErrorsAddItem] = useState({});
  const [img, setImg] = useState(null);

  var imageSource = '../../../assets/images/upload.png';

  const onAvatarChange = (image: ImageOrVideo) => {
    console.log('in add item component, image uploaded ', image);
    setImg(image);
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

  const uploadImg = async () => {
    console.log('upload img', img);
    const imageData = new FormData();

    imageData.append('image', {
      name: 'image.jpg',
      type: img.mime,
      uri: img.path,
    });

    // const res = await axios.post('https://httpbin.org/post', imageData);
    // console.log(Object.keys(res));

    //axios.post('https://httpbin.org/post', imageData).then(res => {
      axios.post('http://localhost:5000/upload_image', imageData).then(res => {
      console.log(Object.keys(res));
      //console.log(res);
      //setModalVisibleAddItem(false);
    });

    /*
    if (
      Object.values(formAddItem).length >= 2 &&
      Object.values(formAddItem).every(x => x.trim().length > 0)
    ) {
      addOrderItem({orderId, formAddItem})(orderItemsDispatch)(() => {
        setFormErrorsAddItem({});
        setFormAddItem({});
        setModalVisibleAddItem(false);
      });
    } else {
      console.log('New item cannot add -errors');
    }
    */
  };

  return (
    <AppModal
      modalVisible={modalVisibleAddItem}
      setModalVisible={setModalVisibleAddItem}
      modalTitle={'Add prescription'}
      modalFooter={<></>}
      // onShow={() => console.log('modal shown')}
      // onDismiss={() => console.log('modal closed')}
      onModalClose={() => {
        // console.log('modal closed');
        // setFormErrorsAddItem({});
        // setFormAddItem({});
      }}
      modalBody={
        <View>
          <>
            <View>
              <AppTextInput
                label="Patient name"
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
            <View>
              {uploadPic && (
                <>
                  <View style={styles.introSection}>
                    <Text style={styles.introText}>
                      Upload a photo of the prescription:
                    </Text>
                  </View>
                  <View style={styles.userRow}>
                    <Avatar
                      onChange={onAvatarChange}
                      source={require(imageSource)}
                    />
                  </View>
                </>
              )}
              <CustomButtonMedium
                title="OK"
                // onPress={onSubmitAddItem}
                onPress={uploadImg}
                loading={orderItemsState.addOrderItem.loading}
                disabled={orderItemsState.addOrderItem.loading}
                style={styles.buttonSection}
                backgroundColor={colors.color1_4}
              />
            </View>
          </>
        </View>
      }
    />
  );
};

export default AddItemMedicine;
