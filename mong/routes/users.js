var express = require('express')
var app = express()
var ObjectId = require('mongodb').ObjectId

// SHOW LIST OF USERS
app.get('/', function(req, res) {	
	// fetch and sort users collection by id in descending order
	req.db.collection('users').find().sort({"_id": -1}).toArray(function(err, result) {
		//if (err) return console.log(err)
		if (err) {
			req.flash('error', err)
			res.render('user/list', {
				title: 'User List', 
				data: ''
			})
		} else {
			// render to views/user/list.ejs template file
			res.render('user/list', {
				title: 'User List', 
				data: result
			})
		}
	})
})

// SHOW ADD USER FORM
app.get('/add', function(req, res){	
	// render to views/user/add.ejs
	res.render('user/add', {
		title: 'Add New User',
		name: '',
		age: '',
		email: ''		
	})
})

// ADD NEW USER POST ACTION
app.post('/add', function(req, res){	
		var user = {
			name: req.body.name,
			age: req.body.age,
			email: req.body.email
		}
		req.db.collection('users').insert(user, function(err, result) {
			if (err) {
				req.flash('error', err)
				// render to views/user/add.ejs
				res.render('user/add', {
					title: 'Add New User',
					name: user.name,
					age: user.age,
					email: user.email					
				})
			} else {				
				req.flash('success', 'Data added successfully!')
								
				res.redirect('/users') // redirect to user list page
				
			}
		})
})

// SHOW EDIT USER FORM
app.get('/edit/(:id)', function(req, res){
	var o_id = new ObjectId(req.params.id)
	req.db.collection('users').find({"_id": o_id}).toArray(function(err, result) {
		if(err) return console.log(err)
		
		// if user not found
		if (!result) {
			// req.flash('error', 'User not found with id = ' + req.params.id)
			res.redirect('/users')
		}
		else { // if user found
			// render to views/user/edit.ejs template file
			res.render('user/edit', {
				title: 'Edit User', 
				//data: rows[0],
				id: result[0]._id,
				name: result[0].name,
				age: result[0].age,
				email: result[0].email					
			})
		}
	})	
})

// EDIT USER POST ACTION
app.put('/edit/(:id)', function(req, res, next) {

    
    
		var user = {
			name: req.body.name,
			age: req.body.age,
			email: req.body.email
		}
		
		var o_id = new ObjectId(req.params.id)
		req.db.collection('users').update({"_id": o_id}, user, function(err, result) {
			if (err) {
				// req.flash('error', err)
				
				// render to views/user/edit.ejs
				res.render('user/edit', {
					title: 'Edit User',
					id: req.params.id,
					name: req.body.name,
					age: req.body.age,
					email: req.body.email
				})
			} else {
				// req.flash('success', 'Data updated successfully!')
				
				res.redirect('/users')
				
				// render to views/user/edit.ejs
				/*res.render('user/edit', {
					title: 'Edit User',
					id: req.params.id,
					name: req.body.name,
					age: req.body.age,
					email: req.body.email
				})*/
			}
		})		
	
})

// DELETE USER
app.delete('/delete/(:id)', function(req, res, next) {	
	var o_id = new ObjectId(req.params.id)
	req.db.collection('users').remove({"_id": o_id}, function(err, result) {
		if (err) {
			// req.flash('error', err)
			// redirect to users list page
			res.redirect('/users')
		} else {
			// req.flash('success', 'User deleted successfully! id = ' + req.params.id)
			// redirect to users list page
			res.redirect('/users')
		}
	})	
})

module.exports = app
