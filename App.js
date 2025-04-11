/* Arquivo: App.js */
import React, { useState } from 'react';
import { Alert, ScrollView, StatusBar } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import FormContrato from './components/FormContrato.native';
import CarrinhoMateriais from './components/CarrinhoMateriais.native';
import PreviewPedido from './components/PreviewPedido.native';
import { materiais } from './data/materiais';

const theme = {
  colors: {
    primaryDark: '#1a1a2e',
    secondaryDark: '#16213e',
    accentBlue: '#a7c5eb',
    textLight: '#e6f1ff',
    textMuted: '#b8c2d9',
    inputBackground: '#2a2a40',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336'
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '32px'
  },
  borderRadius: '6px'
};

const AppContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  padding: 16px;
  padding-top: ${StatusBar.currentHeight || 32}px;
`;

const CardContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 24px;
  margin-top: 24px;
`;

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    contrato: "",
    encarregado: "",
    obra: "",
    solicitante: "",
    os:"",
  });
  const [categoria, setCategoria] = useState("CIVIL");
  const [itens, setItens] = useState([]);

  const adicionarItem = (item, quantidade) => {
    const qtd = parseInt(quantidade);
    if (!isNaN(qtd) && qtd > 0) {
      setItens([...itens, { ...item, quantidade: qtd }]);
    }
  };

  const removerItem = (index) => {
    setItens(prevItens => prevItens.filter((_, i) => i !== index));
  };

  const enviarParaTelegram = async () => {
    const mensagem = `🏗️ *PEDIDO PERFIL-X* \n\n
    📄 *Contrato:* ${formData.contrato}\n
    👷 *Encarregado:* ${formData.encarregado}\n
    🏭 *Obra:* ${formData.obra}\n
    📋 *Solicitante:* ${formData.solicitante}\n\n
    📋 *Ordem de Serviço:* ${formData.os}\n\n
    📦 *Materiais:*\n${itens.map(item => 
      `▸ ${item.nome}: ${item.quantidade} ${item.unidade || 'un'}`
    ).join('\n')}`;
    try {
      const response = await fetch('https://SEU-BACKEND.com/api/enviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensagem })
      });

      if (!response.ok) throw new Error('Erro ao enviar');

      Alert.alert('✅ Sucesso', 'Pedido enviado com sucesso!');
      setItens([]);
      setStep(1);
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('❌ Erro', 'Falha ao enviar pedido.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <CardContainer>
          {step === 1 && (
            <FormContrato
              formData={formData}
              setFormData={setFormData}
              nextStep={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <CarrinhoMateriais
              categoria={categoria}
              setCategoria={setCategoria}
              categorias={Object.keys(materiais)}
              materiais={materiais[categoria] || []}
              adicionarItem={adicionarItem}
              nextStep={() => setStep(3)}
              voltar={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <PreviewPedido
              formData={formData}
              itens={itens}
              enviarParaTelegram={enviarParaTelegram}
              voltar={() => setStep(2)}
              removerItem={removerItem}
            />
          )}
        </CardContainer>
      </AppContainer>
    </ThemeProvider>
  );
}
