import PropTypes from 'prop-types';
import { Pressable, Text } from 'react-native';

const InputButton = ({ title, onPress = null, className = '', primary = false, onLongPress = null }) => {
  return (
    <Pressable onLongPress={onLongPress} onPress={onPress} className='flex items-center justify-center w-full'>
      <Text className={`${primary && 'bg-primaryColor text-white rounded-sm w-full font-medium shadow-xs'} p-2 text-center flex items-center justify-center ${className}`}>{title}</Text>
    </Pressable>
  )
}

InputButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  className: PropTypes.string,
  primary: PropTypes.bool,
  onLongPress: PropTypes.func
}

export default InputButton;
