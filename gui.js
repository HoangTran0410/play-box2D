var newGUI = {
	w : 50,
	h : 50,
	pause : false,
	pauseF : function(){
		newGUI.pause = !newGUI.pause;
	},
	addBox : function() {
		var newShape = createShape('box', 100, 100, newGUI.w, newGUI.h);
		newShape.color = color(120, 255, 140);
        newShape.display(attr1, 0);
	},
	addCir : function(){
		var newShape = createShape('circle', 100, 100, newGUI.w, newGUI.h);
		newShape.color = color(255, 120, 130);
        newShape.display(attr1, 0);	
	}
}

function createGui(){
	var gui = new dat.GUI();

	gui.add(newGUI, 'w', 0, 100).name('width').listen();
	gui.add(newGUI, 'h', 0, 100).name('height').listen();
	gui.add(newGUI, 'addBox').name('Add Box');
	gui.add(newGUI, 'addCir').name('Add Circle');
	gui.add(newGUI, 'pauseF').name('Pause');
}