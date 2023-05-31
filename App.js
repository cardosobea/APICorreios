import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const ViaCepApp = () => {
  const [cep, setCep] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchViaCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const jsonData = await response.json();
      if (response.ok) {
        setData(jsonData);
        setError(null);
      } else {
        setError(jsonData.message);
        setData(null);
      }
    } catch (error) {
      setError('Erro ao buscar os dados do CEP');
      setData(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="CEP"
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={text => setCep(text)}
      />
      <Button mode="contained" onPress={fetchViaCep}>
        Consultar CEP
      </Button>
      {data && (
        <View style={styles.dataContainer}>
          <Text style={styles.text}>CEP: {data.cep}</Text>
          <Text style={styles.text}>Logradouro: {data.logradouro}</Text>
          <Text style={styles.text}>Complemento: {data.complemento}</Text>
          <Text style={styles.text}>Bairro: {data.bairro}</Text>
          <Text style={styles.text}>Localidade: {data.localidade}</Text>
          <Text style={styles.text}>UF: {data.uf}</Text>
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
  dataContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  text: {
    marginBottom: 8,
  },
  error: {
    marginTop: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default ViaCepApp;
