import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types';
import Typography from './Typography'
import Avatar from "./Avatar"
import { Next } from '../config/imagePath'
import colors from '../config/colors'
import { createDispatchHook } from 'react-redux'

export default function Card({ type, width, mr, onPress, uri, description, title, model }) {
    return (
        <View style={[styles.container, {
            flexDirection: type === "grid" ? "row" : "column",
            width: type === "grid" ? 350 : 200,
            width,
            marginBottom: mr
        }]}>
            <Avatar
                height={type === "grid" ? "auto" : 200}
                width={type === "grid" ? "50%" : "100%"}
            />
            <View style={[styles.cardBody, {
                flex: type === "grid" ? 1 : 0,
            }]}>
                <Typography
                    align="left"
                    color="black"
                    weight="700"
                >
                    {title}
                </Typography>
                {type === "grid" && (
                    <Typography
                        align="left"
                        color="black"
                        weight="normal"
                        size={10}
                    >
                        {model}
                    </Typography>
                )}
                <Typography
                    align="left"
                    weight="normal"
                    color="lightBlack"
                    style={styles.decription}
                    size={11}
                    weight="normal"
                >
                    {description}
                </Typography>

                <TouchableOpacity style={styles.moreBtn} onPress={onPress}>
                    <Typography weight="700" size={10}>Read more</Typography>
                    <Image source={Next} style={styles.nextIcon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        backgroundColor: colors.whiteGray,
        marginRight: 15,
        overflow: "hidden"
    },
    cardBody: {
        overflow: "hidden",
        paddingHorizontal: 15,
        paddingTop: 15,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    decription: {
        marginTop: 7
    },
    moreBtn: {
        backgroundColor: colors.gray,
        width: 100,
        height: 32,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        marginTop: 20,
        alignSelf: "flex-end",
        marginBottom: 15,
    },
    nextIcon: {
        height: 15,
        width: 15,
        resizeMode: "contain"
    }
});

Card.defaultProps = {
    width: "auto",
    mr: 15,
};
