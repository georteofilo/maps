import React from "react";
import {Marker} from 'react-native-maps'



export default function Maps({latitude, longitude}){
    return (
        <Marker 
            coordinate={{
                latitude: latitude,
                longitude: longitude,
            }}
        />
    );
}