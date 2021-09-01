Super Secret Wedding Gift Puzzle
===========================

Simple web based puzzles prepared for our colleague to make it more challenging receiving wedding gift from the team.

Installation
---------
The project is dockerized, you can simply build and run it locally:

    docker build -t anikopuzzle .
    docker run -p 8080:8080 anikopuzzle

Then it becomes available on port 8080:
    
    http://localhost:8080/


Structure
---------
The docker container is running an expressjs server which is responsible for serving static files and verifying submitted solutions.

Puzzles can be implemented by a simple static html file placed in their own folder under `/www/puzzles/` or can involve some more sophisticated logic loaded to the express code. 

Template for the static html file can be found in `/www/template.html`.

Contribute
----------

Add your puzzle to a new folder under `/www/puzzles/` directory and register the puzzle in `app.js` by calling `registerPuzzle(foldername, solution)`:

    // puzzle registration
    registerPuzzle('hardcoded/', 'password123');
    
    // TODO: register your puzzles here
    
    registerPuzzle('finale/', 'congrats'); // final congrats page with the archive password

The registration takes care of chaining the puzzles: submitting the solution of the previous puzzle opens your puzzle, submitting the solution of your one opens the following one. Therefore, the order of puzzles is defined by the order of `registerPuzzle` calls. Easy ones should go to the beginning, complicated ones to the end.

In order to make it easier to understand the logic behind the puzzle, you can add a `txt` file to the folder of the puzzle describing the solution. `txt` files are not accessible through the server (resulting in HTTP 403).

