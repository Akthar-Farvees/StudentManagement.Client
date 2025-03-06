import { View, Text } from 'react-native';
import { MotiView } from 'moti';

const SuccessSnackbar = ({ message, visible }) => {
  return (
    <MotiView
      from={{ translateY: 100, opacity: 0 }}
      animate={{ translateY: 0, opacity: visible ? 1 : 0 }}
      transition={{ type: 'timing', duration: 500 }}
      style={{
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        backgroundColor: 'green',
        padding: 10,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>{message}</Text>
    </MotiView>
  );
};
