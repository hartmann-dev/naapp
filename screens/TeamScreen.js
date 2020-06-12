import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from "react-native";

import * as artistActions from "../store/actions/artist";

import MemberItem from "../components/team/MemberItem";
import Colors from "../constants/Colors";

const TeamScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [error, setError] = useState();
  const member = useSelector((state) => state.artist.availableMembers);
  const dispatch = useDispatch();

  const loadMember = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(artistActions.fetchMember());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadMember().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadMember]);

  const selectItemHandler = (id, name) => {
    props.navigation.navigate("TeamDetails", {
      memberId: id,
      memberName: name,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadMember} color={Colors.primary} />
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

  if (!isLoading && member.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No artist found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.member}>
      <FlatList
        onRefresh={loadMember}
        refreshing={isRefreshing}
        data={member}
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
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default TeamScreen;
