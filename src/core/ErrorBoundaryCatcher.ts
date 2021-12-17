import * as React from 'react';

const THIS_SHOULD_BE_A_UI_COMPONENT_FOR_ERROR_STATE = '';

// Yes, this is a class.
// RN currently doesn't offer the componentDidCatch functionality in functional component style:
// https://stackoverflow.com/questions/48482619/how-can-i-make-use-of-error-boundaries-in-functional-react-components


export class ErrorBoundaryCatcher extends React.Component {
  state = {
    hasError: false,
  };
  
  static getDerivedStateFromError(error: any) {
    return {    
        hasError: true
    };
  };

  componentDidCatch(error: any, errorInfo: any) {
    // We should add logging here - email support and so on.
  };

  render() {
    return this.state.hasError ? THIS_SHOULD_BE_A_UI_COMPONENT_FOR_ERROR_STATE : this.props.children;
  }
}