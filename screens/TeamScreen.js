import React from "react";
import { useSelector } from "react-redux";

import Cardlist from "../components/cardlist/cardlist";
import { getArtists } from "../store/ducks/artist";

import MemberItem from "../components/team/MemberItem";

const TeamScreen = (props) => {
  const member = useSelector((state) => state.artist.artists);

  const selectItemHandler = (id, name) => {
    props.navigation.navigate("TeamDetails", {
      memberId: id,
      memberName: name,
    });
  };

  return (
    <Cardlist
      type="team"
      loadData={getArtists()}
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
