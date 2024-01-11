import './App.css'
import { createContext, useState } from 'react';

function App() {
  const [user, setUser] = useState({
    userId: 1,
    userName: "sheda",
    firstName:"Yuliia",
    lastName: "Yakubiv",
    level: ["guest", "user"]
  })
  //app.post CREATE USER
  /*let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
     req.body.permissionLevel = 1;
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });*/

  //app.get user
  // app.get '/users/:userId'
  //app.patch '/users/:userId'
  //app.delete '/users/:userId'
  console.log(user)
  return (
    <h1>
      Hello
    </h1>
  )
}

export default App
