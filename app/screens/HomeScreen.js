import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, FlatList, ScrollView, Image, ImageBackground, TouchableOpacity } from "react-native"
import { connect } from 'react-redux'
import ContentLoader, { FacebookLoader, Instagram, Bullets } from 'react-native-easy-content-loader';
import Card from '../../app/components/Card';
import Header from '../../app/components/Header';
import Typography from '../../app/components/Typography';
import colors from '../../app/config/colors';
import { Bg, Bg2 } from '../../app/config/imagePath';
import { FetchStarships, FetchCharacters, FetchPlanets, storeRecentlyViewed } from '../../app/redux/action/fetch_action';

const { width } = Dimensions.get('screen');


export const HomeScreen = ({ navigation, fetchReducer, FetchStarships, FetchCharacters, FetchPlanets, storeRecentlyViewed }) => {
    const [search, setSearch] = useState('')
    const [starShips, setStarShips] = useState([])
    const [characters, setCharacters] = useState([])
    const [planets, setPlanets] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        let topStarShip = fetchReducer?.starShip?.filter(el => el?.hyperdrive_rating >= 3.0)
        let topCharacter = fetchReducer?.characters?.filter(el => el?.mass >= 100)
        setCharacters(topCharacter)
        setStarShips(topStarShip)
        setPlanets(fetchReducer?.planets)
    }, []);

    // fetch data from server
    // makes multy server request at same time 
    // to display corresponding data
    async function fetchData() {
        setLoading(true)
        await FetchCharacters();
        await FetchStarships();
        await FetchPlanets();
        setLoading(false)
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


    function handleChange(text) {
        const newData = starShips.filter(
            (item) =>
                item.name.toLowerCase().includes(text.toLowerCase())
        );

        const newData2 = starShips.filter(
            (item) =>
                item.name.toLowerCase().includes(text.toLowerCase())
        );

        setStarShips(newData);
        setStarShips(text !== "" ? newData : fetchReducer?.starShip);

        setCharacters(newData2);
        setCharacters(text !== "" ? newData2 : fetchReducer?.characters);
    }

    const renderItem = ({ item }) => (
        <FacebookLoader active avatar loading={loading}>
            <Card
                type="grid"
                width={350}
                uri={item?.url}
                title={item?.name}
                model={item?.name}
                description={item?.name}
                onPress={() => dispatchToDetails(item)}
            />
        </FacebookLoader>
    )

    const renderItemStarShips = ({ item }) => (
        <FacebookLoader active avatar loading={loading}>
            <Card
                width={200}
                uri={item?.url}
                title={item?.name}
                model={item?.model}
                description={item?.manufacturer}
                onPress={() => dispatchToDetails(item)}
            />
        </FacebookLoader>
    )

    const renderItemPlanets = ({ item }) => {
        return (
            <FacebookLoader active avatar loading={loading}>
                <ImageBackground source={Bg2} style={styles.plantsCard}>
                    <Typography color="white" weight="700" size={14}>{item.name}</Typography>
                </ImageBackground>
            </FacebookLoader>
        )
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{
                paddingBottom: 20
            }}
        >
            <Header
                onChange={(e) => handleChange(e)}
                value={search}
            />
            <View>
                <View style={styles.flexHeader}>
                    <Typography
                        size={18}
                        color="lightBlack"
                        style={styles.headerText}
                        weight="700"
                    >
                        Popular Starships
                    </Typography>

                    <TouchableOpacity onPress={() => navigation.navigate("StarShipsScreen")}>
                        <Typography color="lightBlack">View more</Typography>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={starShips}
                    renderItem={renderItemStarShips}
                    keyExtractor={(i, index) => index.toString()}
                    contentContainerStyle={{
                        paddingLeft: 13,
                        marginBottom: 20
                    }}
                    ListEmptyComponent={() => (
                        <View style={{ marginTop: 50 }}>
                            <Typography color="black">No Starship Found</Typography>
                        </View>
                    )}
                    horizontal
                    numColumns={1}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View>
                <Typography
                    size={18}
                    color="lightBlack"
                    style={styles.headerText}
                    weight="700"
                >
                    Popular Planets
                </Typography>
                <FlatList
                    data={planets}
                    renderItem={renderItemPlanets}
                    keyExtractor={(i, index) => index.toString()}
                    contentContainerStyle={{
                        paddingLeft: 13,
                        marginBottom: 20
                    }}
                    horizontal
                    numColumns={1}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View>
                <View style={styles.flexHeader}>
                    <Typography
                        size={18}
                        color="lightBlack"
                        style={styles.headerText}
                        weight="700"
                    >
                        Popular Characters
                    </Typography>

                    <TouchableOpacity onPress={() => navigation.navigate("CharacterScreen")}>
                        <Typography color="lightBlack">View more</Typography>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={characters}
                    renderItem={renderItem}
                    keyExtractor={(i, index) => index.toString()}
                    contentContainerStyle={{
                        paddingLeft: 13,
                        marginBottom: 20
                    }}
                    ListEmptyComponent={() => (
                        <View style={{ marginTop: 50 }}>
                            <Typography color="black" align="center">No Character Found</Typography>
                        </View>
                    )}
                    horizontal
                    numColumns={1}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        backgroundColor: colors.white
    },
    headerText: {
        marginVertical: 22,
    },
    plantsCard: {
        height: 200,
        width: 200,
        marginRight: 20,
        justifyContent: "flex-end",
        paddingBottom: 20,
    },
    flexHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15
    }
});


const mapStateToProps = ({ fetchReducer }) => ({
    fetchReducer
})

const mapDispatchToProps = (dispatch) => ({
    FetchCharacters: (payload) => dispatch(FetchCharacters(payload)),
    FetchStarships: (payload) => dispatch(FetchStarships(payload)),
    FetchPlanets: (payload) => dispatch(FetchPlanets(payload)),
    storeRecentlyViewed: (payload) => dispatch(storeRecentlyViewed(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)