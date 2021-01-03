// command line argument
const argumentLength=process.argv.length;
var fs= require('fs');
usage();
// Starting Function
function usage()
{
    if(argumentLength<=2)
    {
        usagePrint();
    }
    else{
        let commandString=process.argv[2];
        handleCommandArgument(commandString);
    }
}
// handle commands
function handleCommandArgument(commandString)
{
    switch(commandString)
    {
        case "help":
            usagePrint();
            return;
        case "add":
            addTask();
            return;
        case "ls":
            listRemaningTask();
            return;
        case "done":
            completedTodo();
            return;
        case "report":
            generateReport();
            return;
        case "del":
            deleteTask();
            return;
    }
}

// add task to todo.txt file

function addTask()
{
    let task=process.argv[3];
    let copyOfTask=task+"\n";
    if(argumentLength>=4)
    {
        fs.appendFile("G:/AICTE/fellowship-javascript/javascript/todo.txt",copyOfTask, function(err){
            if(err) throw err;
            console.log(`Added todo: "${task}"`);
        });
    }
    else{
        console.log(`Error: Missing todo string. Nothing added!`)
    }

}

//List of Remaning Task --ls

function listRemaningTask()
{
    fs.readFile("G:/AICTE/fellowship-javascript/javascript/todo.txt",function(err,tasks){
        if(err) {
             fs.open("G:/AICTE/fellowship-javascript/javascript/todo.txt",'w',function(err,tasks){
               if(err) throw err;
               console.log(`There are no pending todos!`);
             });
        }
        else{
                tasks=tasks.toString();
                tasks=tasks.split("\n");
                tasks.reverse();
                if((tasks.length)===1)
                {
                    console.log(`There are no pending todos!`);
                }
                tasks.forEach(function(task,index){
                if(index!=0){
                console.log(`[${tasks.length-index}] ${tasks[index]}`);
                }
                })
             }
    }) 
}

// Mark task Complete 

function  completedTodo()
{
    let taskNumber=process.argv[3];
    let completedtask;
    let remaningtasks;
     if(argumentLength>=4){       
            fs.readFile("G:/AICTE/fellowship-javascript/javascript/todo.txt",function(err,tasks){
                if(err) throw err;
                tasks=tasks.toString();
                tasks=tasks.split("\n");
                let len=tasks.length;
                if(taskNumber<1 || taskNumber>=len)
                {
                    console.log(`Error: todo #${taskNumber} does not exist.`);
                }
                else{
                    var currentDate=new Date();
                    let dateString=currentDate.getFullYear().toString()+"-"+(currentDate.getMonth()+1).toString()+"-"+currentDate.getDate().toString();
                    completedtask="x "+dateString+" ";
                    completedtask=completedtask+tasks[taskNumber-1]+"\n";
                    tasks.splice(taskNumber-1,1);
                    remaningtasks=tasks.join("\n")
                    fs.writeFile("G:/AICTE/fellowship-javascript/javascript/todo.txt",remaningtasks,function(err){ 
                    if(err) throw err;});
                    fs.appendFile("G:/AICTE/fellowship-javascript/javascript/done.txt",completedtask, function(err){
                        if(err) throw err;
                        console.log(`Marked todo #${taskNumber} as done.`);
                    });
                }
            })
     }
     else{
         console.log(`Error: Missing NUMBER for marking todo as done.`);
     }
}

// Report of todo

function generateReport()
{
    var currentDate=new Date();
    let dateString=currentDate.getFullYear().toString()+"-"+(currentDate.getMonth()+1).toString()+"-"+currentDate.getDate().toString();
    process.stdout.write(`${dateString} `);
    fs.readFile("G:/AICTE/fellowship-javascript/javascript/todo.txt",function(err,tasks,){
        if(err) throw err;
        tasks=tasks.toString();
        tasks=tasks.split("\n")
        process.stdout.write(`Pending : ${tasks.length-1} `);
        fs.readFile("G:/AICTE/fellowship-javascript/javascript/done.txt",function(err,tasks){
            if(err){
                fs.open("G:/AICTE/fellowship-javascript/javascript/done.txt",'w',function(err,tasks){
                    if(err)throw err;
                    tasks=tasks.toString();
                    tasks=tasks.split("\n");
                    process.stdout.write(`Completed : ${tasks.length-1} `);
                })
            }
            else{
                tasks=tasks.toString();
                tasks=tasks.split("\n");
                process.stdout.write(`Completed : ${tasks.length-1} `);
            }
        });
    });
    
}


// delete a task

function deleteTask()
{
    let taskNumber=process.argv[3];
    let remaningtasks;
    if(argumentLength>=4){
            fs.readFile("G:/AICTE/fellowship-javascript/javascript/todo.txt",function(err,tasks){
                if(err) {
                    
                    console.log(`Error: Missing NUMBER for deleting todo.`);
                }
                else{
                    tasks=tasks.toString();
                    tasks=tasks.split("\n");
                    let len=tasks.length;
                    if(taskNumber<1 || taskNumber>=len)
                    {
                        console.log(`Error: todo #${taskNumber} does not exist. Nothing deleted.`);
                    }
                    else{
                            tasks.splice(taskNumber-1,1);
                            remaningtasks=tasks.join("\n")
                            fs.writeFile("G:/AICTE/fellowship-javascript/javascript/todo.txt",remaningtasks,function(err){ 
                            if(err) throw err;
                            console.log(`Deleted todo #${taskNumber}`);
                        });
                    }
                }
            })
    }
    else
    {
        console.log(`Error: Missing NUMBER for deleting todo.`);
    }
}

// print Usage Instruction
function usagePrint()
{
    console.log(
        `Usage :-\n$ ./todo add "todo item"  # Add a new todo\n$ ./todo ls               # Show remaining todos\n$ ./todo del NUMBER       # Delete a todo\n$ ./todo done NUMBER      # Complete a todo\n$ ./todo help             # Show usage\n$ ./todo report           # Statistics`
    );
}


