import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let deadlineTasks = {};
let sectionTasks = {};
let totalSections = 0;

const currentDate = new Date();

let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.get("/", (req, res) => {
    res.render("index.ejs", 
    {
        date: [weekdays[currentDate.getDay()], months[currentDate.getMonth()], currentDate.getDate()],
        deadlineTasks: deadlineTasks,
        totalSections: totalSections,
        sectionTasks: sectionTasks
    });
});

app.post("/deadlineAdded", (req, res) => {
    if (!(req.body["newDeadlineDate"] in deadlineTasks)){
        deadlineTasks[req.body["newDeadlineDate"]] = [];
    }
    deadlineTasks[req.body["newDeadlineDate"]].push(req.body["newDeadlineTask"]);
    res.redirect("/");
});

app.post("/sectionAdded", (req, res) =>{
    totalSections++;
    sectionTasks[totalSections] = [];
    res.redirect("/");
});

app.post("/todoAdded", (req, res) => {
    sectionTasks[req.body["section"]].push(req.body["newToDo"]);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});