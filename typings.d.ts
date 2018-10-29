interface Window {
  chrome?: {
    identity: any
    storage: {
      sync: {
        get: any;
        set: any;
      },
      local: {
        set: any;
        get: any;
        clear: any;
      };
    }
    runtime: {
      lastError?: any
    }
    tabs: any
  };
}

declare var module: any
