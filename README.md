# NetSuite-Vue-Vite-SPA

NetSuite-Vue-Vite-SPA is a boilerplate template for a single page application (SPA) using Vue 3.x and Vite 2.x to render custom pages on NetSuite.

## Installation

[Download](https://github.com/BibekStha/netsuite-vue-vite-spa/archive/refs/heads/main.zip) the repository and extract in a desired folder on your local machine.

Open terminal and `cd` into your project folder.

Install dependencies.

```bash
// Using yarn
yarn

// OR

// Using npm
npm install
```

## Usage

Develop your application as any other single page application using features provided by Vue and Vite. TailwindCSS with PostCSS support has already been set up out of the box.

If you need to test API call to a NetSuite RestLet SuiteScript, you will have to perform that on NetSuite itself using production code, for now, as we cannot call NetSuite RestLet without authentication and there is no easy way to authenticate API calls as NetSuite doesn't allow basic authentication using user credentials. This would be added to the project in the future.

## Production code

This project is setup to produce a single HTML file with JavaScript code and CSS styles inlined. To do so, run the build script command.

```bash
// Using yarn
yarn build

// OR

// Using npm
npm run build
```

You can use `--watch` flag with above command to re-build the app every time the code changes, which becomes handy when you have to constantly copy and paste the code to NetSuite file system to test.

Running above code, creates `index.html` file in `dist` folder. On NetSuite file cabinet, upload the file for the first time and keep updating this file on NetSuite with new code every time run the build command again. Do not worry about the files inside `dist/assets` folder and the content of those files are inlined on the `index.html` file.

### SuiteLet to render the SPA

Create a SuiteLet with below code and deploy to create a custom page on NetSuite and render the SPA you created.

```JS
/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(["N/ui/serverWidget", "N/file"], function (ui, file) {
  function onRequest(context) {
    if (context.request.method === "GET") {
      const form = ui.createForm({
        title: "Netsuite Vue-Vite-SPA Test",
      });

      const contentHTML = form.addField({
        id: "content",
        type: ui.FieldType.INLINEHTML,
        label: "SPA Test",
      });

      // 'id' is the file path of the script inside 'file cabinet'
      const fileHTML = file.load({ id: "/SuiteScripts/your-folder/index.html" });
      contentHTML.defaultValue = fileHTML.getContents();
      context.response.writePage(form);
    }
  }

  return {
    onRequest: onRequest,
  };
});

```

Visit the URL of the SuiteLet deployment to view your custom page.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://github.com/BibekStha/netsuite-vue-vite-spa/blob/main/LICENSE)
