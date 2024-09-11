import {createContext} from "react";

const cartContext=createContext()
export default cartContext;

//Create Context() > utils folder
//useState Variable >> App.jsx > Root Component
//context will be provided to main/root component(App.jsx) alongwith useState Variable ?? with a value{[val,setval]}
//<contextCreatedName.Provider value={[val,setVal]}>
//block of code. navbar || routes || ....
//<.contextCreatedName.Provider>

///useContext()
//whenever I need the data in the component.
//const stateVariable = useContext(contextCreatedName)
//use it whenever u want to use it.

