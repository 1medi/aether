import React from "react";
import { LogBox } from "react-native";
import { Text } from "react-native";

LogBox.ignoreAllLogs(); // Suppress known warnings temporarily

global.ErrorUtils.setGlobalHandler((error) => {
  console.error("Global Error Caught:", error);
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Text>Something went wrong.</Text>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
