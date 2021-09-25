export default {
  install: (app, options) => {
    const apiCall = async (data) => {
      let getAssemItemApiRes;
      if (import.meta.env.PROD) {
        getAssemItemApiRes = await fetch(import.meta.env.VITE_RESTLET_URL, {
          method: `POST`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        getAssemItemApiRes = await fetch(`http://localhost:${import.meta.env.VITE_API_SERVER_PORT}`, {
          method: `POST`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
      return getAssemItemApiRes;
    };

    app.provide("netsuiteApi", apiCall);
  },
};
