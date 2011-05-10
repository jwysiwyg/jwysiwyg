/**
 * File Manager plugin for jWYSIWYG
 * 
 * Yotam Bar-On, 2011
 */
(function ($) {
	if (undefined === $.wysiwyg) {
		throw "wysiwyg.fileManager.js depends on $.wysiwyg";
	}

	/*
	 * Wysiwyg namespace: public properties and methods
	 */
	 // Only for show
	 var fileManager = {
		name: "fileManager",
		version: "0.98", // Same as jwysiwyg
		ajaxHandler: "",
		selected: null,
		setAjaxHandler: function (_handler) {
			this.ajaxHandler = _handler;
			return this;
		},
		isAjaxSet: function () {
			if (this.ajaxHandler) {
				return true;
			} else {
				return false;
			}
		},
		init: function () {
			if (this.ajaxHandler) {
				manager = new fileManagerObj(this.ajaxHandler);
				manager.load();
			} else {
				return false;
			}
		}
		
	 }
	// Register:
	$.wysiwyg.plugin.register(fileManager);
	
	
	
	// Private object:
	function fileManagerObj (_handler) {
		this.handler = _handler;
		this.loaded = false;
		this.curDir = "/";
		this.curListHtml = "";
		// Methods
		this.load = function () {
			var self = this;
			self.loaded = true;
			// Wrap the file list:
			self.loadDir("/", function (fileList) {
				var uiHtml = '<div class="wysiwyg-files-wrapper" title="File Manager"><div id="wysiwyg-files-list-wrapper">'+fileList+'</div><input type="text" name="url" /></div>';
				if ($.wysiwyg.dialog) {
					// Future support for native $.wysiwyg.dialog()
					$.wysiwyg.dialog(uiHtml);
				} else if ($.fn.dialog()) {
					$(uiHtml).dialog({
						modal: true,
						draggable: true,
						resizable: true,
						open: function () {
							dialog = $(this);
							dialog.find("li").live("mouseenter", function () {
								if ($(this).hasClass("wysiwyg-files-dir")) {
									$(this).addClass("wysiwyg-files-dir-expanded");
								}
								$(this).addClass("wysiwyg-files-hover");
							}).live("mouseleave", function () {
								$(this).removeClass("wysiwyg-files-dir-expanded");
								$(this).removeClass("wysiwyg-files-hover");
							});
							dialog.find("li").live("click", function () {
								$(".wysiwyg-files-wrapper").find("li").css("backgroundColor", "#FFF")
								if ($(this).hasClass("wysiwyg-files-dir")) {
									$(".wysiwyg-files-wrapper").find("input[name=url]").val('');
									$('#wysiwyg-files-list-wrapper').addClass("wysiwyg-files-ajax");
									$('#wysiwyg-files-list-wrapper').html("");
									self.loadDir($(this).attr("rel"), function (newFileList) {
										$('#wysiwyg-files-list-wrapper').html(newFileList);
										$('#wysiwyg-files-list-wrapper').removeClass("wysiwyg-files-ajax");
									});
								} else {
									$(this).css("backgroundColor", "#BDF")
									$(".wysiwyg-files-wrapper").find("input[name=url]").val($(this).attr("rel"));
								}
								/* Need to add functionality for a "select" button that will trigger a callback function:
								 * $.wysiwyg.fileManager.setAjaxHandler('...').init(function (selected_file) {
								 *     ....
								 * });
								 */
							});
						},
						close: function () {
							$(this).dialog("destroy");
							$(this).remove();
						}
					});
				} else {
					throw "$.wysiwyg.fileManager: Can't find a working '.dialog()' lib.";
					// If neither of the above works..
				}
			});
		}
		
		this.loadDir = function (dir, callback) {
			var self = this;
			self.curDir = dir;
			// Retreives list of files inside a certain directory:
			$.getJSON(self.handler, { "dir": self.curDir, "action": "browse" }, function (json) {
				callback(self.renderList(json));
			});
		}
		
		this.renderList = function (json) {
			var self = this;
			var treeHtml = '<ul class="wysiwyg-files-list">';
			if (self.curDir !== "/") {
				var prevDir = self.curDir.replace(/[^\/]+\/?$/, '');
				treeHtml += '<li class="wysiwyg-files-dir wysiwyg-files-dir-prev" rel="'+prevDir+'" title="Go to previous directory">'+self.curDir+'</li>';
			}
			$.each(json.data.directories, function(name, dirPath) {
				treeHtml += '<li class="wysiwyg-files-dir" rel="'+dirPath+'">'+name+'</li>';
			});			
			$.each(json.data.files, function(name, url) {
				var ext = name.replace(/^.*?\./, '').toLowerCase();
				treeHtml += '<li class="wysiwyg-files-file wysiwyg-files-'+ext+'" rel="'+url+'">'+name+'</li>';
			});			
			treeHtml += '</ul>';
			return treeHtml;
		}

	}
	
	this.deleteFile = function () {
		
	}
	
	this.moveFile = function () {
		
	}
	
	this.renameFile = function () {
		
	}
	
})(jQuery);
