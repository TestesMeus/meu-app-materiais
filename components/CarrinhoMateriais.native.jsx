import React, { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

const CarrinhoMateriais = ({
  categoria,
  setCategoria,
  materiais,
  categorias,
  adicionarItem,
  nextStep,
  voltar,
}) => {
  const [quantidades, setQuantidades] = useState({});
  const [busca, setBusca] = useState("");

  const handleQuantidadeChange = (itemId, value) => {
    setQuantidades((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const handleAdicionarItem = (item) => {
    const quantidade = quantidades[item.id] || 0;
    adicionarItem(item, quantidade);

    setQuantidades((prev) => ({
      ...prev,
      [item.id]: "",
    }));
  };

  const materiaisFiltrados = materiais.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <MaterialItem>
      <MaterialText>
        {item.nome} ({item.unidade})
      </MaterialText>
      <Row>
        <QtdInput
          keyboardType="number-pad"
          value={quantidades[item.id] || ""}
          onChangeText={(text) => handleQuantidadeChange(item.id, text)}
          placeholder="Qtd"
          placeholderTextColor="#b8c2d9"
        />
        <AddButton
          onPress={() => handleAdicionarItem(item)}
          disabled={!quantidades[item.id] || quantidades[item.id] <= 0}
        >
          <ButtonText>Adicionar</ButtonText>
        </AddButton>
      </Row>
    </MaterialItem>
  );

  return (
    <FlatList
      data={materiaisFiltrados}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={
        <Header>
          <Title>Materiais - {categoria}</Title>
          <TopBar>
            <SmallButton onPress={voltar}>
              <ButtonText>← Voltar</ButtonText>
            </SmallButton>
          </TopBar>

          <RNPickerSelect
            onValueChange={(value) => setCategoria(value)}
            value={categoria}
            placeholder={{ label: "Categorias:", value: null }}
            items={categorias.map((cat) => ({
              label: cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase(),
              value: cat,
            }))}
            useNativeAndroidPickerStyle={false}
            Icon={() => {
              return <Ionicons name="chevron-down" size={20} color="white" />;
            }}
            style={{
              inputAndroid: {
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: 10,
                borderRadius: 99,
                marginBottom: 16,
                borderColor: "white",
                borderWidth: 1,
              },
              iconContainer: {
                top: 10,
                right: 10,
              },
              placeholder: {
                color: "#fafafa",
              },
            }}
          />

          <SearchBar>
            <FontAwesome name="search" size={16} color="#b8c2d9" />
            <SearchInput
              placeholder="Buscar material..."
              placeholderTextColor="#b8c2d9"
              value={busca}
              onChangeText={setBusca}
            />
          </SearchBar>
        </Header>
      }
      ListFooterComponent={
        <Footer>
          <FinishButton onPress={nextStep}>
            <ButtonText>Finalizar Pedido</ButtonText>
          </FinishButton>
        </Footer>
      }
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default CarrinhoMateriais;

// Styled Components
const Header = styled.View``;
const Title = styled.Text`
  color: white;
  font-size: 20px;
  margin-bottom: 12px;
`;
const TopBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;
const SmallButton = styled.TouchableOpacity`
  background-color: #bb0707;
  padding: 5px 15px;
  border-radius: 6px;
`;
const PickerWrapper = styled.View`
  background-color: #ffffff2d;
  border-radius: 6px;
  padding: 1px;
  min-height: 40px;
  color: white;
  margin-bottom: 16px;
`;
const SearchBar = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #16213e;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 12px;
  border: 0.5px solid white;
`;
const SearchInput = styled.TextInput`
  color: white;
  margin-left: 8px;
  flex: 1;
`;

const MaterialItem = styled.View`
  background-color: #1a1a2e;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 12px;
`;
const MaterialText = styled.Text`
  color: #e6f1ff;
  margin-bottom: 6px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const QtdInput = styled.TextInput`
  background-color: white;
  color: black;
  padding: 8px;
  border-radius: 4px;
  margin-right: 8px;
  width: 60px;
`;
const AddButton = styled.TouchableOpacity`
  background-color: #00b5ec;
  padding: 8px 12px;
  border-radius: 6px;
`;
const ButtonText = styled.Text`
  color: white;
`;
const Footer = styled.View`
  margin-top: 16px;
`;
const FinishButton = styled.TouchableOpacity`
  background-color: #2bc71c;
  padding: 12px;
  border-radius: 6px;
  align-items: center;
`;
