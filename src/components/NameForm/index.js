import React, {useContext, useState} from 'react';
import {
  Modal,
  Text,
  Pressable,
  View,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import AppModal from '../common/AppModal';
import CustomButtonMedium from '../common/CustomButtonMedium';
import AppTextInput from '../common/AppTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import userNameUpdate from '../../context/actions/auth/userNameUpdate';
import {GlobalContext} from '../../context/Provider';
import colors from '../../assets/theme/colors';

const NameForm = ({
  modalVisibleAddName,
  setModalVisibleAddName,
  // setStoredName,
  firebaseUid,
  currentUserName,
}) => {
  const [formAddName, setFormAddName] = useState(
    currentUserName ? {name: currentUserName} : {},
  );
  const [formErrorsAddName, setFormErrorsAddName] = useState({});
  const {authState, authDispatch} = useContext(GlobalContext);

  // const storeCurrentName = async () => {
  // console.log('A OK, will add new name');
  // const name = formAddName.name;
  // console.log(name);
  // await AsyncStorage.setItem('@userName', name);
  // setStoredName(name);
  // AsyncStorage.getItem('@userName').then(value => {
  // console.log('stored name was:>> ', value);
  // });
  // setModalVisibleAddName(false);
  // };

  const storeCurrentName = () => {
    const userName = formAddName.name;
    console.log(
      'in name form. update name button touched :>> ',
      userName,
      firebaseUid,
    );
    userNameUpdate({userName, firebaseUid})(authDispatch)(() =>
      setModalVisibleAddName(false),
    );
  };

  const onSubmitName = () => {
    if (!formAddName.name) {
      setFormErrorsAddName(prev => {
        return {...prev, name: 'Please enter your full name'};
      });
    }
    if (
      Object.values(formAddName).length >= 1 &&
      Object.values(formAddName).every(x => x.trim().length > 0)
    ) {
      storeCurrentName();
    } else {
      console.log('New name cannot add -errors');
    }
  };

  const onChangeName = ({name, value, isRequired}) => {
    setFormAddName({...formAddName, [name]: value});
    // console.log('in name form component. name form is :>> ', formAddName);

    if (value === '') {
      if (isRequired) {
        setFormErrorsAddName(prev => {
          return {...prev, [name]: 'This field is required'};
        });
      }
    } else {
      setFormErrorsAddName(prev => {
        return {...prev, [name]: null};
      });
    }
  };
  return (
    <AppModal
      modalVisible={modalVisibleAddName}
      setModalVisible={setModalVisibleAddName}
      modalTitle={'Name'}
      modalFooter={<></>}
      onShow={() => console.log('modal shown')}
      // onDismiss={() => console.log('modal closed')}
      onModalClose={() => {
        console.log('modal closed');
        setFormErrorsAddName({});
        setFormAddName({});
      }}
      modalBody={
        <View>
          <View style={styles.inputForm}>
            <AppTextInput
              style={styles.input}
              autoCapitalize="words"
              label="Enter your full name:"
              maxLength={30}
              placeholder="Full Name"
              value={formAddName.name || ''}
              onChangeText={value => {
                onChangeName({name: 'name', value, isRequired: true});
              }}
              error={formErrorsAddName.name}
            />
          </View>

          {/* <View style={styles.buttonSection}> */}
          <CustomButtonMedium
            // primary
            style={styles.buttonSection}
            backgroundColor={colors.color1_4}
            title="OK"
            loading={authState.userNameUpdate.loading}
            disabled={authState.userNameUpdate.loading}
            onPress={onSubmitName}
            //            onPress={() => {
            //              console.log(
            //                'add button pressed. add item to order id :>> ',
            //                orderId,
            //              );
            //            }}
          />
        </View>
        // </View>
      }
    />
  );
};

export default NameForm;
