# Important

No need of hosting this practice, I will checkout your PR and grade you like that.

# Instructions

You must fork over this repo: https://github.com/carmandomx/metadata and create a HTTP server with the following requirements (done):

    Hostname must be localhost (done)

    Port must be 5000 (done)

    root Path (/) must return the index.html file contained in the views folder (done)

    API must be contained in a v1 router and that api must point to /api path (done)

    There's need to be an endpoint with the following path /api/:date (done)

    :data parameter can be in Epoch (Unix) time or Human time (YYYY-MM-DD) (done)

    regardless of which time you get in the endpoint you need to convert the other time. for ex. you get Epoch time you must return Epoch and GMT time and viceversa. (done)

    if a date is passed in an invalid format you must return a 400 error

    Expected output can be found in the index.html file
