import React, { FC, useState, useRef } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, Modal, View } from 'react-native';
import { Icon } from 'react-native-elements';

const Dropdown = ({ label, data, onSelect }) => {
    const DropdownButton = useRef();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState({label: 'Crohn\'s And Colitis Foundation', value: '1'});
    const [dropdownTop, setDropdownTop] = useState(0);

    const toggleDropdown = () => {
        visible ? setVisible(false) : openDropdown();
    };

    const openDropdown = () => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
            
          setDropdownTop(py + h);
        });
        setVisible(true);
    };

    const onItemPress = (item) => {
        setSelected(item);
        onSelect(item.value);
        setVisible(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <Text style={{fontSize: 16, color: '#9CA3B7'}}>{item.label}</Text>
        </TouchableOpacity>        
    );

    const renderDropdown = () => {
        const selectingItems = data.filter((item) => item.value != selected.value)
        return (
            // <Modal visible={visible} transparent animationType='fade'>
                <View style={{
                    position: "absolute",
                }}>
                        { visible &&
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                        width: 353,
                                        height: 500,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={styles.overlay}
                                    >
                                        <View style={[styles.dropdown, { top: dropdownTop - 350 }]}>
                                            <FlatList
                                                data={selectingItems}
                                                renderItem={renderItem}
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>   
            // </Modal>             
        );
      };

    return (
        <View>
            {renderDropdown()}
            <TouchableOpacity
                ref={DropdownButton}    
                style={styles.button}
                onPress={toggleDropdown}
                activeOpacity={1}
            >           
            <View
                    style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 200,      
                        borderWidth: 2,
                        borderTopWidth: 0,
                        borderColor: "#dcdcdc",
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContetn: 'center',
                    }}
                >
                    <Text style={{fontSize: 16, paddingLeft: 20, color: '#9CA3B7'}}>
                        {(selected && selected.label) || label}
                    </Text>
                    <View style={styles.iconContainer}>
                        <Icon size={28} color={'#B2B2B2'} type="font-awesome" name="angle-down" />
                    </View>
                </View>
            </TouchableOpacity>
        </View>        
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        height: 55,
        borderRadius: 200,
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
        fontSize: 10,
    },
    dropdown: {
      position: 'absolute',
      backgroundColor: '#fff',
      width: '100%',
      shadowColor: '#000000',
      shadowRadius: 4,
      shadowOffset: { height: 4, width: 0 },
      shadowOpacity: 0.5,      
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      overflow: 'visible',
      paddingLeft: 10,
      paddingBottom: 18,
      paddingTop: 35,
      borderWidth: 1,
      borderColor: "#696969",
      borderTopColor: "#ffffff"
    },
    overlay: {
        width: '100%',
        height: '100%',
    },
    item: {
      paddingHorizontal: 10,
      paddingVertical: 7,
    },
  });
export default Dropdown;