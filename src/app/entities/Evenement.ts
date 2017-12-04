export class Evenement{
  constructor(
	public id : number ,
	public dateEvent : Date ,
	public nbplace : number ,
	public name : string ,
	public location : string ,
	public description : string ,
	public imagename : string 
  ){}
}