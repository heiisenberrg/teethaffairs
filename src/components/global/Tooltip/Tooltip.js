import React from 'react';
import { TouchableOpacity, Modal, View, StatusBar, Dimensions, Platform } from 'react-native';
import Triangle from './Triangle';
import getTooltipCoordinate, { getElementVisibleWidth } from './getTooltipCoordinate';
const Screen = Dimensions.get('window');
const ScreenWidth = Screen.width;
const ScreenHeight = Screen.height;
const isIOS = Platform.OS === 'ios';
class Tooltip extends React.PureComponent {
  state = {
    isVisible: false,
    yOffset: 0,
    xOffset: 0,
    elementWidth: 0,
    elementHeight: 0
  };
  renderedElement;
  toggleTooltip = () => {
    const { onClose } = this.props;
    this.getElementPosition();
    this.setState(prevState => {
      if (prevState.isVisible && !isIOS) {
        onClose && onClose();
      }
      return { isVisible: !prevState.isVisible };
    });
  };
  wrapWithPress = (toggleOnPress, children) => {
    if (toggleOnPress) {
      return (
        <TouchableOpacity onPress={ this.toggleTooltip } activeOpacity={ 1 }>
          {children}
        </TouchableOpacity>
      );
    }
    return children;
  };
  getTooltipStyle = () => {
    const { yOffset, xOffset, elementHeight, elementWidth } = this.state;
    const { height, backgroundColor, width, withPointer, containerStyle } = this.props;
    const { x, y } = getTooltipCoordinate(xOffset, yOffset, elementWidth, elementHeight, ScreenWidth, ScreenHeight, width, height, withPointer);
    return {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      borderRadius: 10,
      padding: 10,
      ...containerStyle
    };
  };
  renderPointer = tooltipY => {
    const { yOffset, xOffset, elementHeight, elementWidth } = this.state;
    const { backgroundColor, pointerColor } = this.props;
    const pastMiddleLine = yOffset > tooltipY;
    return (
			/* eslint-disable react-native/no-inline-styles */
      <View
        style={ {
          position: 'absolute',
          top: pastMiddleLine ? yOffset - 13 : yOffset + elementHeight - 2,
          left: xOffset + getElementVisibleWidth(elementWidth, xOffset, ScreenWidth) / 2 - 7.5
        } }>
        <Triangle style={ { borderBottomColor: pointerColor || backgroundColor } } isDown={ pastMiddleLine } />
      </View>
		/* eslint-enable react-native/no-inline-styles */
    );
  };
  renderContent = withTooltip => {
    const { popover, withPointer, toggleOnPress, highlightColor } = this.props;
    if (!withTooltip) {
      return this.wrapWithPress(toggleOnPress, this.props.children);
    }
    const { yOffset, xOffset, elementWidth, elementHeight } = this.state;
    const tooltipStyle = this.getTooltipStyle();
    return (
			/* eslint-disable react-native/no-inline-styles */
      <View>
        <View
          style={ {
            top: yOffset,
            left: xOffset,
            backgroundColor: highlightColor,
            overflow: 'visible',
            width: elementWidth,
            height: elementHeight,
            zIndex: 99999
          } }>
          {this.props.children}
        </View>
        {withPointer && this.renderPointer(tooltipStyle.top)}
        <View style={ tooltipStyle } testID="tooltipPopoverContainer">
          {popover}
        </View>
      </View>
		/* eslint-enable react-native/no-inline-styles */
    );
  };
  componentDidMount() {
    // wait to compute onLayout values.
    setTimeout(this.getElementPosition, 500);
  }
  getElementPosition = () => {
    const { skipAndroidStatusBar } = this.props;
    this.renderedElement &&
      this.renderedElement.measure((frameOffsetX, frameOffsetY, width, height, pageOffsetX, pageOffsetY) => {
        this.setState({
          xOffset: pageOffsetX,
          yOffset: isIOS || skipAndroidStatusBar ? pageOffsetY : pageOffsetY - StatusBar.currentHeight,
          elementWidth: width,
          elementHeight: height
        });
      });
  };
  render() {
    const { isVisible } = this.state;
    const { onClose, withOverlay, overlayColor, onOpen } = this.props;
    return (
      <View
        collapsable={ false }
        ref={ e => {
          this.renderedElement = e;
        } }>
        {this.renderContent(false)}
        <Modal animationType="fade" visible={ isVisible } transparent onDismiss={ onClose } onShow={ onOpen } onRequestClose={ onClose }>
          <TouchableOpacity style={ styles.container(withOverlay, overlayColor) } onPress={ this.toggleTooltip } activeOpacity={ 1 }>
            {this.renderContent(true)}
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
const styles = {
  container: (withOverlay, overlayColor) => ({
    backgroundColor: withOverlay ? overlayColor : 'transparent',
    flex: 1
  })
};
export default Tooltip;
