<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>coldbox</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<cfoutput>
	<div class="container shadow bg-light w-50 mt-5 rounded p-4">
		<h1>#prc.welcomeMessage#</h1>
		<a href="#event.buildLink( "authentication.index" )#" class="btn btn-secondary">Get Started ></a>
	</div>
</cfoutput>
</body>
</html>