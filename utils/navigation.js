import { useSelector } from 'react-redux';

export const getNavPoint = (id, section) => {
  const nav = useSelector((state) => state.config.navigation);
  const point = nav[section].find((n) => n.id == id);
  return point;
};
