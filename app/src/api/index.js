const express = require("express");
const router = express.Router();

const NodeCache = require('node-cache');
const cache = new NodeCache();

const { v4 : uuidv4 } = require('uuid');


router.get("/ping", (req, res) => {
  res.send({
    result: "Server is up & running!"
  })
})

router.post("/presentation", (req, res) => {

  const poll = [
    {
      id: 1,
      Question: 'Which of the countries would you like to visit the most?',
      Options: [
        { 'key': 'A', 'value': 'Argentina' },
        { 'key': 'B', 'value': 'Brazil' },
        { 'key': 'C', 'value': 'Canada' },
        { 'key': 'D', 'value': 'Denmark' }
      ]
    }, {

      id: 2,
      Question: 'Which of the countries would you like to visit the least?',
      Options: [
        { 'key': 'A', 'value': 'Germany' },
        { 'key': 'B', 'value': 'France' },
        { 'key': 'C', 'value': 'America' },
        { 'key': 'D', 'value': 'Ireland' }
      ]
    }, {

      id: 3,
      Question: 'Which of the Cities would you like to visit the most?',
      Options: [
        { 'key': 'A', 'value': 'Berlin' },
        { 'key': 'B', 'value': 'London' },
        { 'key': 'C', 'value': 'Bristol' },
        { 'key': 'D', 'value': 'Edinburgh' }
      ],
    }
  ]
  var presentation_id = uuidv4();

cache.set(presentation_id, poll);

const fetchedPoll = cache.get(presentation_id);
//fetchedPost.title = "New Title";

//console.log(fetchedPoll);

if(fetchedPoll != undefined){

  res.send({
    result: {
      status: 200,
      response : "Presentation Created",
      presentation_id : presentation_id
    }
  })

} else {

  res.send({
    result: {
      status: 400,
      response : "Mandatory body parameters missing or have incorrect type.", 
    }
  })

}
 
})

router.put("/presentations/:presentation_id/polls/current", (req, res) => {

  var presentation_id = req.params.presentation_id;

  var current_poll = cache.get("current_poll");

  console.log('current_poll-1',current_poll)

  var presentation = cache.get(presentation_id);
  console.log('presentation', presentation);

  if(presentation == undefined){
    res.send({
      status : 400,
      response: 'No presentation found'
    })
    return;
  }
  
 
  current_poll =( current_poll != undefined ? current_poll + 1: 1);
  console.log('current_poll', current_poll);

  var current_presentation_poll = presentation.find(x => x.id == current_poll);
  cache.set('current_poll', current_poll);

  console.log('current_presentation_poll', current_presentation_poll);

  if(current_presentation_poll == undefined){

    res.send({
      status : 409,
      response: 'The presentation ran out of polls'
    })

  } else {
    res.send(current_presentation_poll);
  }


})

router.get("/presentations/:presentation_id/polls/current", (req, res) => {

  var presentation_id = req.params.presentation_id;

  var current_poll = cache.get("current_poll");

  console.log('current_poll-1',current_poll)

  var presentation = cache.get(presentation_id);
  console.log('presentation', presentation);

  if(presentation == undefined){
    res.send({
      status : 400,
      response: 'No presentation found'
    })
    return;
  }
  current_poll =( current_poll != undefined ? current_poll: 1);
  console.log('current_poll', current_poll);

  var current_presentation_poll = presentation.find(x => x.id == current_poll);
  cache.set('current_poll', current_poll);

  console.log('current_presentation_poll', current_presentation_poll);

  if(current_presentation_poll == undefined){

    res.send({
      status : 409,
      response: 'There are no polls currently displayed'
    })

  } else {
    res.send(current_presentation_poll);
  }

  


})


module.exports = router;
