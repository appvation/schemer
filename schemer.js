#!/usr/bin/env node

var program = require('commander');
var rest = require('restler');
var fs = require('fs');
var moment = require('moment');

program
  .version('1.0.0')

program
  .command('add [fieldName]')
  .description('add a field to a class')
  .option("-c, --className [className]", "Target class")
  .option("-t, --fieldType [fieldType]", "Field Type")
  .option("-e, --environment [environment]", "Environment")
  .option("-i, --applicationId [applicationId]", "application ID")
  .option("-k, --masterKey [masterKey]", "master key")
  .action(function(fieldName, options){

    var className = options.className;
    var fieldType = options.fieldType;
    var applicationId = options.applicationId;
    var masterKey = options.masterKey;
    var environment = options.environment;

    if (fieldName && className && fieldType && applicationId && masterKey && environment){

    	var query = 'https://api.parse.com/1/schemas/' + className;
    	var dataIn = { 

			"className": className,
				"fields": {}
			};
			dataIn.fields[fieldName] = {
				"type": fieldType
			}

    	rest.put(query, {
    		headers: {
    			"X-Parse-Application-Id": applicationId,
    			"X-Parse-Master-Key": masterKey,
    			"Content-Type": "application/json"
    		}, data: JSON.stringify(dataIn)
    	}).on('complete', function(data){

        if (data instanceof Error) {
          console.log('Error:', data.message);
        } else {

          var append = '\n\n#### Added Field: '+fieldName+' ('+fieldType+'), to: '+className+' on '+moment().format("dddd, MMMM Do YYYY, h:mm:ss a")+'\n\n`'+JSON.stringify(data)+'`';
          
          var filename = 'CHANGELOG_' + environment + '.md';
          fs.stat(filename, function(err, stat) {
            if(err == null) {
              fs.appendFile(filename, append, function(err){
                console.log(data);
              });
            } else if(err.code == 'ENOENT') {
              fs.writeFile(filename, '#Changelog\n');
              fs.appendFile(filename, append, function(err){
                console.log(data);
              });
            } else {
              console.log('Some other error: ', err.code);
            }
          });
        }
    	});

    } else {
    	console.log("missing required fields");
    	program.outputHelp();
    }
  });

program
  .command('delete [fieldName]')
  .description('delete a field from a class')
  .option("-c, --className [className]", "Target class")
  .option("-e, --environment [environment]", "Environment")
  .option("-i, --applicationId [applicationId]", "application ID")
  .option("-k, --masterKey [masterKey]", "master key")
  .action(function(fieldName, options){

    var className = options.className;
    var environment = options.environment;
    var applicationId = options.applicationId;
    var masterKey = options.masterKey;

    if (fieldName && className  && applicationId && masterKey && environment){

    	var query = 'https://api.parse.com/1/schemas/' + className;
    	var dataIn = { 
  		"className": className,
  			"fields": {}
  		};
  		dataIn.fields[fieldName] = {
  			"__op": "Delete"
  		}

    	rest.put(query, {
    		headers: {
    			"X-Parse-Application-Id": applicationId,
    			"X-Parse-Master-Key": masterKey,
    			"Content-Type": "application/json"
    		}, data: JSON.stringify(dataIn)
    	}).on('complete', function(data){

        if (data instanceof Error) {
          console.log('Error:', data.message);
        } else {
      		var append = '\n\n#### Deleted Field: '+fieldName+', from: '+className+' on '+moment().format("dddd, MMMM Do YYYY, h:mm:ss a")+'\n\n`'+JSON.stringify(data)+'`';
      		
          var filename = 'CHANGELOG_' + environment + '.md';
          fs.stat(filename, function(err, stat) {
            if(err == null) {
              fs.appendFile(filename, append, function(err){
                console.log(data);
              });
            } else if(err.code == 'ENOENT') {
              fs.writeFile(filename, '#Changelog\n');
              fs.appendFile(filename, append, function(err){
                console.log(data);
              });
            } else {
              console.log('Some other error: ', err.code);
            }
          });
        }
    	});

    } else {
    	console.log("missing required fields");
    	program.outputHelp();
    }
  });

program
  .command('output [className]')
  .description('output class schema')
  .option("-i, --applicationId [applicationId]", "application ID")
  .option("-k, --masterKey [masterKey]", "master key")
  .action(function(className, options){

    var applicationId = options.applicationId;
    var masterKey = options.masterKey;

    if (className && applicationId && masterKey){

    	console.log("Retrieving "+className+" from Parse.");
    	var query = 'https://api.parse.com/1/schemas/' + className;
    	rest.get(query, {
    		headers: {
    			"X-Parse-Application-Id": applicationId,
    			"X-Parse-Master-Key": masterKey,
    			"Content-Type": "application/json"
    		}
    	}).on('complete', function(data){
        if (data instanceof Error) {
          console.log('Error:', data.message);
        } else {
    		  console.log(data);
        }
    	});

    } else {
    	console.log("missing required fields");
    	program.outputHelp();
    }

  });

program.parse(process.argv);