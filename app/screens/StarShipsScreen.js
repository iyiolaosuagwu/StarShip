import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity } from "react-native"
import { connect } from 'react-redux'
import ContentLoader, { FacebookLoader, Instagram, Bullets } from 'react-native-easy-content-loader';
import Card from '../../app/components/Card'
import Header from '../../app/components/Header'
import Typography from '../../app/components/Typography'
import colors from '../../app/config/colors'
import { FetchStarships, storeRecentlyViewed } from '../../app/redux/action/fetch_action'

const { width } = Dimensions.get('screen');

export const StarShipsScreen = ({ navigation, fetchReducer, FetchStarships, storeRecentlyViewed }) => {
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        setState(fetchReducer?.starShip)
    }, []);

    // fetch data from server
    async function fetchData() {
        setLoading(true)
        await FetchStarships();
        setLoading(false)
    }

    function handleChange(text) {
        const newData = state.filter(
            (item) =>
                item.name.toLowerCase().includes(text.toLowerCase())
        );

        setState(newData);
        setState(text !== "" ? newData : fetchReducer?.starShip);
    }

    // function makes validation for recentlyViewed
    //  and naviagtes user to details page
    function dispatchToDetails(item) {
        const alreadyExisting = fetchReducer.recentlyViewed?.length > 0 &&
            fetchReducer.recentlyViewed.find(el => el.name.toLowerCase() === item.name.toLowerCase())

        navigation.navigate('DetailScreen', { data: item })
        if (alreadyExisting) {
            return console.log('item alreay in recentlyViewed state')
        } else {
            storeRecentlyViewed(item)
        }
    }

    const renderItem = ({ item }) => {
        return (
            <FacebookLoader active avatar loading={loading}>
                <Card
                    uri={item?.url}
                    title={item?.name}
                    model={item?.model}
                    description={item?.manufacturer}
                    onPress={() => dispatchToDetails(item)}
                />
            </FacebookLoader>
        )
    }

    return (
        <View
            style={styles.container}
        >
            <Header
                goBack={() => navigation.goBack()}
                onChange={(e) => handleChange(e)}
                value={search}
            />
            <Typography
                size={18}
                color="lightBlack"
                style={styles.headerText}
                weight="700"
            >
                Popular StarShips
            </Typography>

            <FlatList
                data={state}
                renderItem={renderItem}
                keyExtractor={(i, index) => index.toString()}
                contentContainerStyle={{
                    paddingLeft: 13,
                    marginBottom: 20,
                }}
                ListEmptyComponent={() => (
                    <View style={{ marginTop: 50 }}>
                        <Typography color="black">No StarShip Found</Typography>
                    </View>
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        backgroundColor: colors.white
    },
    headerText: {
        marginVertical: 22
    },
    nextBtn: {
        borderWidth: 1,
        borderColor: colors.black,
        margin: 5,
        paddingHorizontal: 10
    },
    pagenationView: {
        flexDirection: "row", marginVertical: 20, justifyContent: "center"
    },
})

const mapStateToProps = ({ fetchReducer }) => ({
    fetchReducer
})


const mapDispatchToProps = (dispatch) => ({
    FetchStarships: (payload) => dispatch(FetchStarships(payload)),
    storeRecentlyViewed: (payload) => dispatch(storeRecentlyViewed(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(StarShipsScreen)