import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // ou use outra lib de ícones

const PreviewPedido = ({ formData, itens, voltar, removerItem }) => {
  const API_URL = '/api/enviar-pedido'; // substitua conforme necessário

  const resetarFluxo = () => {
    // Em React Native, navegação costuma ser feita via react-navigation
    // Aqui pode ser um redirect pra a tela inicial
    Alert.alert('Pedido enviado!', 'Você será redirecionado.');
    // Ex: navigation.navigate('Inicio')
  };

  const enviarParaTelegram = async () => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'PRe',
        },
        body: JSON.stringify({
          contrato: formData.contrato,
          encarregado: formData.encarregado,
          obra: formData.obra,
          solicitante: formData.solicitante,
          materiais: itens,
        }),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('✅ Sucesso', 'Pedido enviado ao grupo do Telegram!');
        resetarFluxo();
      } else {
        Alert.alert('❌ Falha', data.error || 'Erro desconhecido');
      }
    } catch (error) {
      Alert.alert('❌ Erro de conexão', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirme o Pedido</Text>
  
      <Info label="Contrato:" value={formData.contrato} />
      <Info label="Encarregado:" value={formData.encarregado} />
      <Info label="Obra:" value={formData.obra} />
      <Info label="Solicitante:" value={formData.solicitante} />
      <Info label="Ordem de Serviço:" value={formData.os} />
  
      <Text style={styles.subTitle}>Materiais:</Text>
      {itens.length === 0 ? (
        <Text style={{ color: 'gray', fontStyle: 'italic' }}>Nenhum item adicionado.</Text>
      ) : (
        itens.map((item, index) => (
          <View key={index} style={styles.materialItem}>
            <View style={styles.materialInfo}>
              <Text style={styles.materialNome}>{item.nome}</Text>
              <Text style={styles.materialQuantidade}>
                {item.quantidade} {item.unidade || 'un'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removerItem(index)}>
              <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))
      )}
  
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.voltarButton} onPress={voltar}>
          <Text style={styles.buttonText}>← Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.confirmarButton,
            itens.length === 0 && styles.disabledButton,
          ]}
          onPress={enviarParaTelegram}
          disabled={itens.length === 0}
        >
          <Text style={styles.buttonText}>Confirmar e Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Info = ({ label, value }) => (
  <View style={styles.infoGroup}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1e1e2f',
    flex: 1,
  },
  title: {
    color: '#a7c5eb',
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#a7c5eb',
    marginBottom: 16,
    paddingBottom: 4,
  },
  subTitle: {
    color: '#a7c5eb',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  infoGroup: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: 100,
    color: '#a7c5eb',
    fontWeight: 'bold',
  },
  value: {
    color: '#fff',
    flexShrink: 1,
  },
  materialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2e2e3e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  materialInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  materialNome: {
    color: '#fff',
    flex: 2,
  },
  materialQuantidade: {
    color: '#fff',
    flex: 1,
    textAlign: 'right',
    paddingRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 12,
    flexWrap: 'wrap',
  },
  voltarButton: {
    backgroundColor: '#666',
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  confirmarButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    flex: 2,
  },
  disabledButton: {
    backgroundColor: '#999',
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default PreviewPedido;
