// This component allows us to import bootstrap's JavaScript file on the client side.
// Without it, bootstrap would be imported before the DOM is loaded, causing errors.

'use client'

import { useEffect } from 'react';

function BootstrapClient() {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}

export default BootstrapClient;