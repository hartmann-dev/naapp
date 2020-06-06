import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from "react-native";

import * as artistActions from "../store/actions/artist";

import MemberItem from "../components/team/MemberItem";
import Colors from "../constants/Colors";

const TeamScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [error, setError] = useState();
  const news = useSelector((state) => state.team.availableMember);
  const dispatch = useDispatch();

  const loadMember = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(memberActions.fetchMember());
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
  }, [dispatch, loadNews]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("TeamDetails", {
      newsId: id,
      newsTitle: title,
    });
  };

  if (error) {
    console.log(error);
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try again" onPress={loadNews} color={Colors.primary} />
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

  if (!isLoading && news.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No news found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.news}>
      <FlatList
        onRefresh={loadNews}
        refreshing={isRefreshing}
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(itemData) => (
          <NewsItem
            image={itemData.item.image}
            title={itemData.item.title}
            onViewDetail={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  news: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default TeamScreen;
