#!/usr/bin/env node

const {schedule} = require("./index");

main(new Date());

function main(date = new Date()) {
  console.log(JSON.stringify(schedule(date), null, 2));
}
