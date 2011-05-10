#!/usr/bin/perl -wT 

#The MIT License

#Copyright (c) 2011 Yotam Bar-On

#Permission is hereby granted, free of charge, to any person obtaining a copy
#of this software and associated documentation files (the "Software"), to deal
#in the Software without restriction, including without limitation the rights
#to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#copies of the Software, and to permit persons to whom the Software is
#furnished to do so, subject to the following conditions:

#The above copyright notice and this permission notice shall be included in
#all copies or substantial portions of the Software.

#THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
#THE SOFTWARE.


# This handler requires JSON::XS.
use strict;
use warnings;
use CGI qw(:standard);
use JSON::XS;
use utf8;

my $base_url = "http://localhost"; # The base URL for your file directory
my $root = "/srv/http/jwysiwyg"; # Local URI for file directory
if (param('action') eq "browse") {
	my $dir = param('dir');
	unless ($dir) { die "No directory specified."; }
	if ($dir =~ /\/?\.\.\/?/) {exit; } # This is an important safety precaution -> Using firebug it is very easy to access all the data on the server, simply by using the hard-links of the linux system: ../ and ./ to reach higher level directories.
	# Support for Unicode, UTF-8:
	$dir =~ tr/+/ /;
	$dir =~ s/%([a-fA-F0-9]{2})/pack("C", hex($1))/eg;
	$dir =~ s/%u0([a-fA-F0-9]{3})/pack("U", hex($1))/eg;
	utf8::decode($dir);
	unless ($dir =~ m{/$}) { $dir = "$dir/"; }
	unless (-e "$root$dir") { warn "$dir: Directory does not exist."; exit; }
	opendir(DIR, "$root$dir") || die "Can't open $dir: $!";
	my $json = {	"data" => {	"directories" => {},
								"files" => {}
								}
					};
	foreach (readdir(DIR)) {
		next if (($_ eq '.') || ($_ eq '..'));
		utf8::decode($_);
		if (-d "$root$dir$_") {
			$json->{"data"}->{"directories"}->{"$_"} = "$dir$_";
		} else {
			$json->{"data"}->{"files"}->{"$_"} = "$base_url$dir$_";
		}
	}
	closedir(DIR);
	print "Content-type: application/json; charset=utf-8\n\n";
	print encode_json $json;
} else {
	print "Content-type: application/json; charset=utf-8\n\n";
}
