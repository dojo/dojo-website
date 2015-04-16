<!DOCTYPE html>
<html>
	<head>
	<title>DOH Test Suite Tutorial: Unit Test Runner</title>
	<script>
		setTimeout(function(){
			var prefix = location.pathname.substring(0, location.pathname.lastIndexOf('/tests'));
			location.href='/js/dojo/1.8/util/doh/runner.html?testModule=demo/tests/module&registerModulePath=demo,' + prefix;
		}, 500);
	</script>
	<body>
		Redirecting to D.O.H runner.
	</body>
</html>
