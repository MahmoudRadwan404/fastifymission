# Login and register backend 

## features:

* register new users to the system.

* login to the system.

* show all users registered in the system.

* show specific users registered in the system.
  
* update specific user.
   
* delete specific user.
  
* send code to the email address when forget password.
  
* reset password.
  
## registration

<<<<<<< HEAD
in route **app.post("/users",  addUser);**
=======
in route **POST/users**
>>>>>>> 834b9cb4e6feb6d0e3a5f35dd29ba60d56fdd104
we are taking the data from request data using the **handle()** function it takes data from (request body,request query and request params), we take from the user his name, email address, password and confirm password and before storing it to database we use **validation()**function to validate the email address and password and make sure that they are correct and we use **hash()** function that encrypt the password before storing it to **users database**.

# logIn to the system

<<<<<<< HEAD
**app.post("/users/logIn", logIn)** 
=======
**POST/users/logIn** 
>>>>>>> 834b9cb4e6feb6d0e3a5f35dd29ba60d56fdd104

in logIn handler: 
we take from the user his email and password using the **requestHandler.only()** function and we make sure the user give the data correctly using **loginValidation()** function ,after making sure that the user give the data correctly we make sure that the user registered to the **users database** and then generate the json web token using **newAccessToken function** that takes the email and secretKey and expiration date and the algorithm as parameters and store the result in **token**
variable , then we make sure that the password is correct using **verifyPassword()**that compares the form password with the user's password **in users database** after making sure that the password is correct we store the email and the access token in **authUsers database**  then we send the accessToken as a response with user object that contains his data from the** users database** and if the password is wrong we send in response error message "failed to login"

## show all users

<<<<<<< HEAD
**app.get("/users", {preHandler: verifyToken },getAllUsers);**
=======
**GET/users**
>>>>>>> 834b9cb4e6feb6d0e3a5f35dd29ba60d56fdd104
in getAllUsers handler: 
we find all users from **users database** and convert it to array
then we send it in reply ,but only logged in users can see that data because we are using a hook function **verifyToken()** that 
takes the web token from the frontend and compare between it and the secretKey and if its correct, data appears to the user but if it is not error message are sent in response "error verifying token"

## show specific user

<<<<<<< HEAD
**app.get("/users/:id", getSingleUser);**
=======
**GET/users/:id"**
>>>>>>> 834b9cb4e6feb6d0e3a5f35dd29ba60d56fdd104
in getSingleUser handler:we find specific users from **users database** and convert them to array and send an object of the user in response and if it is not found it shows error message in response 

## update user

<<<<<<< HEAD
**app.patch("/users/:id", updateUser);**
=======
**PATCH/users/:id**
>>>>>>> 834b9cb4e6feb6d0e3a5f35dd29ba60d56fdd104
in updateUser handler: we search about the user in the **users** database by id and then set the request body in the collection
that set or unset a field in the user document .




## delete user

<<<<<<< HEAD
**app.delete("/users/:id", deleteUser);**
=======
**DELETE/users/:id**
>>>>>>> 834b9cb4e6feb6d0e3a5f35dd29ba60d56fdd104
in deleteUser handler:we get user data from **users database** 
by id using **const deleted=  await user.deleteOne({_id:new ObjectId(req.params.id)})** and in response we send deleted object that shows status of the deleted user it success or not 


## forget password

<<<<<<< HEAD
**app.post("/users/forget",forget)**
=======
**POST/users/forget**
>>>>>>> 834b9cb4e6feb6d0e3a5f35dd29ba60d56fdd104
in forget handler:we take the email of the user and make sure it is valid then we search in the **users** database if this email is found or not "const user = await usersCollection.findOne({ email: email });"if its found we send in response the code that will make the user reset his password again and then we store this code in the user document  and if not we send error message 
"   return res.send({error:'email not found'})"


## reset password

<<<<<<< HEAD
**app.post("/users/reset",reset)**
in reset handler: we take the email and code and password from the user and make sure that they are valid if it is we sent error message  'return res.send({error:'all fields are required'})'
and it it is good we search about the email in the **users** collection if it is not found we send in response "       return res.send({error:'email not found'})"
if is found we hash the password using **hash()** and update the password and unset the code from the user document.
=======
**POST/users/reset**
in reset handler: we take the email and code and password from the user and make sure that they are valid if it is we sent error message  'return res.send({error:'all fields are required'})'
and it it is good we search about the email in the **users** collection if it is not found we send in response "       return res.send({error:'email not found'})"
if is found we hash the password using **hash()** and update the password and unset the code from the user document.
>>>>>>> 834b9cb4e6feb6d0e3a5f35dd29ba60d56fdd104
