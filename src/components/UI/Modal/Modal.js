import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Icon, Modal } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

import * as actions from '../../../store/actions';

class ErrorModal extends Component {
  onGreenClick = () => {
    this.props.resetError();
    // this.props.history.goBack(); maybe?
    this.props.history.push('/')
  }
  render() {
    return (
      <Modal
        open={this.props.error}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Modal.Content>
          <h3>Sorry, we cant find that movie.</h3>
        </Modal.Content>
        <Modal.Actions>
            <Button color='green' onClick={this.onGreenClick} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
    return {
        error: state.searchMovie.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        resetError: () => dispatch(actions.resetError())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ErrorModal));