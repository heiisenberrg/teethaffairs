import { showMessage } from 'react-native-flash-message';

class FlashMessage {
  static message = function(title, message, color) {
    showMessage({
      message: title ? title : '',
      description: message ? message : '',
      titleStyle: { color: 'white' },
      textStyle: { color: 'white' },
      backgroundColor: color,
      duration: 2500
    });
  };
}

export default FlashMessage;