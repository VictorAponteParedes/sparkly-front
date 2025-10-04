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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.8;

interface DrawerProps {
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ children }) => {
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
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Icon name="menu" size={24} color={colors.pink[500]} />
        </TouchableOpacity>
        <Image
          source={fotoPerfil}
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
            borderColor: colors.pink[500],
            borderWidth: 1
          }}
        />
        <TouchableOpacity >
          <Icon name="notifications" size={24} color={colors.pink[500]} />
        </TouchableOpacity>
      </View>

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
        <View style={styles.drawerContent}>
          {/* Header del Drawer */}
          <View style={styles.drawerHeader}>
            <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
              <Icon name="close" size={24} color={colors.white} />
            </TouchableOpacity>
            <View style={styles.drawerTitleContainer}>
              <Icon name="profile" size={32} color={colors.white} />
              <Text style={styles.drawerTitle}>Sparkly</Text>
            </View>
          </View>

          {/* Contenido del Drawer */}
          <View style={styles.drawerBody}>
            <DrawerItem
              icon="home"
              label="Inicio"
              onPress={() => {
                closeDrawer();
                // Navegar a Home
              }}
            />
            <DrawerItem
              icon="profile"
              label="Perfil"
              onPress={() => {
                closeDrawer();
                // Navegar a Perfil
              }}
            />
            <DrawerItem
              icon="settings"
              label="Configuración"
              onPress={() => {
                closeDrawer();
                // Navegar a Configuración
              }}
            />
            <DrawerItem
              icon="match"
              label="Matchs"
              onPress={() => {
                closeDrawer();
                // Navegar a Configuración
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
            <Text style={styles.versionText}>v1.0.0</Text>
          </View>
        </View>
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