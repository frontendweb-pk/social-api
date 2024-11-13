// node myfile.js
const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running


myFile.runContents()


function shouldContinue() {
    // check on : any pending setTimeout, setInterval or setImmediate?
    // check on : any pending OS tasks? (like server listening to port)
    // check on : any pending long running operations? (like fs module)
    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length; f

}

while (shouldContinue()) {

}



// exit back to the terminal