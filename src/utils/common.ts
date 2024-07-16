export const getDeltaTagColor = (delta: number) => {
  if (delta > 0) {
    return 'green';
  } else if (delta < 0) {
    return 'red';
  } else {
    return 'gray';
  }
};
