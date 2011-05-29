/**
 * Internationalization: English language
 * 
 * Depends on jWYSIWYG, $.wysiwyg.i18n
 * 
 * By: frost-nzcr4 on github.com
 */
(function ($) {
	if (undefined === $.wysiwyg) {
		throw "lang.ru.js depends on $.wysiwyg";
	}
	if (undefined === $.wysiwyg.i18n) {
		throw "lang.ru.js depends on $.wysiwyg.i18n";
	}

	$.wysiwyg.i18n.lang.ru = {
		controls: {
			"Bold": "",
			"Colorpicker": "",
			"Copy": "",
			"Create link": "",
			"Cut": "",
			"Decrease font size": "",
			"Fullscreen": "",
			"Header 1": "",
			"Header 2": "",
			"Header 3": "",
			"View source code": "",
			"Increase font size": "",
			"Indent": "",
			"Insert Horizontal Rule": "",
			"Insert image": "",
			"Insert Ordered List": "",
			"Insert table": "",
			"Insert Unordered List": "",
			"Italic": "",
			"Justify Center": "",
			"Justify Full": "",
			"Justify Left": "",
			"Justify Right": "",
			"Left to Right": "",
			"Outdent": "",
			"Paste": "",
			"Redo": "",
			"Remove formatting": "",
			"Right to Left": "",
			"Strike-through": "",
			"Subscript": "",
			"Superscript": "",
			"Underline": "",
			"Undo": ""
		},

		dialogs: {
			// for all
			"Apply": "",
			"Cancel": "",

			colorpicker: {
				"Colorpicker": "",
				"Color": ""
			},

			image: {
				"Insert Image": "",
				"Preview": "",
				"URL": "",
				"Title": "",
				"Description": "",
				"Width": "",
				"Height": "",
				"Original W x H": "",
				"Float": "",
				"None": "",
				"Left": "",
				"Right": "",
				"Select file from server": ""
			},

			link: {
				"Insert Link": "",
				"Link URL": "",
				"Link Title": "",
				"Link Target": ""
			},

			table: {
				"Insert table": "",
				"Count of columns": "",
				"Count of rows": ""
			}
		}
	};
})(jQuery);
