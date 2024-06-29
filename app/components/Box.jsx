import { StyledText } from "./StyledComponents"

export default Box = ({ className, ...props }) => {
    return <StyledText className={`flex text-center h-14 justify-center items-center text-white bg-fuchsia-500 rounded ${className}`} {...props}/>
}