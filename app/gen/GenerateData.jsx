import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BookingContext } from '../context/BookingContext';
import { useEffect, useContext } from 'react';

const AirportArr = [
  "New York (NYC)",
  "Los Angeles (LAX)",
  "Chicago (ORD)",
  "London (LDN)",
  "Paris (CDG)",
  "Tokyo (HND)",
  "Sydney (SYD)",
];
  

const generateData = () => {
    const currentDate = new Date();
    
    const data = [];
    for (let i = 0; i < 30; i++) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + i);
        for (let from of AirportArr) {
            for (let to of AirportArr) {
                if (from !== to) {
                    for (let classType of ["Economy", "Business"]) {
                        const numFlights = Math.floor(Math.random() * 10) + 1;
                        for (let i = 0; i < numFlights; i++) {
                            data.push({
                                from: from,
                                to: to,
                                date: date,
                                class: classType,
                                price: Math.floor(Math.random() * 50) + (classType === "Economy" ? 50 : 100),
                                departureTime: {
                                    hour: Math.floor(Math.random() * 24),
                                    minute: 0,
                                },
                                arrivalTime: {
                                hour: Math.floor(Math.random() * 24),
                                minute: 0,
                                },
                                flightNumber: `${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}-${Math.floor(10 + Math.random() * 90)}`,
                            });
                        }
                    }
                }
            }
        }
    }
    // console.log(data[0].price, data[1].price, data[2].price, data[3].price, data[4].price, data[5].price, data[6].price, data[7].price)
    return data;
};

const GenerateData = (props) => {
  const {flights, setFlights} = useContext(BookingContext);
  useEffect(() => {
    const data = generateData();
    setFlights(data);

    // console.log(flights)
  }, [])

  return (
    <></>
  )
}

export default GenerateData

const styles = StyleSheet.create({})