import { PaperProvider, useTheme } from 'react-native-paper';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {RouteStackParamList} from "./routes/routePage";

import routes from "./routes/routeList";

import Home from './pages/Home';
import UserDetail from './pages/UserDetail';

function App() { 
    const Stack = createNativeStackNavigator<RouteStackParamList>();
    const theme = useTheme();

    return (
      <Stack.Navigator 
        initialRouteName={routes.home}
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          }
        }}  
      >
        <Stack.Screen name={routes.home} component={Home} />
        <Stack.Screen name={routes.email} component={UserDetail} />
      </Stack.Navigator>
    );
}

export default function BaseApp() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider>
          <App />
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}