import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useContext, createContext, useState } from 'react'

export const BookingContext = createContext({});

export const BookingProvider = ({ children }) => {
    //Flight Data (Generated Data)
    const [flights, setFlights] = useState(null);
    const [chosenFlight, setChosenFlight] = useState(null);

    //City value
    const [fromCity, setFromCity] = useState("NYC");
    const [toCity, setToCity] = useState("LDN");
  
    //Date Value
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
  
    //Passengers value
    const [numPerson, setNumPerson] = useState(0);
    const [numBaby, setNumBaby] = useState(0);
    const [numPet, setNumPet] = useState(0);
    const [numLuggage, setNumLuggage] = useState(0);

    //Passenger Seats
    const [seats, setSeats] = useState([]);

    //Flight seats state
    const [flightSeats, setFlightSeats] = useState([]);

      //Class value
  const [flightClass, setFlightClass] = useState("");
  const [flightClasses, setFlightClasses] = useState([
    {
      name: "Economy",
      bgColor: "bg-[#ffffff]",
      textColor: "text-[#089083]",
    },

    {
      name: "Business",
      bgColor: "bg-[#ffffff]",
      textColor: "text-[#089083]",
    }
  ]);

  //Transport value
  const [transport, setTransport] = useState([
    {
      bgColor: "bg-[#ffffff]",
      iconColor: "#089083",
    },

    {
      bgColor: "bg-[#ffffff]",
      iconColor: "#089083",
    },

    {
      bgColor: "bg-[#ffffff]",
      iconColor: "#089083",
    },

    {
      bgColor: "bg-[#ffffff]",
      iconColor: "#089083",
    },
  ]);

    return (
        <BookingContext.Provider value = {{fromCity, setFromCity, toCity, setToCity, chosenFlight, setChosenFlight,
            departureDate, setDepartureDate, returnDate, setReturnDate, numPerson, setNumPerson, flightClass, setFlightClass,
            numBaby, setNumBaby, numPet, setNumPet, numLuggage, setNumLuggage, flightClasses, setFlightClasses,
            transport, setTransport, flights, setFlights, seats, setSeats, flightSeats, setFlightSeats}}>
            {children}
        </BookingContext.Provider>
    )
}

const styles = StyleSheet.create({})