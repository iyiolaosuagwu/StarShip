import React from 'react'
import { connect } from 'react-redux'
import Typography from '../../app/components/Typography'
import ContentLoader, { FacebookLoader, Instagram, Bullets } from 'react-native-easy-content-loader';
import { View, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Logo, Bg3, BackIcon } from '../../app/config/imagePath'
import colors from '../../app/config/colors';
import Card from '../../app/components/Card';


const { width } = Dimensions.get('screen');

export const DetailScreen = ({ navigation, route, fetchReducer }) => {

    // distructures data from params into component
    const { data } = route.params

    const renderItem = ({ item }) => (
        <Card
            type="grid"
            width={350}
            uri={item?.url}
            title={item?.name}
            model={item?.name}
            description={item?.name}
            onPress={() => navigation.navigate('DetailScreen', { data: item })}
        />
    )

    return (
        <ScrollView>
            <ImageBackground source={Bg3} style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backArrow}
                    activeOpacity={0.5}
                >
                    <Image source={BackIcon} style={styles.bIcon} />
                </TouchableOpacity>

                <Typography weight="700" size={30}>
                    {data.name}
                </Typography>
            </ImageBackground>

            <View style={styles.content}>
                <Typography weight="700" color="black" size={25} align="left">
                    {data.name}
                </Typography>
                <Typography color="lightBlack" align="left" size={13} style={styles.mb2}>{data.manufacturer}</Typography>
                <Typography color="lightBlack" align="left" size={13} style={styles.mb2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet commodo tellus. Proin euismod laoreet commodo. Cras congue, ipsum a luctus eleifend, augue ipsum viverra ante, a porttitor magna purus eget lacus. Donec mattis pharetra est, quis molestie metus vulputate eu. Etiam sed consectetur velit. Sed et aliquam velit. Nullam hendrerit suscipit diam id semper. Aliquam eget congue massa. Fusce eu diam ut lorem fermentum gravida. Morbi eu sodales nulla, quis fringilla magna.</Typography>
                <Typography color="lightBlack" align="left" size={13} style={styles.mb2}>Etiam ultricies velit non purus feugiat volutpat. Curabitur molestie, nulla ac finibus fringilla, sapien sem pulvinar orci, et bibendum lectus enim et nunc. Cras ut bibendum est, sed suscipit dui. Nam nulla libero, feugiat ut elit et, dignissim fermentum eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In non metus eu ligula consequat consectetur. Duis euismod elementum nisl ac efficitur. Curabitur sed congue metus. Morbi eget tellus gravida, luctus arcu sed, suscipit felis. Pellentesque ut lorem ut justo aliquam lobortis vitae nec mi. Ut vitae efficitur nisl, sit amet sagittis nisl.</Typography>
            </View>

            {fetchReducer.recentlyViewed.length > 0 && (
                <>
                    <View style={styles.recntlyViewed}>
                        <Typography weight="700" color="black" size={15}>Recently viewed Starships</Typography>
                    </View>

                    <FlatList
                        data={fetchReducer.recentlyViewed}
                        renderItem={renderItem}
                        keyExtractor={(i, index) => index.toString()}
                        contentContainerStyle={{
                            paddingLeft: 13,
                            marginBottom: 20,
                            marginTop: 30
                        }}
                        ListEmptyComponent={() => (
                            <View style={{ marginTop: 50 }}>
                                <Typography color="black">No Recently viewed Starships</Typography>
                            </View>
                        )}
                        horizontal
                        numColumns={1}
                        showsHorizontalScrollIndicator={false}
                    />
                </>
            )}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        width,
        height: 200,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 40,
        position: 'relative',
        paddingBottom: 40
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 20
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
    },
    mb2: {
        marginVertical: 13
    },
    recntlyViewed: {
        borderWidth: 1,
        width: "60%",
        alignSelf: "center",
        paddingVertical: 4,
        borderColor: colors.lightBlack
    }
});


const mapStateToProps = ({ fetchReducer }) => ({
    fetchReducer
})

export default connect(mapStateToProps, {})(DetailScreen)