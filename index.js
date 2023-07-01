const express = require('express')
const { v4: uuidv4 } = require('uuid');

const app = express()

app.listen(3000)

var tasks={
    "sample_task_id" : {
        title: "My first task",
        description : "",
        completed_flag: false
    }
}

app.get('/tasks', function (req, res) {
    res.json(tasks)
})

app.get('/tasks/:id', function (req, res) {
    if (!(req.params.id in tasks)) {
        res.status(400).send("Task Id does not exist");
    } else {
        res.json(tasks[req.params.id])
    }
})

app.use(express.json())

function taskFieldValidator(args) {
    if (!args.title || !args.completed_flag || !args.description) {
        return false;
    }

    return true
}


app.post('/tasks', function(req,res){
    
    if (!taskFieldValidator(req.body)) {
        res.status(400).send("Some fields are missing to create the task. title, description and completed_flag are mandatory")
    }
    
    console.log(req.body)

    // Generate a random UUID
    const random_uuid = uuidv4();
    tasks[random_uuid] = {
        title : req.body.title,
        description: req.body.description,
        completed_flag: req.body.completed_flag
    }
    res.status(200).send(
        "Task added successfully"
    );
})

app.put('/tasks/:id', function (req, res) {
    if (!(req.params.id in tasks)) {
        res.status(400).send("Task Id does not exist");
    } else {
        if (!taskFieldValidator(req.body)) {
            res.status(400).send("Some fields are missing to create the task. title, description and completed_flag are mandatory")
        }

        tasks[req.params.id]={
            title : req.body.title,
            description: req.body.description,
            completed_flag: req.body.completed_flag
        };

        res.status(200).send(
            "Task updated successfully"
        );
    }
})

app.delete('/tasks/:id', function (req, res) {
    if (!(req.params.id in tasks)) {
        res.status(400).send("Task Id not found");
    }else{
        delete tasks[req.params.id]
    }
})