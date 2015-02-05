/*
* Modules
*/
var express = require('express')
var prompt = require('prompt')
var request = require('request')
var cheerio = require('cheerio')
var FormData = require('form-data')
var app = express();
var url;
var css_el;

app.get('/scrape', function(req, res){
	prompt.start()
	prompt.get(['url','css_el', 'user', 'pass'], function(err, result){
		css_el = result.css_el
		url = result.url

		var form = new FormData();

		var resource = result.user
		var password = result.pass

		form.append('resource', resource)
		form.append('password', password)
		console.log(form)

		form.submit(url, function(err, res){
			res.resume();
		})

		var r = request.post(url, function(err, res, body) {
			if (err) {
				return console.error('upload failed: ', err)
			}
			request(url, function(err, res, body){
				if(err){
					callback.call(null, new Error('Login failed'))
					return;
				}
				console.log(body)
				var $ = cheerio.load(body)
				$('select').filter(function(){
					var data = $(this)
					var job = data.children().first().text()
					console.log(job)
				})
			})
		})
	})
})

app.listen('8081')
console.log("Listening on port 8081")
exports = module.exports = app;
