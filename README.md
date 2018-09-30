# NS8 API
This is sample code to create a very simpe API for the NS8 Technical Evaluation.

Although I have used Express for several years, I am using Restify for this project simply to get some experience using it.  It also gives me an opportunity to compare the two Node frameworks.

## Assumptions
* The endpoints do not need to be secure.  When needed, authorization could be added easily via middleware.
* Only a subset of the full API endpoints need to be implemented for this evaluation.  I have implemented the basic Create and Read endpoints but did not implement the Update and Delete endpoints.  But I did document them below so that you can see the full API design.
* The only required validation of the data is that required fields are present.  Several very good validation modules are availble.
* A simple 'range=last_day' query parameter can be used on the /users/events endpoint to limit events to the last day.
* Error object can be simple. For a more complex API, I'd recommend more verbose error messages and/or adding a link to the documentation.

## Implemented API Endpoints

To meet the requirements of this test, only the following endpoints are implemented:

### Users
* POST /users : Uses the POST data to create a new user.  Returns the new user.
* GET /users : Returns all the users.
* GET /users/{user_id} : Returns the user with the specified id.

### Events
* POST /users/{user_id}/events : Uses the POST data to create a new event for the specified user.  Returns the new event.
* GET /users/events : Returns all the events for all users.  The range=last_day query string parameter will limit the events returned to only those created in the last day.
* GET /users/{user_id}/events : Returns all the events for the specified user.

## Not Implemented API Endpoints

The following endpoints are not implemented for this test, but I am including them here just to show the complete
API design.

* PUT /users/{user_id} : Uses the POST data to update the user with the specified id.
* DELETE /users/{user_id} : Deletes the user with the specified id.  This also deletes all events for the user.
* GET /users/{user_id}/events/{event_id} : Returns the event with the specified id for the specified user.
* PUT /users/{user_id}/events/{event_id} : Uses the POST data to update the event with the specified id for the specified user.
* DELETE /users/{user_id}/events/{event_id} : Deletes the event with the specified id for the specified user..

