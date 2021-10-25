import React from 'react';
import { View, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Typography from './Typography';
import { Logo, Bg, BackIcon } from '../config/imagePath'
import Input from './Input';
import colors from '../config/colors';

const { width } = Dimensions.get('screen');

export default function Header({ goBack, onChange, value }) {
    return (
        <ImageBackground source={Bg} style={styles.container}>
            {goBack && (
                <TouchableOpacity
                    onPress={goBack}
                    style={styles.backArrow}
                    activeOpacity={0.5}
                >
                    <Image source={BackIcon} style={styles.bIcon} />
                </TouchableOpacity>
            )}
            <Image
                source={Logo}
                style={styles.logo}
                resizeMode='contain'
            />
            <Typography>
                Find your favorite Characters, Films, Species, Starships and Planets
            </Typography>
            <Input onChange={onChange} value={value} placeholder="Enter a search term" />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        height: 300,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        position: 'relative',
    },
    logo: {
        height: 48,
        width: "50%",
        marginBottom: 10
    },
    backArrow: {
        height: 40,
        width: 40,
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 50,
        position: "absolute",
        top: 40,
        left: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    bIcon: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    }
});

Header.propTypes = {
    uri: PropTypes.string,
    goBack: PropTypes.func,
    onChange: PropTypes.func,
};
