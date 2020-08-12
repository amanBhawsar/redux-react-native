import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import {connect} from 'react-redux';
import {CardSection} from './common';
import * as actions from '../action';

class ListItem extends Component {
  componentDidUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }
  renderDescription() {
    const {library, expanded} = this.props;
    if (expanded) {
      return (
        <CardSection>
          <Text style={styles.textStyle}>{library.item.description} </Text>
        </CardSection>
      );
    }
  }
  render() {
    const {titleStyle} = styles;
    const {id, title} = this.props.library.item;
    return (
      <TouchableWithoutFeedback onPress={() => this.props.selectedLibrary(id)}>
        <View>
          <CardSection>
            <Text style={titleStyle}> {title} </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  textStyle: {
    paddingLeft: 18,
    paddingRight: 10,
    flex: 1,
    backgroundColor: 'yellow',
  },
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
};

const mapStateProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.item.id;
  return {expanded: expanded};
};

export default connect(mapStateProps, actions)(ListItem);
