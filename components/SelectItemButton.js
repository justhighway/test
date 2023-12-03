// components/SelectItemButton.js
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const SelectItemButton = ({ userUploadedItems, onSelectItem }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableHighlight
      style={[
        styles.itemContainer,
        selectedItem && selectedItem.id === item.id && styles.selectedItem,
      ]}
      onPress={() => setSelectedItem(item)}
      underlayColor="#DDDDDD"
    >
      <View style={styles.itemContent}>
        <Image source={{ uri: item.itemPics[0] }} style={styles.itemImage} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemName}>{item.itemName}</Text>
          <Text style={styles.itemPrice}>가격: {item.itemPrice}</Text>
          <Text style={styles.itemCondition}>상태: {item.itemCondition}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  const closeModal = () => {
    setModalVisible(!modalVisible);
    setSelectedItem(null);
  };

  const confirmSelection = () => {
    onSelectItem(selectedItem);
    closeModal();
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Select Item</Text>
      </TouchableHighlight>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                data={userUploadedItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
              <View style={styles.modalButtons}>
                <TouchableHighlight
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={closeModal}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={confirmSelection}
                  disabled={!selectedItem}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    marginRight: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "transparent",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    width: "100%",
  },
  itemContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    padding: 10,
  },
  selectedItem: {
    backgroundColor: "#DDDDDD",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemTextContainer: {
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    marginTop: 5,
  },
  itemCondition: {
    fontSize: 16,
    marginTop: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  confirmButton: {
    backgroundColor: "purple",
  },
});

export default SelectItemButton;
