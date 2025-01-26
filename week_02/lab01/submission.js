const fs = require('fs')


// -- deleting (unlink) if exists
if (fs.existsSync('canada.txt')) fs.unlinkSync('canada.txt');
if (fs.existsSync('usa.txt')) fs.unlinkSync('usa.txt');

// -- reading 
try { 

    const data = fs.readFileSync('input_countries.csv', 'utf-8');
    // -- formatting header & lines to transcribe
    const lines = data.split('\n');
    const header = lines[0];
    // -- filtering and extracting canadian and american data
    const canadianData = lines.filter((line) => line.startsWith('Canada'));
    const americanData = lines.filter((line) => line.startsWith('United States'));

    // -- writing canadian data to canada.txt
    if(canadianData.length > 0) {

        fs.writeFileSync('canada.txt', [header, ...canadianData].join('\n'));
        console.log('--- transcribed to canadian.txt');
    }

    // -- writing american data to usa.txt
    if (americanData.length > 0) {

        fs.writeFileSync('usa.txt', [header, ...americanData].join('\n'));
        console.log('--- transcribed to usa.txt');
    }

} catch(err){

    console.error(" --- ERROR: ", err);
}

console.log(" --- END --- ");
