import { LoadScript } from "@react-google-maps/api";

export const Load = ({children}) =>{

    return(
        <div>
            <LoadScript googleMapsApiKey="AIzaSyCDakSjifzNklAYqB0o4zbM2f66mafBoDk"
        region="ao">
            {children}
            </LoadScript>
        </div>
    )
}