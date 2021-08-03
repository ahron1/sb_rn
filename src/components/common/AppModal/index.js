import React from 'react';
import {Modal, Text, Pressable, View, ScrollView} from 'react-native';
import Icon from '../Icon';
// import {Text, Pressable, View, ScrollView} from 'react-native';
// import Modal from 'react-native-modal';
import styles from './styles';

const AppModal = ({
  modalVisible,
  setModalVisible,
  onShow,
  onDismiss,
  modalTitle,
  modalBody,
  modalFooter,
  onModalClose,
}) => {
  // const [modalVisible, setModalVisible] = useState(false);
  // const deviceWidth = Dimensions.get('window').width;
  return (
    // <View style={styles.centeredView}>

    <Modal
      animationType="slide"
      transparent={true}
      // onBackdropPress={() => console.log('backdrop pressed')}
      visible={modalVisible}
      // onDismiss={onDismiss}
      onDismiss={onModalClose}
      onShow={onShow}
      // onModalClose={onModalClose}
      onRequestClose={() => {
        // console.log('modal hidden by back button press');
        onModalClose();
        setModalVisible(false);
      }}>
      <Pressable
        style={styles.wrapper}
        hitSlop={100}
        pressRetentionOffset={100}
        onPress={() => {
          // setModalVisible(!modalVisible);
          // console.log('modal touched');
        }}>
        {/* <View style={styles.modalView}> */}
        <ScrollView style={styles.modalView} keyboardShouldPersistTaps="always">
          <View style={styles.header}>
            {/* <Icon type="evil" name="close" /> */}
            <View />
            <View />
            <Text style={styles.title}>{modalTitle || 'Storebhai'} </Text>
            <Pressable
              onPress={() => {
                // console.log('modal X touched');
                onModalClose();
                setModalVisible(!modalVisible);
              }}>
              <Icon
                type="ant"
                name="closecircleo"
                size={30}
                style={styles.closeIcon}
              />
            </Pressable>
          </View>

          <View style={styles.footerSeparator} />
          <View style={styles.modalBody}>{modalBody}</View>

          {modalFooter}
        </ScrollView>
        {/* </View> */}
      </Pressable>
    </Modal>
  );
};

export default AppModal;
