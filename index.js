var path = require('path');
var fs = require('fs');


const parties = [];
const towns = [];
const times = [];

fs.readdirSync("./exports").filter(x => x.endsWith(".csv")).forEach(x => {
    fs.unlinkSync(path.join(__dirname, '/exports/' + x))
});

const files = fs.readdirSync("./CSVs").filter(x => x.includes(".csv")).forEach(fileName => {
    console.log(fileName);
    const filePath = path.join(__dirname, '/CSVs/' + fileName);
    const file = fs.readFileSync(filePath);

    times.push(fileName.split(".")[0].split("_")[1])
 
    const data = file.toString().split("\n")
        .map(x => x.split(";"));

    const dataFiltered = data.filter(x => +x[0] > 40000 && +x[0] < 42000 && !x[0].substr(3, 4).startsWith('00') && !x[0].substr(3, 4).startsWith('99'));

    for (let i = 9; i < (data[1].length - 5); i += 2) {
        if(!parties.includes(data[1][i]))
            parties.push(data[1][i]);
    }



    const outputData = () => {
        let string = 'GEMEINDE;PARTEI;JAHR;STIMMEN\n';
       
        dataFiltered.forEach(y => {
            if(!towns.includes(y[1].trim()))
                towns.push(y[1].trim());
            for (let i = 9; i < (data[1].length - 5); i += 2) {
                string += `${y[1].trim()};${data[1][i]};${fileName.split(".")[0].split("_")[1]};${y[i].replace(' ','').replace('.','').trim()}\n`
            }
        })
        return string;
    };

    if (!fs.existsSync('./exports'))
        fs.mkdirSync('./exports');
    fs.appendFileSync(`./exports/votes.csv`, outputData())

})
fs.appendFileSync('./exports/towns.csv', `NAME;\n`);
towns.forEach(x => fs.appendFileSync('./exports/towns.csv', `${x};\n`));

fs.appendFileSync('./exports/parties.csv', `NAME;\n`);
parties.forEach(x => fs.appendFileSync('./exports/parties.csv', `${x};\n`));

fs.appendFileSync('./exports/times.csv', `JAHR;\n`)
times.forEach(x => fs.appendFileSync('./exports/times.csv', `${x};\n`));
