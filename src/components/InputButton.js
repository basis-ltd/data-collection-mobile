import PropTypes from 'prop-types';
import { Button } from 'react-native';

const InputButton = ({ title, onPress = null, className = '' }) => {
  return (
    <Button className={` ${className}`} onPress={onPress} title={title} />
  )
}

InputButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    className: PropTypes.string,
}

export default InputButton;
