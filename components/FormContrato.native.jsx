import React, { useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { ScrollView, Alert } from 'react-native';

const FormContrato = ({ formData, setFormData, nextStep }) => {
  const contratos = [
    '117/2023 - Esporte Maricá',
    '267/2023 - Predial Maricá',
    '222/2023 - Escolas Maricá',
    '10/2021 - Eletricá Predial',
  ];

  const osInputRef = useRef(null);

  useEffect(() => {
    if (osInputRef.current) {
      osInputRef.current.focus();
    }
  }, []);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      formData.contrato &&
      formData.encarregado &&
      formData.obra &&
      formData.solicitante
    ) {
      nextStep();
    } else {
      Alert.alert('Preencha todos os campos obrigatórios');
    }
  };

  return (
    <ScrollView>
      <FormContainer>
        <FormTitle1>Pedidos</FormTitle1>
        <FormTitle>Perfil-X Construtora</FormTitle>

        <FormGroup>
          <Label>Contrato:</Label>
          <StyledPicker
            selectedValue={formData.contrato}
            onValueChange={(value) => handleChange('contrato', value)}
          >
            <Picker.Item label="Selecione um contrato" value="" />
            {contratos.map((contrato, index) => (
              <Picker.Item key={index} label={contrato} value={contrato} />
            ))}
          </StyledPicker>
        </FormGroup>

        <FormGroup>
          <Label>Encarregado:</Label>
          <Input
            placeholder="Nome do encarregado"
            value={formData.encarregado}
            onChangeText={(value) => handleChange('encarregado', value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Obra:</Label>
          <Input
            placeholder="Local/Nome da obra"
            value={formData.obra}
            onChangeText={(value) => handleChange('obra', value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Solicitante:</Label>
          <Input
            placeholder="Quem está solicitando"
            value={formData.solicitante}
            onChangeText={(value) => handleChange('solicitante', value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Ordem de Serviço:</Label>
          <Input
            ref={osInputRef}
            keyboardType="number-pad"
            placeholder="Número da ordem de serviço"
            value={formData.os}
            onChangeText={(value) => handleChange('os', value)}
          />
        </FormGroup>

        <NextButton onPress={handleSubmit}>
          <ButtonText>Próximo → Selecionar Materiais</ButtonText>
        </NextButton>
      </FormContainer>
    </ScrollView>
  );
};

export default FormContrato;


// Styled Components
const FormContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  padding: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.accentBlue};
`;

const FormTitle = styled.Text`
  color: ${({ theme }) => theme.colors.accentBlue};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.accentBlue};
  padding-bottom: 8px;
  font-size: 20px;
  font-weight: bold;
  align-items: center;
`;
const FormTitle1 = styled.Text`
  color: ${({ theme }) => theme.colors.accentBlue};
  padding-bottom: 8px;
  font-size: 20px;
  font-weight: bold;
  align-items: center;
`;
const FormGroup = styled.View`
  margin-top: 16px;
`;

const Label = styled.Text`
  color: white;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Input = styled.TextInput`
  padding: 12px;
  background-color: rgba(150, 148, 148, 0.356);
  border: 1px solid ${({ theme }) => theme.colors.accentBlue};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: white;
`;

const StyledPicker = styled(Picker)`
  background-color: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.textLight};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-top: 4px;
`;

const NextButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.accentBlue};
  padding: 14px;
  border-radius: ${({ theme }) => theme.borderRadius};
  align-items: center;
  margin-top: 24px;
`;

const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 16px;
  font-weight: 600;
`;
