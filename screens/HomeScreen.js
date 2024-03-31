import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    ScrollView,
    Pressable,
    TextInput,
    Image,
  } from "react-native";
  import React, { useState, useEffect, useCallback, useContext } from "react";
  import { Feather } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
  import { MaterialIcons } from "@expo/vector-icons";
  import { Entypo } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { SliderBox } from "react-native-image-slider-box";
  import axios from "axios";
  import ProductItem from "../components/ProductItem";
  import DropDownPicker from "react-native-dropdown-picker";
  import { useNavigation } from "@react-navigation/native";
  import { useSelector } from "react-redux";
  import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { UserType } from "../UserContext";
  import jwt_decode from "jwt-decode";
  
  const HomeScreen = () => {
    const list = [
      {
        id: "0",
        
        
        name: "Home",
      },
      {
        id: "1",
        
        name: "medicine",
      },
      {
        id: "3",
        
        name: "PainKillers",
      },
      {
        id: "4",
        image:
          "https://images.app.goo.gl/xzroY6fHgzqQPQVr6",
        name: "Truvada",
      },
      {
        id: "5",
        
        name: "PIS",
      },
      {
        id: "6",
        
      },
    ];
    const images = [
      
    ];
    const deals = [
      {
        id: "20",
        title: "tablets for relaxing your pain",
        oldPrice: 25000,
        price: 19000,
        
        carouselImages: [
          
        ],
        
      },
      {
        id: "30",
        title:
          "",
        oldPrice: 74000,
        price: 26000,
        image:
          "",
        carouselImages: [
          
        ],
        
      },
      {
        id: "40",
        title:
          "",
        oldPrice: 16000,
        price: 14000,
        image:
          "",
        carouselImages: [
          
        ],
        
      },
      {
        id: "40",
        title:
          "",
        oldPrice: 12999,
        price: 10999,
        image:
          "",
        carouselImages: [
          
        ],
      },
    ];
    const offers = [
      {
        id: "0",
        title:
          "",
        offer: "72% off",
        oldPrice: 7500,
        price: 4500,
        image:
          "",
        carouselImages: [
          
        ],
        color: "Green",
        size: "Normal",
      },
      {
        id: "1",
        title:
          "",
        offer: "40%",
        oldPrice: 7955,
        price: 3495,
        image: "",
        carouselImages: [
          
        ],
        color: "black",
        size: "Normal",
      },
      {
        id: "2",
        title: "",
        offer: "40%",
        oldPrice: 7955,
        price: 3495,
        
        
        size: "Normal",
      },
      {
        id: "3",
        title:
          "",
        offer: "40%",
        oldPrice: 24999,
        price: 19999,
        
        carouselImages: [
          
        ],
        color: "",
        size: "",
      },
    ];
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [category, setCategory] = useState("lamivudine");
    const { userId, setUserId } = useContext(UserType);
    const [selectedAddress,setSelectedAdress] = useState("");
    console.log(selectedAddress)
    const [items, setItems] = useState([
      { label: "enzyme inhibitor", value: "enzyme inhibitor" },
      { label: "lamivudine", value: "lamivudine" },
      { label: "abacavir", value: "abacavir" },
      { label: "entry inhabitor", value: "entry inhabitor" },
    ]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://fakestoreapi.com/products");
          setProducts(response.data);
        } catch (error) {
          console.log("error message", error);
        }
      };
  
      fetchData();
    }, []);
    const onGenderOpen = useCallback(() => {
      setCompanyOpen(false);
    }, []);
  
    const cart = useSelector((state) => state.cart.cart);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
      if (userId) {
        fetchAddresses();
      }
    }, [userId, modalVisible]);
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          `http://192.168.100.124:8081/addresses/${userId}`
        );
        const { addresses } = response.data;
  
        setAddresses(addresses);
      } catch (error) {
        console.log("error", error);
      }
    };
    useEffect(() => {
      const fetchUser = async () => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
      };
  
      fetchUser();
    }, []);
    console.log("address", addresses);
    return (
      <>
        <SafeAreaView
          style={{
            paddinTop: Platform.OS === "android" ? 40 : 0,
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <ScrollView>
            <View
              style={{
                backgroundColor: "#00CED1",
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 7,
                  gap: 10,
                  backgroundColor: "white",
                  borderRadius: 3,
                  height: 38,
                  flex: 1,
                }}
              >
                <AntDesign
                  style={{ paddingLeft: 10 }}
                  name="search1"
                  size={22}
                  color="black"
                />
                <TextInput placeholder="Search UtibuPharm" />
              </Pressable>
  
              <Feather name="mic" size={24} color="black" />
            </View>
  
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                padding: 10,
                backgroundColor: "#AFEEEE",
              }}
            >
              <Ionicons name="location-outline" size={24} color="black" />
  
              <Pressable>
              {selectedAddress ? (
                  <Text>
                    Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                  </Text>
                ) : (
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>
                      Add a Address
                  </Text>
                )}
              </Pressable>
  
              <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
            </Pressable>
  
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {list.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    margin: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 50, height: 50, resizeMode: "contain" }}
                    source={{ uri: item.image }}
                  />
  
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: "500",
                      marginTop: 5,
                    }}
                  >
                    {item?.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
  
            <SliderBox
              images={images}
              autoPlay
              circleLoop
              dotColor={"#13274F"}
              inactiveDotColor="#90A4AE"
              ImageComponentStyle={{ width: "100%" }}
            />
  
            <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
              Restocked This Week
            </Text>
  
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {deals.map((item, index) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("Info", {
                      id: item.id,
                      title: item.title,
                      price: item?.price,
                      carouselImages: item.carouselImages,
                      color: item?.color,
                      size: item?.size,
                      oldPrice: item?.oldPrice,
                      item: item,
                    })
                  }
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 180, height: 180, resizeMode: "contain" }}
                    source={{ uri: item?.image }}
                  />
                </Pressable>
              ))}
            </View>
  
            <Text
              style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: 2,
                marginTop: 15,
              }}
            />
  
            <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
              Muscle Relaxers
            </Text>
  
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {offers.map((item, index) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("Info", {
                      id: item.id,
                      title: item.title,
                      price: item?.price,
                      carouselImages: item.carouselImages,
                      color: item?.color,
                      size: item?.size,
                      oldPrice: item?.oldPrice,
                      item: item,
                    })
                  }
                  style={{
                    marginVertical: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ width: 150, height: 150, resizeMode: "contain" }}
                    source={{ uri: item?.image }}
                  />
  
                  <View
                    style={{
                      backgroundColor: "#E31837",
                      paddingVertical: 5,
                      width: 130,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 13,
                        fontWeight: "bold",
                      }}
                    >
                      Upto {item?.offer}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
  
            <Text
              style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: 2,
                marginTop: 15,
              }}
            />
  
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 20,
                width: "45%",
                marginBottom: open ? 50 : 15,
              }}
            >
              <DropDownPicker
                style={{
                  borderColor: "#B7B7B7",
                  height: 30,
                  marginBottom: open ? 120 : 15,
                }}
                open={open}
                value={category} //genderValue
                items={items}
                setOpen={setOpen}
                setValue={setCategory}
                setItems={setItems}
                placeholder="choose category"
                placeholderStyle={styles.placeholderStyles}
                onOpen={onGenderOpen}
                // onChangeValue={onChange}
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>
  
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {products
                ?.filter((item) => item.category === category)
                .map((item, index) => (
                  <ProductItem item={item} key={index} />
                ))}
            </View>
          </ScrollView>
        </SafeAreaView>
  
        <BottomModal
          onBackdropPress={() => setModalVisible(!modalVisible)}
          swipeDirection={["up", "down"]}
          swipeThreshold={200}
          modalAnimation={
            new SlideAnimation({
              slideFrom: "bottom",
            })
          }
          onHardwareBackPress={() => setModalVisible(!modalVisible)}
          visible={modalVisible}
          onTouchOutside={() => setModalVisible(!modalVisible)}
        >
          <ModalContent style={{ width: "100%", height: 400 }}>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Choose your Location
              </Text>
  
              <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
                Select a delivery location to see product availabilty and delivery
                options
              </Text>
            </View>
  
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* already added addresses */}
              {addresses?.map((item, index) => (
                <Pressable
                onPress={() => setSelectedAdress(item)}
                  style={{
                    width: 140,
                    height: 140,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                    marginRight: 15,
                    marginTop: 10,
                    backgroundColor:selectedAddress === item ? "#FBCEB1" : "white"
                  }}
                >
                  <View
                    style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>
  
                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                  >
                    {item?.houseNo},{item?.landmark}
                  </Text>
  
                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                  >
                    {item?.street}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                  >
                    Nairobi, Kenya
                  </Text>
                </Pressable>
              ))}
  
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("Address");
                }}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  marginTop: 10,
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#0066b2",
                    fontWeight: "500",
                  }}
                >
                  Add an Address or pick-up point
                </Text>
              </Pressable>
            </ScrollView>
  
            <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Entypo name="location-pin" size={22} color="#0066b2" />
                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Pickup Myself
                </Text>
              </View>
  
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Ionicons name="locate-sharp" size={22} color="#0066b2" />
                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Use My Currect location
                </Text>
              </View>
  
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <AntDesign name="earth" size={22} color="#0066b2" />
  
                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Deliver outside Nairobi
                </Text>
              </View>
            </View>
          </ModalContent>
        </BottomModal>
      </>
    );
  };
  
  export default HomeScreen;
  
  const styles = StyleSheet.create({});
  