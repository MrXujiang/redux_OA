import React from 'react';
import './index.less';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
      // logErrorToMyService(error, info);
      console.log(error,info)
    }
  
    render() {
      if (this.state.hasError) {
        return <div className="error-boundary-wrap"></div>;
      }
  
      return this.props.children; 
    }
  }