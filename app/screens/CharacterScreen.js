import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity } from "react-native"
import { connect } from 'react-redux'
import ContentLoader, { FacebookLoader, Instagram, Bullets } from 'react-native-easy-content-loader';
import Card from '../../app/components/Card'
import Header from '../../app/components/Header'
import Typography from '../../app/components/Typography'
import colors from '../../app/config/colors'
import { FetchCharacters, storeRecentlyViewed } from '../../app/redux/action/fetch_action'
import { api_instance } from '../../app/config/axios';
import { ApiErrorHandler } from '../util/errorHandler';

const { width } = Dimensions.get('screen');


export const CharacterScreen = ({ navigation, fetchReducer, FetchCharacters, storeRecentlyViewed }) => {
    const [loading, setLoading] = useState(false);
    const [gridType, setGridType] = useState(false);
    const [state, setState] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchData()
    }, [page]);

    useEffect(() => {
        setState(fetchReducer?.characters)
    }, []);

    useEffect(() => {
        paginateCharacter()
    }, [page]);

    // fetch data from server
    async function fetchData() {
        setLoading(true)
        await FetchCharacters();
        setLoading(false)
    }

    // hanles the grid switch
    function handleToggle() {
        setGridType(prev => !prev)
    }

    // handles search 
    function handleChange(text) {
        const newData = state.filter(
            (item) =>
                item.name.toLowerCase().includes(text.toLowerCase())
        );

        setState(newData);
        setState(text !== "" ? newData : fetchReducer?.characters);
    }

    async function onPrevious() {
        setPage(prev => prev - 1)
    }

    async function onNext() {
        setPage(prev => prev + 1)
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

    // make paganation request to the server 
    async function paginateCharacter() {
        try {
            const res = await api_instance.get('/people/?page=' + page)
            setState(res?.data?.results)
        } catch (e) {
            ApiErrorHandler(
                e.response === undefined
                    ? e.message
                    : e.response.data?.message === undefined
                        ? e.response.data
                        : e.response.data?.message,
            );
        }
    }

    const renderItem = ({ item }) => {
        return (
            <FacebookLoader active avatar loading={loading}>
                <Card
                    type={gridType == false ? "grid" : "list"}
                    uri={item?.url}
                    title={item?.name}
                    model={item?.name}
                    description={item?.name}
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
                Popular Characters
            </Typography>

            <View style={styles.filerView}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Typography color="lightBlack">View</Typography>
                    <TouchableOpacity
                        style={styles.gridBtn}
                        onPress={handleToggle}
                    >
                        <Typography size={13} color="lightBlack">{gridType == false ? "grid" : "list"}</Typography>
                    </TouchableOpacity>
                </View>

                <View style={styles.pagenationView}>
                    <TouchableOpacity
                        style={styles.nextBtn}
                        onPress={() => onPrevious()}
                        disabled={page <= 1}
                    >
                        <Typography color="black">Prev</Typography>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.nextBtn}
                        onPress={() => onNext()}
                    >
                        <Typography color="black">Next</Typography>
                    </TouchableOpacity>
                </View>
            </View>

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
                        <Typography color="black">No Character Found</Typography>
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
    filerView: {
        height: 60,
        paddingHorizontal: 15,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    gridBtn: {
        borderColor: colors.black,
        paddingVertical: 3,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginLeft: 7,
        borderWidth: 1
    },
    pagenationView: {
        flexDirection: "row", marginVertical: 20, justifyContent: "center"
    },
    nextBtn: {
        borderWidth: 1,
        borderColor: colors.black,
        marginHorizontal: 5,
        paddingHorizontal: 10
    }
})

const mapStateToProps = ({ fetchReducer }) => ({
    fetchReducer
})


const mapDispatchToProps = (dispatch) => ({
    FetchCharacters: (payload) => dispatch(FetchCharacters(payload)),
    storeRecentlyViewed: (payload) => dispatch(storeRecentlyViewed(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterScreen)