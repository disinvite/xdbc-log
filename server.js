const express = require('express');
const fs = require('fs');
const readline = require('readline');

const app = express();

// sometimes the header and body appear on separate SEND/RECV chunks.

// TODO: won't work for old JDBC logs that don't use hex
const hex_line_getbytes = (line) => line.substr(9,41).trim();

const log_hex_to_array = (input) => {
  //if(typeof in !== 'object') // ?
  return input.map((line) => {
    return hex_line_getbytes(line);
  });
}

/*
function* listbuild_parse(list) {
  let i = 0;

  const parse = (list,i,how_many) => parseInt(list.slice(i,i + how_many).reverse().join(''),16);

  while(1) {
    if(i >= list.length) { break; }


    if(list[i] == '00') {

    }

    let size = parse(list,0,1);
    if(size == 0) {
      parse(list,1,2)
    }


    let size0 = parse(list,0,1);
    if(size0 == 0) {
      let size1 = parse(list,1,2);
      if(size1 == 0) {
        // big one
        let size2 = parse(list,3,4);
        yield {size:size2, type: parseInt(list[7],16), data: list.slice(8,size2 + 7) };
        list = list.slice(size2 + 7);
      } else {
        // less than 65534 bytes
        yield {size:size1, type: parseInt(list[3],16), data: list.slice(4,size1 + 3) };
        list = list.slice(size1 + 3);
      }
    } else {
      //debugger;
      yield {size:size0, type: parseInt(list[1],16), data: list.slice(2,size0) };
      list = list.slice(size0);
      // less than 253 bytes
    }
  }
}
*/

app.get('/', (req, res) => {
  let stream = fs.createReadStream('./data/msg1.txt');
  let rl = readline.createInterface(stream);
  
  let tmp = [];

  // need a custom event for msg complete or something
  rl.on('line', (line) => {
    let x = hex_line_getbytes(line);
    tmp = tmp.concat(x.split(' '));
  });

  rl.on('close', () => {
    res.send({'bytes':tmp});
  })
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});
