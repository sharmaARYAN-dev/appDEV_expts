import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

interface Rate {
  currency: string;
  value: number;
}

export default function App() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = 'f55b68bf54691c65e2565ee317be0c8b'; // your Fixer API key

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get(`https://data.fixer.io/api/latest?access_key=${API_KEY}`);
        const data = res.data;
        if (data.success) {
          const ratesArray = Object.entries(data.rates).map(([currency, value]) => ({
            currency,
            value: Number(value),
          }));
          setRates(ratesArray);
        } else {
          console.error('API Error:', data.error);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading exchange rates...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Currency Exchange Rates (Base: EUR)</Text>
      <FlatList
        data={rates.slice(0, 15)} // Display first 15 currencies for clarity
        keyExtractor={(item) => item.currency}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.currency}>{item.currency}</Text>
            <Text style={styles.value}>{item.value.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 2,
  },
  currency: { fontSize: 16, fontWeight: '600' },
  value: { fontSize: 16, color: '#333' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
