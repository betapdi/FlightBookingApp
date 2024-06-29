import { Text, View } from 'react-native'
import { styled } from 'nativewind'

const StyleText = styled(Text);
const StyleView = styled(View);

export const StyledText = ({ className, ...props }) => {
    return <StyleText className = {`${className}`} {...props}/>
}

export const StyledView = ({ className, ...props }) => {
    return <StyleView className = {`${className}`} {...props}/>
}