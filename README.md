# NS8 API
This is sample code to create a very simpe API for the NS8 Technical Evaluation.

Although I have used Express for several years, I am using Restify for this project simply to get some experience using it.  It also gives me an opportunity to compare the two Node frameworks.

## Implemented API Endpoints

To meet the requirements of this test, only the following endpoints are implemented:

### Users
* ** POST /users **  
  Create: Uses the POST data to create a new user.  Returns the id of the new user.
* ** GET /users **  
  Read: Returns all the users.
* ** GET /users/{user_id} **  
  Read: Returns the user with the specified id.

### Events
* ** POST /users/{user_id}/events **  
  Create: Uses the POST data to create a new event for the specified user.  Returns the id of the new event.
* ** GET /users/events **  
  Read: Returns all the events for all users.
* ** GET /users/{user_id}/events **  
  Read: Returns all the events for the specified user.



## Not Implemented API Endpoints

The following endpoints are not implemented for this test, but I am including them here just to show the complete
API design.

* ** PUT /users/{user_id}  **  
  Update: Uses the POST data to update the user with the specified id.
* ** DELETE /users/{user_id} **  
  Delete: Deletes the user with the specified id.  This also deletes all events for the user.
* ** GET /users/{user_id}/events/{event_id} **  
  Read: Returns the event with the specified id for the specified user.
* ** PUT /users/{user_id}/events/{event_id}  **  
  Update: Uses the POST data to update the event with the specified id for the specified user.
* ** DELETE /users/{user_id}/events/{event_id} **  
  Delete: Deletes the event with the specified id for the specified user..

