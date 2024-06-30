import { StyledView } from "./StyledComponents"

export const Box = ({ className, ...props }) => {
    return <StyledView className={`flex content-center text-center h-14 items-center text-white bg-fuchsia-500 rounded ${className}`} {...props}/>
}