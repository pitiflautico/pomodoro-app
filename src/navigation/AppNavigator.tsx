import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';

// Screens
import HomeScreen from '../screens/Home/HomeScreen';
import ModesScreen from '../screens/Modes/ModesScreen';
import StatsScreen from '../screens/Stats/StatsScreen';
import CustomizationScreen from '../screens/Customization/CustomizationScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

export type RootTabParamList = {
  Home: undefined;
  Modes: undefined;
  Stats: undefined;
  Customization: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: theme.dark,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.card,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: theme.colors.notification,
        },
      }}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          headerStyle: {
            backgroundColor: theme.colors.card,
          },
          headerTintColor: theme.colors.text,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Timer',
            tabBarIcon: ({ color, size }) => <TabIcon name="⏱️" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Modes"
          component={ModesScreen}
          options={{
            title: 'Modes',
            tabBarIcon: ({ color, size }) => <TabIcon name="🔄" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            title: 'Statistics',
            tabBarIcon: ({ color, size }) => <TabIcon name="📊" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Customization"
          component={CustomizationScreen}
          options={{
            title: 'Customize',
            tabBarIcon: ({ color, size }) => <TabIcon name="⚙️" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => <TabIcon name="🎨" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Simple emoji icon component
const TabIcon: React.FC<{ name: string; color: string; size: number }> = ({ name }) => {
  return <span style={{ fontSize: 24 }}>{name}</span>;
};

export default AppNavigator;
