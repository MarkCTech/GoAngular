# AngularFront
## Summary
This is a Single Page Web-App in Angular, embedded as a static file and then served by Gin. Falls back onto a backup file system to handle browser refresh.

## Running the Program
The Angular must first be built into a static file, then build and run the Go:

    $ cd client && ng build && cd .. && go build && go run .

