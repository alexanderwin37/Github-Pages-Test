import express from "express";
import path from "node:path";
import bodyParser from "body-parser";
import * as url from "url";
import pug from "pug";
import fs from "fs";

let app = express();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.use(express.static(path.join(__dirname, "../../public")));
app.engine("pug", pug.__express);
app.set("views", __dirname);
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

// Exposed endpoint for main.js because I still don't know how to get PUG to access it through cloud run
// This is not ideal but will work for now as I'm tired of troubleshooting this issue
app.get('/js/main.js', (req, res) => {
    const root = process.cwd();
    res.header('Content-Type', 'application/javascript');
    res.sendFile(`${root}/src/server/main.js`);
})

// This allows you to probe into the cloudrun container instance file system
// Meant to help you determine where files are, should be same as here, but some are missing weirdly sometimes
app.get('/files', (req, res) => {
    let p = req.query.pathhh;
    let toSearch = process.cwd();

    if (p) {
        p = p.replaceAll('\\', '/');
        toSearch = `${process.cwd()}${p}`
    }
    console.log(`currDir: ${process.cwd()}`)
    console.log(`Searching: ${toSearch}`);
    let files = fs.readdirSync(toSearch);
    console.log(files);
    res.status(200).send();
})

app.get("*", (req, res) => {
    res.render("base.pug", {});
})

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`spa-react-template listening on ${port}`);
})