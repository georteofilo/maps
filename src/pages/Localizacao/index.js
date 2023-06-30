import React, { useEffect, useState } from "react";
import {View, Text} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';

import * as Local from 'expo-location';
import styles from "../../../style";
import {locais} from "../../bd/Locais";
import Maps from "../Maps";


export default function Localizacao(){
    const [location, setLocation] = useState(null);

    async function requestLocationPermissions(){
        const { granted } = await Local.requestForegroundPermissionsAsync();

        if(granted){
            const currentPosition = await Local.getCurrentPositionAsync();
            setLocation(currentPosition);
        }
    }

    useEffect(() =>{
        requestLocationPermissions();
    }, [])

    useEffect(() => {
        Local.watchPositionAsync({
            accuracy: Local.LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
        }, (response) => {
            setLocation(response);
        });
    }, []);

    return(
        <View style={styles.container}>
            {
                location &&
                <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                >
                    {locais.map((data) => (
                        <Maps key={data.id} latitude={data.latitude} longitude={data.longitude} />
                    ))}

                    <Marker 
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        pinColor="blue"
                    >
                        <Callout>
                            <View>
                                <Text>Você</Text>
                            </View>
                        </Callout>

                    </Marker>
                </MapView>
            }
        </View>
    );
}