import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from "react-native";

import * as artistActions from "../store/actions/artist";

import MemberItem from "../components/team/MemberItem";
import Cardlist from "../components/cardlist/cardlist"

const GuestsScreen = (props) => {
  const guests = useSelector((state) => state.artist.availableGuests);

  const selectItemHandler = (id, name) => {
    props.navigation.navigate("TeamDetails", {
      memberId: id,
      memberName: name,
    });
  };
 

  return (
    <Cardlist
        type="team"
        loadData={artistActions.fetchGuests()}
        data={guests}
        renderGridItem={(itemData) => (
          <MemberItem
            image={itemData.item.image}
            name={itemData.item.name}
            onViewDetail={() => {
              selectItemHandler(itemData.item.id, itemData.item.name);
            }}
          />
        )}
      />
  );


 
};

export default GuestsScreen;
