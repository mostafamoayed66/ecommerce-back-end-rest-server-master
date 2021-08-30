const path = require("path");
const { unlinkSync } = require("fs");

exports.deletePigs = (pigsForDelete) => {
    for(let pig of pigsForDelete){
        unlinkSync(`${path.dirname(__filename)}/${pig}`);
    }
};