import React from "react";
import PropTypes from "prop-types"; // Add this import

import { MantineProvider } from "@mantine/core";

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Component {...pageProps} />
    </MantineProvider>
  );
}

// Add prop-type validation
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
