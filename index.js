var path = require('path');
var fs = require('fs');



const files = fs.readdirSync("./CSVs").filter(x => x.includes(".csv")).forEach(x => {
    const filePath = path.join(__dirname, '/CSVs/' + x);
    const file = fs.readFileSync(filePath);


    const data = file.toString().split("\r\n")
        .map(x => x.split(";"));

    const dataFiltered = data.filter(x => +x[0] > 40000 && +x[0] < 42000 && !x[0].substr(3, 4).startsWith('00') && !x[0].substr(3, 4).startsWith('99'));

    const outputData = () => {
        let string = 'GEMEINDE;';
        for (let i = 9; i < (data[1].length - 5); i += 2) {
            string += data[1][i] + ';'
        }
        string += '\n'
        dataFiltered.forEach(x => {
            string += x[1].trim() + ';';

            for (let index = 9; index < (data[1].length - 5); index += 2) {
                string += `${x[index].replace(' ','').replace('.','').trim()};`
            }
            string += '\n';
        })
        return string;
    };

    if (!fs.existsSync('./exports'))
        fs.mkdirSync('./exports');
    fs.appendFileSync(`./exports/Export_${x}`, outputData())

})
