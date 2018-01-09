import { Directive } from "@angular/core";
import { ElementRef,HostListener,Input,Renderer } from "@angular/core";
@Directive({
    selector:'[appDirective]'
})

export class MyDirective{
 
    constructor(public el:ElementRef, public renderer:Renderer){
        el.nativeElement.placeholder="test";
    }
    @HostListener('focus')
    onfocus(){
       console.log("effefefef");
       this.renderer.setElementStyle(this.el.nativeElement,"background-color","green");
       this.renderer.setElementStyle(this.el.nativeElement,"color","white");
    }
    @HostListener('blur')
    onBlur(){
        this.renderer.setElementStyle(this.el.nativeElement,"background-color","white");
       
    }
}