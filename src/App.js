import { AddCar, NavBar, NewCarCollection } from "./ui-components";
import { Divider, withAuthenticator } from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
import { RentalCar } from "./models";
import { useState } from "react";
import "./App.css";

// retrieving signOut function, and user data
function App({ user, signOut }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const saveCar = async () => {
    try {
      await DataStore.save(
          new RentalCar({
            name: name,
            price: parseFloat(price),
            description: description,
            imageUrl: imageUrl,
          })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const navbarOverrides = {
    "image": {
      src: user?.attributes?.profile, // passing profile image from user object
    },
    "Button": {
      onClick: signOut, // passing signOut function
    },
  };

  const addCarOverrides = {
    "TextField29766922": {
      onChange: (event) => {
        setName(event.target.value);
      },
    },
    "TextField29766923": {
      onChange: (event) => {
        setPrice(event.target.value);
      },
    },
    "TextField29766924": {
      onChange: (event) => {
        setDescription(event.target.value);
      },
    },
    "TextField31462701": {
      onChange: (event) => {
        setImageUrl(event.target.value);
      },
    },
    "Button": {
      onClick: saveCar,
    },
  };

  return (
      <div className="App">
        <NavBar overrides={navbarOverrides} width={"100%"} />
        <header className="App-header">
          <AddCar
              overrides={addCarOverrides}
              style={{ textAlign: "left", margin: "1rem" }}
          />
          <Divider />
          <NewCarCollection />
        </header>
      </div>
  );
}

export default withAuthenticator(App);