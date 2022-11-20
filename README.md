# AngularFront
## Summary
This is a Single Page Web-App in Angular, served by Gorilla Mux in Go.

## Running the Program
The Angular must first be built into a static file, then build and run the Go:

    $ cd client && ng build && cd ../api && go build && go run .
