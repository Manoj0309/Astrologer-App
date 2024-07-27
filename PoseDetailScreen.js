import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Dimensions } from 'react-native';

const { height: viewportHeight } = Dimensions.get('window');

const PoseDetailScreen = ({ route, navigation }) => {
  const { pose } = route.params;

  if (!pose) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Pose details not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Yoga Details</Text>
          <Text style={styles.sanskritName}>{pose.sanskrit_name_adapted}</Text>
        </View>

        {pose.url_png ? (
          <Image source={{ uri: pose.url_png }} style={styles.image} />
        ) : (
          <Text style={styles.noImageText}>No image available</Text>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Description:</Text>
          <Text style={styles.description}>{pose.pose_description}</Text>

          <Text style={styles.sectionTitle}>Benefits:</Text>
          <Text style={styles.benefits}>{pose.pose_benefits}</Text>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <Button title="START" onPress={() => navigation.navigate('TimerScreen')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 80, // Adjust based on footer height
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E3A59',
    marginBottom: 10,
    textAlign: 'center',
  },
  sanskritName: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  noImageText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 24,
  },
  benefits: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  errorText: {
    color: '#E74C3C',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  footerContainer: {
    padding: 16,
    backgroundColor: '#F7F9FC',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default PoseDetailScreen;
