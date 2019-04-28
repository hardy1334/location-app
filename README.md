# Location-app

This webapp lets an admin to create a hostel, Initially the user just needs to add **Hostel Name**,then user needs search location i.e where is the location of hostel,**for eg:** Koramangala,in Bengaluru.User will be shown Autocomplete locations as well while searching for his location.Then as user selects his location **city** and **area** attribute gets automatically filled associated with that particular location.Not only this User can add hi location by **dragging the marker** as well.After that user needs to add **2 landmarks** and some **description** for the hostel which he is creating.

Once all the fields are added,user can publish that hostel.

Now inorder to view the hostel saved in database, user can either click on **Hostels** button or create on home branded logo named  **hostels**.

# Screenshots

<img src="https://user-images.githubusercontent.com/31733278/56870738-9529d800-6a31-11e9-8fc9-950d57460755.png"   />

<img src="https://user-images.githubusercontent.com/31733278/56870745-b25ea680-6a31-11e9-9d78-4914cf487172.png"   />

<img src="https://user-images.githubusercontent.com/31733278/56870746-b8ed1e00-6a31-11e9-84f6-72d18da49960.png"  />

# Technologies Used

* React Js
* Express Js on Node Js
* Mlab as remote database
* Google Maps Api

# Setup

* After Cloning the repository,in the root folder of repo run `npm install` to install all the server side dependencies.
* Now move into the **client** directory and run `npm install` to install React js dependencies.
* Once all the dependencies are installed,move to the **root** folder of project and run `npm run dev` to start the server.
* Now it will be working on **localhost:3000**
