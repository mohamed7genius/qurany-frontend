import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import DropDownPicker from 'react-native-dropdown-picker';

export default function SettingsDropdown({ titleTransKey, defaultValue, items, setItems, containerStyle=[], onChange }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [currentData, setCurrentData] = useState(items);

  return (
    <View style={ i18n.dir() == 'rtl' ? [styles.itemRTL, containerStyle] : [styles.item, containerStyle]}>
        <Text style={styles.title}>{t(titleTransKey)}</Text>
        <DropDownPicker
            containerStyle={styles.picker}
            open={open}
            value={value}
            items={currentData}
            setOpen={setOpen}
            setValue={setValue}
            setItems={(e) => {
                setCurrentData(e);
                setItems(e);
            }}
            onChangeValue={onChange}
            textStyle={{ fontFamily: 'regularFont' }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginVertical: 10,
        padding: 10,
    },
    itemRTL: {
        alignItems: 'center',
        flexDirection: 'row-reverse',
        backgroundColor: '#fff',
        marginVertical: 10,
        padding: 10,
    },
    title: {
        width: '45%',
        marginHorizontal: 10,
        fontSize: 20,
        fontFamily: 'regularFont',
    },
    picker: {
        width: '50%',
        fontFamily: 'regularFont'
    }
});
