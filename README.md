# NetSuite-Vue-Vite-SPA

NetSuite-Vue-Vite-SPA is a boilerplate template for a single page application (SPA) using Vue 3.x and Vite 2.x to render custom pages on NetSuite.

## Features

- Easy to start boilerplate for creating custom page for NetSuite
- Uses [Vue 3](https://v3.vuejs.org/) and [Vite 2](https://vitejs.dev/) for great developer experience
- Develop your SPA as you would develop any other application
- A plugin that handles sending API calls to NetSuite RestLet both during development and when deployed to NetSuite
- Bundles code into a single file for production to be deployed to NetSuite file cabinet

## Installation

On your terminal, use `degit` tool to scaffold a new project.

```bash
npx degit bibekstha/netsuite-vue-vite-spa <your-project-name>
```

`cd` into your project directory and install dependencies.

```bash
cd <your-project-name>

// Using yarn
yarn

// OR

// Using npm
npm install
```

## Checklist before starting to use this repo on your project

- [ ] Scaffold your project using `degit` tool
- [ ] Delete `LICENSE` file
- [ ] Update README.md file as per your need
- [ ] Rename `.env.example` file to `.env`
- [ ] Set up [TBA (Token Based Authentication)](https://system.netsuite.com/app/help/helpcenter.nl?fid=section_4247337262.html) on NetSuite
- [ ] Update tokens, your NetSuite account number to `.env` file
- [ ] Create a RestLet on NetSuite as per an example shown below and deploy it
- [ ] Copy the internal URL of the RestLet and update it on `.env` file

## Usage

```bash
// Start local dev server
yarn dev
```

Develop your application as any other single page application using features provided by Vue and Vite. Enjoy extremely fast HMR with Vite. TailwindCSS with PostCSS support has already been set up out of the box.

### Fetching data

You get a plugin out of the box that handles sending an API call to NetSuite ResLet to fetch data. You will have to set up TBA and create RestLet (See example below) on NetSuite as described in the checklist above. You can use the default code base to test data fetch.

To fetch data on any component:

```JS
// Inject the "netsuiteApi" function to your component provided by the plugin
const netSuiteApiCall = inject("netsuiteApi");

// Call the function with the data object to be sent as request body
const apiResponse = await netSuiteApiCall(data);

// It will return a promise whose value can be extracted as below
restletMessage.value = await apiResponse.json();
```

View `HelloWorld.vue` component to understand above code extraction.

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

Running above code, creates `index.html` file in `dist` folder. On NetSuite file cabinet, upload the file for the first time and keep updating this file on NetSuite with new code every time you run the build command again. Do not worry about the files inside `dist/assets` folder as the content of those files are inlined on the `index.html` file.

### RestLet to setup communication between your SPA and NetSuite

Create a RestLet with below code and deploy it.

```JS
/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
 */
define(["N/search", "N/error", "N/record"], function (search, error, record) {
  function post(context) {
    try {
      return JSON.stringify("Hey from a RestLet!");
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  return {
    post: post,
  };
});

```

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
