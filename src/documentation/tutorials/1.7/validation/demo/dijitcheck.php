<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: DojoX Validation with Dijit Forms</title>
		<link rel="stylesheet" href="style.css" media="screen" />
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen" />
		<?php Utils::printClaroCss() ?>
		<?php Utils::printLinkStyleTags(array('dijit/themes/claro/claro.css',
			'dojox/form/resources/CheckedMultiSelect.css')) ?>
	</head>
	<body class="claro">
		<h1>Demo: DojoX Validation with Dijit Forms</h1>
		<p style="font-size: x-small;">
			* denotes required fields.  Page will simply reload on a successful form submission.
		</p>
		<form dojoType="dijit.form.Form" method="post">
		<script type="dojo/method" event="onSubmit">
			if(this.validate()){
				return confirm('Form is valid, press OK to submit');
			}else{
				alert('Form contains invalid data.  Please correct first');
				return false;
			}
			return true;
		</script>
		<table cellpadding="0" cellspacing="2">
			<tr>
				<td valign="top"><strong>First Name*: </strong></td>
				<td><input type="text" required="true" name="firstName" id="firstName" placeholder="Your Name" 
					dojoType="dijit.form.ValidationTextBox" missingMessage="Ooops!  You forgot your first name!" /></td>
			</tr>
			<tr>
				<td valign="top"><strong>Website*:  </strong></td>
				<td><input type="text" required="true" name="website" id="website" placeholder="Your Website" 
					dojoType="dijit.form.ValidationTextBox" validator="dojox.validate.isUrl" /></td>
			</tr>
			<tr>
				<td valign="top"><strong>Email*:  </strong></td>
				<td><input type="text" required="true" name="email" id="email" dojoType="dijit.form.ValidationTextBox" 
					validator="dojox.validate.isEmailAddress" /></td>
			</tr>
			<tr>
				<td valign="top"><strong>Date of Birth*:  </strong></td>
				<td><input type="text" required="true" name="bday" id="bday" dojoType="dijit.form.DateTextBox" value="7/5/1983" /></td>
			</tr>
			<tr>
				<td valign="top"><strong>Favorite Color: </strong></td>
				<td>
					<select name="color" id="color" dojoType="dijit.form.FilteringSelect">
						<option value="">Select a Color</option>
						<option value="Red">Red</option>
						<option value="Green">Green</option>
						<option value="Blue">Blue</option>
					</select>
				</td>
			</tr>
			<tr>
				<td valign="top"><strong>Favorite Toolkits: </strong></td>
				<td>
				<select name="toolkits" id="toolkits" dojoType="dojox.form.CheckedMultiSelect" multiple="multiple" style="width:200px;">
					<option value="Dojo" selected="selected">Dojo Toolkit</option>
					<option value="Moo" selected="selected">MooTools</option>
					<option value="Prototype">Prototype</option>
					<option value="YUI">YUI</option>
					<option value="jQuery" disabled>jQuery</option>
				</select>
				</td>
			</tr>
			<tr>
				<td valign="top"><strong>Send Emails? </strong></td>
				<td><input type="checkbox" id="checkbox" checked="checked" dojoType="dijit.form.CheckBox" /></td>
			</tr>
			<tr>
				<td valign="top"><strong>Email Format: </strong></td>
				<td>
				<input type="radio" id="radio1" name="format" checked="checked" dojoType="dijit.form.RadioButton" /> 
				<label for="radio1">HTML</label>
				&nbsp;&nbsp;&nbsp;
				<input type="radio" id="radio2" name="format" dojoType="dijit.form.RadioButton" />
				<label for="radio2">Text</label>
				</td>
			</tr>
		</table>
		
		<!-- submit buttons -->
		<input type="submit" value="Submit Form" label="Submit Form" id="submitButton" dojoType="dijit.form.Button" />
		<input type="submit" value="Submit Form" id="busyButton" dojoType="dojox.form.BusyButton" 
			label="Submit Form (Busy Button)" busyLabel="Submitting Form..." timeout="2000" />
		</form>
		<?php Utils::printDojoScript("async: true, parseOnLoad: true") ?>
		<script>
			
			require(["dojo/parser", 
			/* dojox/ validate resources */
			"dojox/validate/us", "dojox/validate/web",
			/* basic dijit classes */
			"dijit/form/CheckBox", "dijit/form/Textarea", "dijit/form/FilteringSelect", "dijit/form/TextBox", "dijit/form/ValidationTextBox", "dijit/form/DateTextBox", "dijit/form/TimeTextBox", "dijit/form/Button", "dijit/form/RadioButton", "dijit/form/Form", "dijit/form/DateTextBox",
			/* basic dojox classes */
			"dojox/form/BusyButton", "dojox/form/CheckedMultiSelect", "dojo/domReady!"]);
			
		</script>
	</body>
</html>
