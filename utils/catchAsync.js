module.exports = func => { // func what you pass in 
    return (req,res,next) => { //returns a new function with func executed in 
        func(req,res,next).catch(next); // executes func and returns it executed and catches any errors and passes them to next. 
    }
}