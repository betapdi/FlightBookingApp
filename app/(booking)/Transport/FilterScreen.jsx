import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { StyledView, StyledText } from '../../components/StyledComponents'
import React from 'react'
import { useContext } from 'react'
import { FilterContext } from '../../context/FilterContext'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Checkbox from '../../components/Checkbox'
import { Button } from '../../components/Button'
import { SortProperties } from '../../constants/SortProperties'
import { BtnColor } from '../../constants/BtnColor'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const FilterScreen = ({className, ...props}) => {
  const {departTimeFrames, arriveTimeFrames}= useContext(FilterContext)

  const {departFrame, setDepartFrame} = useContext(FilterContext)
  const {arriveFrame, setArriveFrame} = useContext(FilterContext)

  const {prices, setPrices} = useContext(FilterContext)
  const {sortBy, setSortBy} = useContext(FilterContext)

  const onPressReset = () => {
    setDepartFrame(departTimeFrames[0]);
    setArriveFrame(arriveTimeFrames[0]);

    setPrices([50, 150]);
    setSortBy(SortProperties);
  }

  const onPressDone = () => {
    props.changeScreen("flight");
  }

  const Btn = ({timeFrame, setFrame, chosenFrame}) => {
    const isChosen = (timeFrame.item.start === chosenFrame.start) ? 1 : 0;
    return(
      <Pressable onPress = {() => setFrame(departTimeFrames[timeFrame.index])}>
         <StyledView className = {`ml-2 rounded-xl ${BtnColor[isChosen].bgColor}`}>
           <StyledText className = {`py-2 px-4 ${BtnColor[isChosen].textColor}`}>{timeFrame.item.start + " - " + timeFrame.item.end}</StyledText>
         </StyledView>
      </Pressable>
    )
  }

  const onCheckSort = (index) => {
    const newState = sortBy.map((property, id) => {
      if (index === id) {
        return {name: property.name, status: !property.status};
      }

      else return {name: property.name, status: false};
    })

    // console.log(newState);

    setSortBy(newState);
    // console.log(index);
  }

  const onPressBack = () => {
    props.changeScreen("flight")
  }

  return (
    <StyledView style = {props.style} className = {`${className} w-11/12 mt-8 mx-4 items-center text-center justify-center`}>
      <StyledView className = "w-full flex flex-row justify-start items-center">
        <Pressable onPress = {onPressBack} style = {{flexBasis:'30%'}}>
          <Ionicons name="chevron-back" size = {25}/>
        </Pressable>
        <Text className = "mt-6 font-bold text-xl ">Filters</Text>
      </StyledView>

      <StyledView className = "w-full mt-6">
        <StyledText className = "font-pbold">Departure</StyledText>

        <FlatList data = {departTimeFrames}
          horizontal
          renderItem={(item) => <Btn timeFrame = {item} setFrame = {setDepartFrame} chosenFrame = {departFrame}/>}
          keyExtractor={item => item.start}
        />
      </StyledView>

      <StyledView className = "w-full mt-8">
        <StyledText className = "font-pbold">Arrival</StyledText>

        <FlatList data = {arriveTimeFrames}
          horizontal
          renderItem={(item) => <Btn timeFrame = {item}  setFrame = {setArriveFrame} chosenFrame = {arriveFrame}/>}
          keyExtractor={item => item.start}
        />
      </StyledView>

      <StyledView className = "w-full mt-6 items-center">
        <StyledText className = "relative left-[-45%] font-pbold">Price</StyledText>

        <MultiSlider
          sliderLength={350}
          values={[prices[0], prices[1]]}
          onValuesChange={(newValues) => {setPrices(newValues)}}
          min={50}
          max={150}
          allowOverlap={true}
          smoothSnapped  
        />

        <StyledView className = "flex flex-row w-full justify-between">
          <StyledView className = "basis-[46%] rounded-xl bg-white">
            <StyledText className = "text-xs font-plight pl-3 pt-1">From</StyledText>
            <StyledText className = "text-base pl-3 pb-1">${prices[0]}</StyledText>
          </StyledView>

          <StyledView className = "basis-[46%] rounded-xl bg-white">
            <StyledText className = "text-xs font-plight pl-3 pt-1">To</StyledText>
            <StyledText className = "text-base pl-3 pb-1">${prices[1]}</StyledText>
          </StyledView>
        </StyledView>
      </StyledView>

      <StyledView className = "w-full mt-8">
        <StyledText className= "font-pbold">Sort by</StyledText>

        <StyledView className = "mt-[-10] ml-[-17]">
          {sortBy.map((property, index) => {
            return(
              <Checkbox key = {index} title = {property.name} index = {index} 
                onCheck = {() => onCheckSort(index)} status = {property.status}/>
            )
          })}
        </StyledView>
      </StyledView>

      <StyledView className = "w-full mt-8 flex flex-row justify-between">
        <Button text = "Reset" className = "basis-[46%]" onPress = {onPressReset}
          textColor = "text-[#FEA36B]" bgColor = "bg-[#FFFFFF]"/>

        <Button text = "Done" className = "basis-[46%]" onPress = {onPressDone} />
      </StyledView>
    </StyledView>
  )
}

export default FilterScreen

const styles = StyleSheet.create({})