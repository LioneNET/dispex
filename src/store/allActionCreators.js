import ClientActionCreator from "./redusers/HousingStock/ClientActionCreator";
import LocationActionCreator from "./redusers/locations/LocationActionCreator";

const allActionCreators = {
    ...ClientActionCreator,
    ...LocationActionCreator
}

export default allActionCreators