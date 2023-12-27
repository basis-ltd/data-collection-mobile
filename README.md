# Data Collection Mobile Application

A mobile app of the Data Collection Service Application powered by Rwanda Space Agency.
We are using React-native with expo

# Notes on the app structure

![Alt text](image.png)

As you see on the image above,
these are the folders and its corresponding contents:

- `api`: This folder contains all frontend api, and backend/server api
- `app`: This is the navigation routes of the app, there are only folders that create pages, where we can navigate to.
  NB: If there is a **page** that does not need its independent route, that's a component that and it must go in `UI folder`
- `assets`: This is the public folder of tha app, and it contains other folders such as **images** , **lotties**, and **fonts** .
  => in **images Folder** there are all images used in the app
  =>In **fonts Folder** there are all fonts used in the app, that is all kinds of Montserrat fonts.
  => In **lotties Folder** there are all svg.json files for lotties animations

- `components folder`: Contains the components fo the app, these are re-usable small components that are not taking the page, such as buttons, inputs, etc.
- `UI folder` : Contains the all the components that are taking the whole pages but not needing the routes api of the frontend so that user can navigate to them, ex: Loading page.
  NB: If there is a **page** that needs its independent route, that's a full page and we can navigate to it with expo routing that and it must go in `app folder` -` Utils folder`: This is folder containing all the constants used in the app, like **colors**, **fonts**, `images` names as **assets** imported from `assets folder` (so that it may be changed easily) and **global borders**, etc
