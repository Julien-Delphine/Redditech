import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Redditech from "./Redditecks.js";
import Base from './Base.js'
import Web from './Web.js'

console.reportErrorsAsExceptions = false;

const BaseStackNavigator = createStackNavigator( {
  Base: {
    screen: Base,
  },
  Web: {
    screen: Web,
  },
  Redditech,
})
export default createAppContainer(BaseStackNavigator)