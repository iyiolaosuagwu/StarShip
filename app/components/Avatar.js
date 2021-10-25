import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Bg, avatar } from '../config/imagePath';

export default function Avatar({ uri, height, width, style }) {
    return uri ? (
        <Image source={{ uri }} style={[styles.imageWrapper, {
            height,
            width,
            style
        }]} />
    ) : (
            <Image source={avatar} style={[styles.imageWrapper, {
                height,
                width,
                style
            }]} />
        )
}

const styles = StyleSheet.create({
    imageWrapper: {
        height: 100,
        width: "100%",
    },
});

Avatar.propTypes = {
    uri: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
};

Avatar.defaultProps = {
    style: {},
    height: 100,
    width: "100%",
};
