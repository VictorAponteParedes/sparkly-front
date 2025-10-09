import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
  Image
} from 'react-native';
import { Icon } from '../common/Icon';
import { colors } from '../../theme/theme';
import styles from './styles'
import { fotoPerfil } from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../navigation/routes';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8;

interface DrawerProps {
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ children }) => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const openDrawer = () => {
    setIsOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: -DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsOpen(false));
  };

  const toggleDrawer = () => {
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header con botón hamburguesa */}
      <LinearGradient
        colors={[colors.pink[400], colors.amethyst[500]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Icon name="menu" size={24} color={colors.white} />
        </TouchableOpacity>

        <Image
          source={fotoPerfil}
          style={styles.profileImage}
        />

        <TouchableOpacity>
          <Icon name="notifications" size={24} color={colors.white} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Contenido principal */}
      <View style={styles.content}>
        {children}
      </View>

      {/* Overlay */}
      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={closeDrawer}
          activeOpacity={1}
        />
      )}

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <LinearGradient
          colors={[colors.pink[600], colors.amethyst[600], colors.pink[800]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.drawerContent}
        >
          <View style={styles.drawerContent}>
            {/* Header del Drawer */}
            <View style={styles.drawerHeader}>
              <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
                <Icon name="close" size={24} color={colors.white} />
              </TouchableOpacity>
              <View style={styles.drawerTitleContainer}>
                <Icon name="profile" size={24} color={colors.white} />
                <Text style={styles.drawerTitle}>Sparkly</Text>
              </View>
            </View>

            {/* Contenido del Drawer */}
            <View style={styles.drawerBody}>
              <DrawerItem
                icon="profile"
                label="Perfil"
                onPress={() => {
                  closeDrawer();
                  navigation.navigate(Routes.PROFILE);
                }}
              />
              <DrawerItem
                icon="settings"
                label="Configuración"
                onPress={() => {
                  closeDrawer();
                  navigation.navigate(Routes.SETTINGS);
                }}
              />
              <DrawerItem
                icon="carouselHorizontal"
                label="Descubrir"
                onPress={() => {
                  closeDrawer();
                  navigation.navigate(Routes.Match);
                }}
              />
              <DrawerItem
                icon="message"
                label="Mensajes"
                onPress={() => {
                  closeDrawer();
                  navigation.navigate(Routes.MessagesList);
                }}
              />
              <DrawerItem
                icon="videoCall"
                label="Llamar"
                onPress={() => {
                  closeDrawer();
                  navigation.navigate(Routes.Call);
                }}
              />
              <DrawerItem
                icon="info"
                label="Acerca de"
                onPress={() => {
                  closeDrawer();
                  // Navegar a Acerca de
                }}
              />
            </View>

            {/* Footer del Drawer */}
            <View style={styles.drawerFooter}>
              <Text style={styles.versionText}>V1.1.0</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

interface DrawerItemProps {
  icon: any;
  label: string;
  onPress: () => void;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
    <Icon name={icon} size={20} color={colors.white} />
    <Text style={styles.drawerItemText}>{label}</Text>
  </TouchableOpacity>
);