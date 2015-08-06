<!DOCTYPE html>
<head>
	<title>Drop Down Examples</title>
	<link rel="stylesheet" type="text/css" href="css/dropdown.css">
	<style>
.divexample {background: #eee; border: 1px solid #ddd; padding: 10px;}
.divexample pre {background: #fff; border: 1px solid #ddd; padding: 10px;}
	</style>
</head>
<body>
<p>The Multi Select plugin is a JQuery plugin designed to allow an enhanced user experience for the select box tag</p>
<div class="divexample">
	<h3>Default Usage - Single Select</h3>
	<pre>$('#example1').DropDown();</pre>
	<select name="example1" id="example1"><option value="Brazil">Brazil</option><option value="France">France</option>
	<option value="Germany">Germany</option><option value="England">England</option></select>
</div>
<br>
<div class="divexample">
	<h3>Default Usage - Multiple Selections</h3>
	<pre>$('#example2').DropDown();</pre>
	<select name="example2" id="example2" multiple="true"><option value="Brazil">Brazil</option><option value="France">France</option>
	<option value="Germany">Germany</option><option value="England">England</option></select>
</div>
<br>
<div class="divexample">
	<h3>Multiple Selections - Select All</h3>
	<pre>$('#example3').DropDown({'ShowHeader' : true});</pre>
	<select name="example3" id="example3" multiple="true"><option value="Brazil">Brazil</option><option value="France">France</option>
	<option value="Germany">Germany</option><option value="England">England</option></select>
</div>
<br>

<div class="divexample">
	<h3>Set Text Usage</h3>
	<pre>$('#example4').DropDown({'ShowHeader' : true, 'AllText' : 'All Countries', 'NoneText' : '-- Please Select Country --'});</pre>
	<select name="example4" id="example4" multiple="true"><option value="Brazil">Brazil</option><option value="France" checked="checked">France</option>
	<option value="Germany">Germany</option></select>
</div>
<br>

<div class="divexample">
	<h3>Custom Class</h3>
	<pre>$('#example5').DropDown({'ItemClass': 'customclass'});</pre>
	<select name="example5" id="example5" multiple="true"><option value="Brazil">Brazil</option><option value="France" checked="checked">France</option>
	<option value="Germany">Germany</option></select>
</div>

</body>
</html>