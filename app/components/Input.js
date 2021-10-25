import React from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import { SearchIcon } from '../config/imagePath';

export default function Input({ value, onChange, placeholder }) {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Image
                    source={SearchIcon}
                    style={styles.searchContainer.searchIcon}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onChangeText={onChange}
                defaultValue={value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15
    },
    input: {
        flex: 1,
        height: 50,
        marginRight: 10,
        fontSize: 15,
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: "500",
        color: colors.black,
    },
    searchContainer: {
        height: "100%",
        width: 50,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        // child style
        searchIcon: {
            height: 20,
            width: 20,
        }
    }
});

Input.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
};
