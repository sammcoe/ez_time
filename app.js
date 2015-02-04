/*
* Modules
*/
var express = require('express')
var prompt = require('prompt')
var request = require('request')
var cheerio = require('cheerio')
var app = express();
var url;
var css_el;

app.get('/scrape', function(req, res){
	prompt.start()
	prompt.get(['url','css_el'], function(err, result){
		url = result.url
		css_el = result.css_el
		request(url, function(err, res, body){
			if(!err){
				var $ = cheerio.load(body)
				$('select').filter(function(){
					var data = $(this)
					var job = data.children().first().text()
					console.log(job)
				})
			}
		})
	})
})

app.listen('8081')
console.log("Listening on port 8081")
exports = module.exports = app;
