import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from "react-native";

import * as artistActions from "../store/actions/artist";
import Cardlist from "../components/cardlist/cardlist"

import MemberItem from "../components/team/MemberItem";

const TeamScreen = (props) => {
  const member = useSelector((state) => state.artist.availableMembers);
 
  const selectItemHandler = (id, name) => {
    props.navigation.navigate("TeamDetails", {
      memberId: id,
      memberName: name,
    });
  };

  return (
    <Cardlist
        type="team"
        loadData={artistActions.fetchMember()}
        data={member}
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



export default TeamScreen;
