import React from "react";
import { useSelector } from "react-redux";
import { getArtists } from "../store/ducks/artist";

import MemberItem from "../components/team/MemberItem";
import Cardlist from "../components/cardlist/cardlist";

const GuestsScreen = (props) => {
  const guests = useSelector((state) =>
    state.artist.artists.filter((artist2) => artist2.type === "Guest")
  );
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
