import {fromJS} from 'immutable'

export default class ForkBlockData{
	constructor(blockData){
		this.data = blockData.data ||{}
		this.text = blockData.text ||''
		this.key = blockData.key || 0
	}
	getData = () => fromJS({
		...this.data
	})
	getText = () => this.text
}
