import React from "react";
import { useSelector } from "react-redux";

import Cardlist from "../components/cardlist/cardlist";
import { getArtists } from "../store/ducks/artist";

import MemberItem from "../components/team/MemberItem";

const ArtistsScreen = (props) => {
  const [titleParams, onChangeText] = React.useState(props.route.params.title);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: titleParams === "" ? "" : titleParams,
    });
  }, [props.navigation, titleParams]);

  const member = useSelector((state) =>
    state.artist.artists.filter(
      (artist2) => artist2.type === props.route.params.type
    )
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

export default ArtistsScreen;
