import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from "react-native";

import * as artistActions from "../store/actions/artist";

import MemberItem from "../components/team/MemberItem";
import Colors from "../constants/Colors";

const GuestsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [error, setError] = useState();
  const guests = useSelector((state) => state.artist.availableGuests);
  const dispatch = useDispatch();

  const loadGuests = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(artistActions.fetchGuests());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadGuests().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadGuests]);

  const selectItemHandler = (id, name) => {
    props.navigation.navigate("TeamDetails", {
      memberId: id,
      memberName: name,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Ein Fehler ist aufgetreten!</Text>
        <Button title="Versuch es erneut" onPress={loadGuests} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && guests.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Keinen Künstler gefunden.</Text>
      </View>
    );
  }

  return (
    <View style={styles.member}>
      <FlatList
        onRefresh={loadGuests}
        refreshing={isRefreshing}
        data={guests}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(itemData) => (
          <MemberItem
            image={itemData.item.image}
            name={itemData.item.name}
            onViewDetail={() => {
              selectItemHandler(itemData.item.id, itemData.item.name);
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  member: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center",  backgroundColor: Colors.background},
});

export default GuestsScreen;
