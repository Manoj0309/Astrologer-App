import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const footerItems = [
  { title: 'Home', screen: 'Home', image: require('./pictures/home.jpg') },
  { title: 'Zodiac Info', screen: 'ZodiacInfo', image: require('./pictures/efg.png') },
  { title: 'Consultation', screen: 'Consultation', image: require('./pictures/operator.png') },
  { title: 'Articles', screen: 'Articles', image: require('./pictures/article.jpg') },
  { title: 'Yoga', screen: 'Tools', image: require('./pictures/abcsd.png') },
  { title: 'Notifications', screen: 'Notifications', image: require('./pictures/bell.png') }
];

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleFooterPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footer}>
        {footerItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleFooterPress(item.screen)}
            style={styles.footerItem}
          >
            <View style={[
              styles.iconContainer,
              route.name === item.screen && styles.highlightedIconContainer
            ]}>
              <Image
                source={item.image}
                style={[
                  styles.icon,
                  route.name === item.screen && styles.highlightedIcon
                ]}
              />
            </View>
            <Text style={[styles.footerText, route.name === item.screen && styles.highlightedText]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 5, // Shadow for footer
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  footerItem: {
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50, // Adjust based on your design
    height: 50, // Adjust based on your design
    borderRadius: 25, // Half of width and height to make it round
    backgroundColor: 'transparent', // Initially transparent background
  },
  highlightedIconContainer: {
    backgroundColor: '#E3F2FD', // Light blue background for highlighted icon
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#333', // Default icon color
  },
  highlightedIcon: {
    // Adjust color to your highlight color
  },
  footerText: {
    fontSize: 10,
    color: '#333',
  },
  highlightedText: {
    color: 'blue', // Adjust color to your highlight color
  },
});

export default Footer;
