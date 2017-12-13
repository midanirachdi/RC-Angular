export class Camp{
  constructor(
	public id :number,
	public name: string ,
	public country:string ,
	public capacity:number ,
	public createdAt:Date ,
	public state :boolean
  ){}
}