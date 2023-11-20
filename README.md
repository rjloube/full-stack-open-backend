# Phonebook Backend

This repo is a backend service for a phonebook app. Deployed to internet with Fly.io.

## Index

https://rjloube-phonebook.fly.dev

## Info

`GET` `/info` `(displays count of stored persons and datetime)`

## Create Single Person

`POST` `/api/persons` `(requires name and number as strings in JSON payload)`

## Get All Persons

`GET` `/api/persons`

## Get Single Person

`GET` `/api/persons/{personId}`

<!-- ## TODO: Update Single Person (Not yet implemented)

`PUT` `/api/persons/{personId}` -->

## Delete Single Person

`DELETE` `/api/persons/{personId}`
