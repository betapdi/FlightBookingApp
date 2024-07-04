import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useContext, createContext, useState } from 'react'

import { TimeFrames } from '../constants/TimeFrames';
import { SortProperties } from '../constants/SortProperties';

export const FilterContext = createContext({});

export const FilterProvider = ({ children }) => {
	const [departTimeFrames, setDepartTimeFrames] = useState(TimeFrames);
  const [arriveTimeFrames, setArriveTimeFrames] = useState(TimeFrames);

	const [departFrame, setDepartFrame] = useState(departTimeFrames[0]);
  const [arriveFrame, setArriveFrame] = useState(arriveTimeFrames[0]);

  const [prices, setPrices] = useState([50, 150]);
  const [sortBy, setSortBy] = useState(SortProperties);

  return (
		<FilterContext.Provider value = {{departTimeFrames, arriveTimeFrames, departFrame, setDepartFrame,
			arriveFrame, setArriveFrame, prices, setPrices, sortBy, setSortBy}}>
			{children}
		</FilterContext.Provider>
  )
}
