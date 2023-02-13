import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Colors from '../../constants/Colors';
import Calc from '../../utils/calc';
import { useIsMountedRef } from '../../utils/hooks';

import BackgroundView from '../BackgroundView';

const Cardlist = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [numCols, setNumCols] = useState(5);
  const [orientation, setOrientation] = useState(1);
  const [error, setError] = useState();

  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMountedRef.current) {
      ScreenOrientation.getOrientationAsync().then((info) => {
        setOrientation(info);
      });

      const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
        setOrientation(evt.orientationInfo.orientation);
      });

      return () => {
        ScreenOrientation.removeOrientationChangeListener(subscription);
      };
    }
  }, []);

  useEffect(() => {
    calcNumCols();
  }, [orientation]);

  const calcNumCols = useCallback(() => {
    if (isMountedRef.current) {
      setNumCols(Calc.numCols(props.type));
    }
  }, [orientation]);

  const loadData = useCallback(async () => {
    if (isMountedRef.current) {
      setError(null);
      setIsRefreshing(true);

      try {
        if (props.loadData) await dispatch(props.loadData);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
      setIsRefreshing(false);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    if (isMountedRef.current) {
      setIsLoading(true);
      loadData().then(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, loadData]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Ein Fehler ist aufgetreten</Text>
        <Button title='Try again' onPress={loadData} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading || orientation === 'undefined') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }
  if ((!isLoading && props.data == null) || props.data?.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Keine Daten gefunden</Text>
        <Button title='Try again' onPress={loadData} color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading || orientation !== 'undefined') {
    return (
      <View style={styles.wrapper}>
        <BackgroundView>
          <FlatList
            onRefresh={loadData}
            columnWrapperStyle={numCols > 1 ? styles.list : null}
            refreshing={isRefreshing}
            data={props.data}
            key={orientation * numCols}
            keyExtractor={(item, index) => index.toString()}
            numColumns={numCols}
            renderItem={props.renderGridItem}
            showsVerticalScrollIndicator={false}
          />
        </BackgroundView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.background,
    height: '100%',
  },
  list: { flex: 1, display: 'flex', justifyContent: 'center' },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});

export default Cardlist;
