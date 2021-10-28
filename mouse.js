/**
 * An interface for objects which interact with the mouse.
 * Each function should return true to consume the mouse event and false otherwise.
 */
class MouseObject {	

	mousePressed(p){
		return false;
	}
		
	mouseDragged(p){
		return false;
	}

	mouseReleased(p){
		return false;
	}
}

/**
 * A wrapper for mouse objects which will always consume the mouse event.
 */
class MouseConsumeWrapper extends MouseObject{
	constructor(mouseObject){
		super();
		this.mouseObject = mouseObject;
	}
	
	mousePressed(p){
		this.mouseObject.mousePressed(p);
		return true;
	}
		
	mouseDragged(p){
		this.mouseObject.mouseDragged(p);
		return true;
	}

	mouseReleased(p){
		this.mouseObject.mouseReleased(p);
		return true;
	}
	
	
}

/** 
 * An interface for objects which can be dragged.
 */
class DraggableObject {

	// Returns if the given point is inside the object.
	contains(p){
		return false;
	}
	
	startDragging(p){}
	
	translate(vec){}
	
	finishDragging(p){}
	
}

/**
 * Tracks over a list of dragable object.
 */
class DraggableList extends MouseObject{

	// Create a Draggable List out of a list of DraggableObjects
	constructor(objects){
		super();
		this.objects = objects;
		
		this.dragObject = null;
		this.lastPoint = null;
	}
	
	addObject(obj){
		this.objects.push(obj);
	}
	
	removeObject(obj){
		this.objects = this.objects.filter(function (e) {
			return e != obj;
		});
	}
	
	clear(){
		this.objects = [];
	}
	
	mousePressed(p){
		for (let obj of this.objects){
			if (!obj.contains(p))
				continue;
			
			this.dragObject = obj;
			this.lastPoint = p;
			obj.startDragging(p);
			return true;			
		}
		return false;
	}
		
	mouseDragged(p){
		if (this.dragObject!=null){
			this.dragObject.translate(p5.Vector.sub(p, this.lastPoint));
			this.lastPoint = p;
		}
	}

	mouseReleased(p){
		if (this.dragObject!=null){
			this.dragObject.finishDragging(p);
			this.dragObject = null;
		}
	}

}
